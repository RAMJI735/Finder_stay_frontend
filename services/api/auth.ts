    import axios from "axios";
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    axios.defaults.baseURL = baseURL;


    type LoginProp={
        username:string;
        password:string;
    }

    export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true
    });
    export const LoginFn = async (data:LoginProp) => {
        try {
            const response = await api.post("/auth/login", data);
            return response.data; // Assuming the token is in the response data
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }


        export const profileAPI = async () => {
        try {
            const response = await api.get("/auth/profile");
            return response.data; // Assuming the token is in the response data
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    export const logoutAPI = async () => {
        try {
            const response = await api.post("/auth/logout");
            return response.data; // Assuming the token is in the response data
        } catch (error) {
            console.error("Logout failed:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    export const SignUpFn = async (data:any) => {
        try {
            const response = await api.post("/auth/signup", data);
            return response.data; // Assuming the token is in the response data
        } catch (error) {
            console.error("Signup failed:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

