const version = "v1";
export const PathName = {
  Login: `/api/${version}/login`,
  Register: `/api/${version}/register`,
  AllUsers: `/api/${version}/manageUsers/getAllUsers`,
};

export const PublicRoute = [
  PathName.Login,
  PathName.Register
];
