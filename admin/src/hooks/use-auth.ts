
import { toast } from "sonner";
import { isAuthenticated, login, register } from "@/api/auth";

export const useAuth = () => {

    async function adminLogin(payload: { email: string; password: string }) {
        try {
            const data = await login(payload);
            toast("Login Successful")
            return data.data;
        } catch (error) {
            toast("Login Error", {
                description: (error as any).response?.data?.message || (error as any).response?.data || (error as any).message,
            })
            console.log(error);
        }
    }

    async function adminRegister(payload: { fullName: string; email: string; password: string, role: string }) {
        try {
            const data = await register(payload);
            toast("Registration Successful")
            // location.href = "/"
            return data.data;
        } catch (error) {
            toast("Admin Creation Error", {
                description: (error as any).response?.data?.message || (error as any).response?.data || (error as any).message,
            })
            console.log(error);
        }
    }

    async function authStatus() {
        try {
            const as = await isAuthenticated();
            const data = as.data;

            return {
                ...data.session,
                ...data.admin,
                isAuthenticated: data.isAuthenticated
            };
        } catch (error) {
            console.log(error);
            return {
                isAuthenticated: false
            }
        }
    }

    return { adminLogin, adminRegister, authStatus };
};

export type AuthContext = ReturnType<typeof useAuth>;