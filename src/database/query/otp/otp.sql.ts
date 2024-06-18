// insert otp query
export const insertOtpQuery = `INSERT INTO otpTable (emailId, otp, otptype) VALUES ($1, $2, $3)`;

// delete otp query
export const deleteOtpQuery = `DELETE FROM otpTable WHERE emailId = $1`;

// get otp query
export const getOtpQuery =
  "SELECT * FROM otpTable WHERE emailId = $1 AND otp = $2";

// update otp query
export const updateOtpQuery = `UPDATE otpTable SET otp = ?  WHERE emailId = ?`;

