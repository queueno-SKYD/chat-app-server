import { QueryResultBase } from "pg";
import pool from "../../initialize/init";
import { IOtpTable } from "../../interface";
import { deleteOtpQuery, insertOtpQuery } from "./otp.sql";

interface IOTPQuery {
  insertOtpQuery(
    emailId: string,
    otp: number,
    otpType: string
  ): Promise<boolean>;
  getOtp(emailId: string): Promise<IOtpTable | undefined>;
  deleteOtpQuery(emailId: string): Promise<boolean>;
}

class OTPQuery implements IOTPQuery {
  getOtp(emailId: string): Promise<IOtpTable | undefined> {
    throw new Error("Method not implemented.");
  }
  /** insert user query 
    @param emailId 
    @param otp 
    @param otpType  
  */
  public async insertOtpQuery(
    emailId: string,
    otp: number,
    otpType: string
  ): Promise<boolean> {
    await this.deleteOtpQuery(emailId);
    return new Promise((resolve, reject) => {
      pool.query<QueryResultBase>(
        insertOtpQuery,
        [emailId, otp, otpType],
        async (err) => {
          if (err) {
            reject(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  /** 
    @param emailId 
  */
  public async deleteOtpQuery(emailId: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (emailId) {
        pool.query<QueryResultBase>(
          deleteOtpQuery,
          [emailId],
          (err, result) => {
            if (err) {
              //   logger.fatal(err);
              resolve(false);
            } else {
              const data = result.rows;
              if (!data) {
                resolve(false);
                // logger.info("User Not Found");
              }
              //   logger.info(data.userId, "found user");
              resolve(true);
            }
          }
        );
      } else {
        resolve(false);
        return;
      }
    });
  }
}


export const OtpQuery = new OTPQuery();