import Elysia from "elysia";
import { isSessionAuth } from "../../../middleware/authSession.middleware";
import ErrorHandler from "../../../services/errorHandler.service";
import SuccessHandler from "../../../services/successHandler.service";
import { User } from "../../users/_model";
import { Admin } from "../../admin/_model";

const adminAuthStatus = new Elysia()
    .use(isSessionAuth("admin"))
    .get("/status/admin", async ({ set, session }) => {
        try {
            const adminSessionClient = await Admin.findOne({ sessionClientId: session._id })
                .select("-password");

            return SuccessHandler(set, "Admin Authenticated", {
                isAuthenticated: true,
                session,
                admin: adminSessionClient
            }, true);
        } catch (error) {
            throw ErrorHandler.ServerError(set, "Error getting admin status", error);
        }
    }, {
        detail: {
            tags: ['Admin'],
            description: "Get admin info once the admin has signed in"
        }
    })

const userAuthStatus = new Elysia()
    .use(isSessionAuth("user"))
    .get("/status/user", async ({ set, session }) => {
        try {
            const userSessionClient = await User.findOne({ sessionClientId: session._id })
                .select("-password");

            return SuccessHandler(set, "User Authenticated", {
                isAuthenticated: true,
                session,
                user: userSessionClient
            }, true);
        } catch (error) {
            throw ErrorHandler.ServerError(set, "Error getting user status", error);
        }
    }, {
        detail: {
            tags: ['User'],
            description: "Get user info once the user is signed in"
        }
    })

export { adminAuthStatus, userAuthStatus };