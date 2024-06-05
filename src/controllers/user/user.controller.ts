import { UserQuery } from "../../database";
import { constants } from "../../helper/constant";
import { registerValidation } from "../../helper/util";
import { HTTPResponse, HttpStatus } from "../../httpResponse";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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
  console.log("users --->",users)
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
export const CallToUserLogout = async (req: Request, res: Response) =>{

}