import { QueryResult, QueryResultBase } from "pg";
import UserModel from "../../../modal/user.modal";
import pool from "../../initialize/init";
import { createUserQuery, getAllUserQuery, getUserAllQuery, getUserQuery } from "./user.sql";
import { constants } from "../../../helper/constant";

interface IUserModalQuery {
  insertUser(user: UserModel): Promise<UserModel>;
  getUser(
    userId: UserModel["userId"],
    email: UserModel["email"],
    getPassword?: boolean
  ): Promise<UserModel | undefined>;
}
class UserModalQuery implements IUserModalQuery {
  public async insertUser(user: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      pool.query<UserModel>(
        createUserQuery,
        [
          user.firstName,
          user?.lastName,
          user.email,
          user?.imageURL,
          user?.createdBy,
          user.password,
          user?.userType || 0,
        ],
        async (err) => {
          if (err) {
            console.log(err.message);
            reject(err);
          } else {
            const userId = user.userId;
            console.log({ createdUserId: userId }, "user created");
            const userData = await this.getUser(userId, user.email);
            if (userData) {
              resolve(userData);
            } else {
              reject("Something went wrong! user not created");
            }
          }
        }
      );
    });
  }

  public async getUser(
    userId?: number,
    email?: string,
    getPassword?: boolean
  ): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      if (userId || email) {
        pool.query<QueryResultBase>(
          getPassword ? getUserAllQuery : getUserQuery,
          [email, userId],
          (err, result: QueryResult) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              console.log("result=========>", result);
              const data = result.rows[0];
              if (!data) {
                reject("User Not Found");
                console.log("User Not Found");
              }
              console.log(data?.userid, "found user");
              resolve(data);
            }
          }
        );
      } else {
        reject("incorrect input: userId and email can not be null");
        return;
      }
    });
  }

  public async getAllUsers(pIndex: number): Promise<UserModel[] | undefined> {
    return new Promise((resolve, reject) => {
      pool.query<UserModel[]>(
        getAllUserQuery,
        [pIndex * constants.QUERY_PAGINATION],
        (err, result:QueryResult) => {
          if (err) {
            console.log(err)
            reject(undefined);
          } else {
            const data = result.rows;
            if (!data) {
              console.log("data Not Found")
              reject(undefined);
            }
            console.log(data, "All Users data ")
            resolve(data)
          }
        }
      )
      
    });
  }
}

export const UserQuery = new UserModalQuery();
