const version = "v1";
export const PathName = {
  Login: `/api/${version}/login`,
  Register: `/api/${version}/register`,
  AllUsers: `/api/${version}/manageUsers/getAllUsers`,
  RegisterSendOtp: `/api/${version}/register-send-otp`,
  VerifyOtp: `/api/${version}/verify-otp`,
};

export const PublicRoute = [
  PathName.Login,
  PathName.Register,
  PathName.RegisterSendOtp,
  PathName.VerifyOtp
];
