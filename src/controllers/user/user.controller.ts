import { UserQuery } from "../../database";
import { constants } from "../../helper/constant";
import { generateOTP, registerValidation } from "../../helper/util";
import { GetBadServerMessage, GetInternalServerError, GetSuccessServerMessage, HTTPResponse, HttpStatus } from "../../httpResponse";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendVerifyMail } from "../../services/mail";
import { OtpQuery } from "../../database/query/otp/otp.query";
import { deleteOtpQuery, getOtpQuery } from "../../database/query/otp/otp.sql";
import pool from "../../database/initialize/init";
const { JWT_EXPIRE_TIME, COOKIEE_EXPIRE_TIME, JWT_SECRET, COOKIEE_SECRET_KEY } =
  constants;

/**
 * Call Register User
 */
export const CallToRegisterUser = async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = registerValidation.validate(body);

  if (error) {
    return res.status(200).send(
      new HTTPResponse({
        statusCode: HttpStatus.WARNING.code,
        httpStatus: HttpStatus.WARNING.status,
        message: error.message,
      })
    );
  }

  if (body.password !== body.passwordConfirm) {
    return res.status(200).send(
      new HTTPResponse({
        statusCode: HttpStatus.WARNING.code,
        httpStatus: HttpStatus.WARNING.status,
        message: "Password does not match",
      })
    );
  }
  // const hashedPassword = await encryptPassword(body.password);
  const hashedPassword = body.password;
  const saveData = {
    ...body,
    password: hashedPassword,
  };
  try {
    const data = await UserQuery.insertUser(saveData);

    /** send  Registration  mail*/
    // sendRegisterationMail(data.firstName + " " + data.lastName,data.email)
    res.cookie(COOKIEE_SECRET_KEY, JSON.stringify(data), {
      maxAge: COOKIEE_EXPIRE_TIME,
    });
    jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME }, (err, token) => {
      if (err) {
        res.status(500).send(
          new HTTPResponse({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR.code,
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR.status,
            message: "Internal Server Error",
          })
        );
      } else {
        res.send(
          new HTTPResponse({
            statusCode: HttpStatus.OK.code,
            httpStatus: HttpStatus.OK.status,
            message: "User created",
            data: {
              userData: data,
              token,
              clientCookieExpireTime: 2 / (24 * 60),
              ClientCookieKey: "Skyd_Cookie_Team",
            },
          })
        );
      }
    });
  } catch (err: any) {
    res.status(409).send(
      new HTTPResponse({
        statusCode: HttpStatus.CONFLICT.code,
        httpStatus: HttpStatus.CONFLICT.status,
        message:
          err?.code === "ER_DUP_ENTRY"
            ? "User already exist with this email"
            : err.message,
      })
    );
  }
  return;
};

/**
 * Get All Users
 */
export const CallToGetAllUsers = async (req: Request, res: Response) => {
  const { pIndex } = req.body;
  const users = await UserQuery.getAllUsers(pIndex | 0);
  console.log("users --->", users);
  return res.status(200).send(
    new HTTPResponse({
      statusCode: HttpStatus.OK.code,
      httpStatus: HttpStatus.OK.status,
      message: "Success",
      data: users,
    })
  );
};

/**
 * User Logout
 */
export const CallToUserLogout = async (req: Request, res: Response) => {};

/**
 * User Register with Otp
 */
export const CallToVerifyEmailId = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send(GetBadServerMessage('Email parameter is required'));
    }
    const otp = generateOTP();
    const mailresponse = await sendVerifyMail(email, otp);
    if (mailresponse) {
      const status = await OtpQuery.insertOtpQuery(email, otp, "MailOtp");
      if (status) {
        return res.status(200).send(GetSuccessServerMessage('OTP sent successfully'));
      } else {
        return res.status(500).send(GetInternalServerError("INTERNAL_SERVER_ERROR"));
      }
    } else {
      return res.status(500).send(GetInternalServerError('Error sending email'));
    }
  } catch (error) {
    return res.status(500).send(GetInternalServerError("INTERNAL_SERVER_ERROR"));
  }
 
};

/**
 * Verify Otp 
 */
export const CallToVerifyOtp = async (req: Request, res: Response) =>{
  const { email, otp } = req.body;
  pool.query(getOtpQuery, [email, otp], (error:any, results:any) => {
    if (error) {
      return res.status(500).send(GetInternalServerError('Error verifying OTP'));
    }
    if (results.rowCount > 0) {
      pool.query(deleteOtpQuery, [email], (delError:any) => {
        if (delError) {
          return res.status(500).send(GetInternalServerError('Error removing OTP'));
        }
        res.status(200).send(GetSuccessServerMessage('OTP verified successfully'));
      });
    } else {
      res.status(400).send(GetBadServerMessage('Invalid OTP'));
    }
  });
}