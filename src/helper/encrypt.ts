// import bcrypt from "bcryptjs";

// // const saltRounds = env.ENCRYPTION_SALT_ROUND;

// const encryptPassword = async (inputString: string): Promise<string> => {
//   const salt = await bcrypt.genSalt(saltRounds)
//   const hashedString = await bcrypt.hash(inputString, salt)
//   return hashedString;
// }

// const comparePassword = async (userPassword: string, hashpassword: string): Promise<boolean> => {
//   return await bcrypt.compare(userPassword, hashpassword)
// }

// export {
//   encryptPassword,
//   comparePassword
// }
