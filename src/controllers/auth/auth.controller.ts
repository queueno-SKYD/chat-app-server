import { Request, Response } from "express";
import { UserQuery } from "../../database";
import { HTTPResponse, HttpStatus } from "../../httpResponse";
import { constants } from "../../helper/constant";
import jwt from "jsonwebtoken";

const { JWT_EXPIRE_TIME, COOKIEE_EXPIRE_TIME, JWT_SECRET, COOKIEE_SECRET_KEY } =
  constants;

export const CallToLoginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;
  UserQuery.getUser(0, email, true)
    .then(async (response) => {
      if (response) {
        console.log("response ----->",response)
        // if (await comparePassword(password, response.password)) {
        if (password === response.password) {
          jwt.sign(
            {
              "userId": response.userid,
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE_TIME },
            (err, token) => {
              console.log("Login token ---->",token)
              if (err) {
                res.status(500).send(
                  new HTTPResponse({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR.code,
                    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR.status,
                    message: "Internal Server Error",
                  })
                );
              } else {
                res.cookie(
                  COOKIEE_SECRET_KEY,
                  JSON.stringify({
                    userId: response.userId,
                  }),
                  {
                    maxAge: COOKIEE_EXPIRE_TIME,
                  }
                );
                return res
                  .status(200)
                  .send(
                    new HTTPResponse({
                      statusCode: HttpStatus.OK.code,
                      httpStatus: HttpStatus.OK.status,
                      message: "User Successfuly Login",
                      data: { token },
                    })
                  );
              }
            }
          );

          // #endregion
        } else {
          return res
            .status(400)
            .send(
              new HTTPResponse({
                statusCode: HttpStatus.OK.code,
                httpStatus: HttpStatus.WARNING.status,
                message: "Invalid Password!",
              })
            );
        }
      } else {
        console.log("User not found in DB");
        return res
          .status(400)
          .send(
            new HTTPResponse({
              statusCode: HttpStatus.OK.code,
              httpStatus: HttpStatus.WARNING.status,
              message: "Invalid user",
            })
          );
      }
    })
    .catch((err) => {
      return res
        .status(400)
        .send(
          new HTTPResponse({
            statusCode: HttpStatus.WARNING.code,
            httpStatus: HttpStatus.WARNING.status,
            message: err,
          })
        );
    });
};
