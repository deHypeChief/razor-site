import Elysia from "elysia";
import { jwtSessionAccess, jwtSessionRefresh } from "./jwt.middleware";
import ErrorHandler from "../services/errorHandler.service";
import { SessionClient } from "../components/auth/_model";
import { IUser, User } from "../components/users/_model";
import AuthHandler from "../services/authHandler.service";
import { Admin, IAdmin } from "../components/admin/_model";

export const isSessionAuth = (requiredRole: "user" | "admin" | null = null) =>
    (app: Elysia) =>
        app
            .use(jwtSessionAccess)
            .use(jwtSessionRefresh)
            .derive(async function handler({
                request,
                headers,
                sessionAccessJwt,
                sessionRefreshJwt,
                cookie: { sessionAccess, sessionRefresh },
                set
            }) {
                try {
                    const a_t = sessionAccess.value;
                    const r_t = sessionRefresh.value;

                    if (!a_t && !r_t) {
                        sessionAccess.remove();
                        sessionRefresh.remove();
                        throw ErrorHandler.UnauthorizedError(
                            set,
                            "Authentication tokens required"
                        );
                    }

                    let sessionPayload;

                    // Verify Access Token
                    if (a_t) {
                        try {
                            sessionPayload = await sessionAccessJwt.verify(a_t);
                        } catch {
                            // Ignore invalid access token and fall back to refresh token
                        }
                    }

                    // Verify Refresh Token if Access Token is invalid or missing
                    if (!sessionPayload && r_t) {
                        try {
                            sessionPayload = await sessionRefreshJwt.verify(r_t);

                            // Refresh session if refresh token is valid
                            if (sessionPayload && sessionPayload.sessionClientId) {
                                const sessionClient = await SessionClient.findById(sessionPayload.sessionClientId);
                                if (!sessionClient) {
                                    throw ErrorHandler.UnauthorizedError(set, "Invalid session client");
                                }

                                // Generate new tokens
                                await AuthHandler.signSession(
                                    set,
                                    sessionClient,
                                    request,
                                    headers,
                                    sessionAccess,
                                    sessionRefresh,
                                    sessionAccessJwt,
                                    sessionRefreshJwt
                                );
                            }
                        } catch (error) {
                            sessionAccess.remove();
                            sessionRefresh.remove();
                            throw ErrorHandler.UnauthorizedError(
                                set,
                                "Session cleared due to invalid credentials",
                                error
                            );
                        }
                    }

                    if (!sessionPayload) {
                        sessionAccess.remove();
                        sessionRefresh.remove();
                        throw ErrorHandler.UnauthorizedError(set, "Invalid authentication tokens");
                    }

                    // Validate session and role
                    const session = await validateSession(sessionPayload, set);

                    if (requiredRole && !validateRole(session.session.role, requiredRole)) {
                        throw ErrorHandler.UnauthorizedError(
                            set,
                            `Access denied: ${requiredRole} role required`
                        );
                    }

                    return session;
                } catch (error) {
                    sessionAccess.remove();
                    sessionRefresh.remove();
                    throw error;
                }
            });

async function validateSession(payload: any, set: any) {
    const { role, sessionClientId } = payload;

    const session = await SessionClient.findById(sessionClientId).select("-password");
    if (!session) {
        throw ErrorHandler.UnauthorizedError(set, "Invalid session client");
    }

    const sessionClient: IAdmin | IUser  = role.includes("admin") ? await Admin.findOne({ sessionClientId }).populate("sessionClientId") : await User.findOne({ sessionClientId }).populate("sessionClientId").select("fullname email role")
    if (!sessionClient) {
        throw ErrorHandler.ValidationError(
            set,
            "Session client not found"
        );
    }

    return { session, sessionClient };
}

function validateRole(roles: string | string[], requiredRole: "user" | "admin") {
    const roleArray = Array.isArray(roles) ? roles : [roles];

    if (requiredRole === "user") {
        return roleArray.some(role => ["student", "huttspoter", "host"].includes(role));
    }

    if (requiredRole === "admin") {
        return roleArray.includes("admin");
    }

    return false;
}

