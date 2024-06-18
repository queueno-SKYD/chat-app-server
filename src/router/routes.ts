import { Router } from "express";

import { PathName } from "./pathName";
import controllers from "../controllers";

export const routes = (router: Router) => {
  router.post(PathName.Register, controllers.CallToRegisterUser,);
  router.post(PathName.Login, controllers.CallToLoginUser);
  router.post(PathName.AllUsers, controllers.CallToGetAllUsers);
  router.post(PathName.RegisterSendOtp, controllers.CallToVerifyEmailId);
  router.post(PathName.VerifyOtp, controllers.CallToVerifyOtp);
};
