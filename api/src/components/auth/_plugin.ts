import Elysia from "elysia";
import getSessions from "./controllers/getSessions.route";
import { adminAuthStatus, userAuthStatus } from "./controllers/authStatus.route";
import manageOTP from "./controllers/otp.routes";

const authPlugin = new Elysia({
    prefix: "/auth"
})
    .use(getSessions)
    .use(adminAuthStatus)
    .use(userAuthStatus)
    .use(manageOTP)

export default authPlugin