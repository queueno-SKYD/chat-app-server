import { NextFunction, Request, Response } from "express";
import { HTTPResponse, HttpStatus } from "../httpResponse";
import jwt from "jsonwebtoken";
import { constants } from "../helper/constant";
import { UserQuery } from "../database";
import { PublicRoute } from "../router/pathName";

const { JWT_EXPIRE_TIME, COOKIEE_EXPIRE_TIME, JWT_SECRET, COOKIEE_SECRET_KEY } =
  constants;
export const UserAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const path = req.path;
  const isPublicRoute = PublicRoute.includes(path)
  if (isPublicRoute) {
    next()
    return;
  }
  const token = req.headers.token;
  if (!token) {
    console.log(`Token not found in API: ${req.path}`);
    return res.status(401).send(
      new HTTPResponse({
        statusCode: HttpStatus.UN_AUTHORISED.code,
        httpStatus: HttpStatus.UN_AUTHORISED.status,
        message: "Unauthorised! access",
      })
    );
  }
  try {
    jwt.verify(
      String(token),
      JWT_SECRET,
      // Replace 'your-secret-key' with your actual secret key
      (err, payload: any) => {
        if (err) {
          return res.status(401).send(
            new HTTPResponse({
              statusCode: HttpStatus.UN_AUTHORISED.code,
              httpStatus: HttpStatus.UN_AUTHORISED.status,
              message: "Token expired",
              data: [],
            })
          );
        } else {
          if (payload) {
            const userId = payload.userid;
            console.log(userId, "user id from token");
            if (userId) {
              // Attach user details to the request object
              UserQuery.getUser(userId, "")
                .then(async (response) => {
                  res.locals.user = response;
                  next();
                })
                .catch((err) => {
                  return res.status(409).send(
                    new HTTPResponse({
                      statusCode: HttpStatus.WARNING.code,
                      httpStatus: HttpStatus.WARNING.status,
                      message: err,
                    })
                  );
                });
            } else {
              console.log("Invalid token");
              return res.status(401).send(
                new HTTPResponse({
                  statusCode: HttpStatus.UN_AUTHORISED.code,
                  httpStatus: HttpStatus.UN_AUTHORISED.status,
                  message: "ERROR: User unauthenticated!",
                })
              );
            }
          } else {
            return res.status(401).send(
              new HTTPResponse({
                statusCode: HttpStatus.UN_AUTHORISED.code,
                httpStatus: HttpStatus.UN_AUTHORISED.status,
                message: "Token expired",
                data: [],
              })
            );
          }
        }
      }
    );

    return;
  } catch (error) {
    return res.status(401).send(
      new HTTPResponse({
        statusCode: HttpStatus.UN_AUTHORISED.code,
        httpStatus: HttpStatus.UN_AUTHORISED.status,
        message: "Unauthorized: Invalid token",
        data: error,
      })
    );
  }
};
