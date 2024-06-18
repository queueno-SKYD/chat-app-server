import { CallToLoginUser } from "./auth/auth.controller";
import { CallToGetAllUsers, CallToRegisterUser, CallToUserLogout, CallToVerifyEmailId, CallToVerifyOtp } from "./user/user.controller";


export default {
    CallToLoginUser,
    CallToRegisterUser,
    CallToGetAllUsers,
    CallToUserLogout,
    CallToVerifyEmailId,
    CallToVerifyOtp
}