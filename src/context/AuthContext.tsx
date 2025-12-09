"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z, ZodError, ZodIssue, ZodSchema } from "zod"
import { Toast } from "@/components/Toast";

import {
    ForgotPasswordSchema, LoginFormSchema, Otp, Pin,
    ResetPasswordSchema, SignupFormSchema, CreateSeekerProfileSchema, CreateProviderProfileSchema,
} from '@/lib/definitions'


type LoginFormData = z.infer<typeof LoginFormSchema>
type User = {
    id: string;
    name: string;
    email: string;
    role: "seeker" | "provider";
};

type GenericForm<T extends ZodSchema> = {
    data: z.infer<T>;
    setData: React.Dispatch<React.SetStateAction<z.infer<T>>>;
    validateForm: (data: z.infer<T>, schema: T) => boolean;
    errors: Record<string, string>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

type GenericFormData<T extends z.ZodTypeAny> = z.infer<T>;

// type AuthContextType_ = {
//     user: User | null;
//     code: string | null;
//     firstLoad: boolean;
//     createUser: (userData: User, token: string, code: string) => void;
//     logout: () => void;
//     loginForm: LoginFormData;
//     setLoginForm: React.Dispatch<React.SetStateAction<LoginFormData>>,
//     errors: Record<string, string>,
//     loading: boolean,
//     login: (data: LoginFormData) => Promise<void>,
// };
type AuthContextType = {
    user: User | null;
    tempUser: User | null;
    authStep: any;
    code: string | null;
    firstLoad: boolean;
    createUser: (userData: User, token: string, code: string) => void;
    logout: () => void;

    // Reusable form (generic)
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    errors: Record<string, string>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    loading: boolean;
    subLoading: boolean,

    // Keep existing actions
    login: (data: GenericFormData<typeof LoginFormSchema>) => Promise<void>;
    signup: (data: GenericFormData<typeof SignupFormSchema>) => Promise<void>;
    verifyRegistrationOtp: (data: GenericFormData<typeof Otp>) => Promise<void>;
    createProfile: (data: GenericFormData<typeof CreateSeekerProfileSchema> | GenericFormData<typeof CreateProviderProfileSchema>, type: "seeker" | "provider") => Promise<void>;
    requestRegistrationOtp: () => Promise<void>;


    updateProfile: (data: GenericFormData<typeof CreateSeekerProfileSchema> | GenericFormData<typeof CreateProviderProfileSchema>, type: "seeker" | "provider") => Promise<void>;
    verifyOldPassword: (password: string) => Promise<{ status: string }>;
    verifyPasswordChangeOTP: (password: string) => Promise<{ status: string }>;
    resend_verifyPasswordChangeOTP: () => Promise<{ status: string }>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};



const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [tempUser, setTempUser] = useState<User | null>(null);
    const [authStep, setAuthStep] = useState<any>(null);
    const [firstLoad, setFirstLoad] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<string | null>(null)
    const [code, setCode] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [loading, setLoading] = useState(false)
    const [subLoading, setSubLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const router = useRouter();


    useEffect(() => {
        const startUp = async () => {
            // Restore user from localStorage
            const storedUser = localStorage.getItem("user");
            const storedTempUser = localStorage.getItem("tempUser");
            const storedAuthStep = localStorage.getItem("authStep");
            const storedToken = localStorage.getItem("token");
            const storedrefresh = localStorage.getItem("refresh");
            const storedCode = localStorage.getItem("code");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            if (storedTempUser) {
                setTempUser(JSON.parse(storedTempUser));
            }
            if (storedToken) {
                setToken(storedToken);
                console.log(storedToken)
                userSpecificFetches(storedToken);
            }
            if (storedCode) {
                setCode(storedCode);
            }
            if (storedAuthStep) {
                setAuthStep(storedAuthStep);
            }
            if (storedrefresh) {
                setRefresh(storedrefresh);
            }

            setFirstLoad(true);
        }

        startUp();
    }, []);


    const userSpecificFetches = async (storedToken: string) => {
        retrievProfileData(storedToken);
    }



    // Forms Actions
    const validateForm_ = (data: LoginFormData) => {
        const result = LoginFormSchema.safeParse(data)
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            const issues: ZodIssue[] = result.error.issues;
            issues.forEach((err: ZodIssue) => {
                const field = err.path[0]
                if (typeof field === "string") fieldErrors[field] = err.message
            })
            setErrors(fieldErrors)
            return false
        }
        setErrors({})
        return true
    }

    // const validateForm = <T extends z.ZodTypeAny>(data: z.infer<T>, schema: T) => {
    //     const result = schema.safeParse(data);
    //     if (!result.success) {
    //         const fieldErrors: Record<string, string> = {};
    //         result.error.issues.forEach((err: ZodIssue) => {
    //             const field = err.path[0];
    //             if (typeof field === "string") fieldErrors[field] = err.message;
    //         });
    //         setErrors(fieldErrors);
    //         return false;
    //     }
    //     setErrors({});
    //     return true;
    // };
    const validateForm = <T extends z.ZodTypeAny>(
        data: Record<string, any>,
        schema: T
    ) => {
        // Get all keys from schema shape (works for z.object)
        const shape = (schema as any)._def.shape || (schema as any)._def.schema?.shape;
        const normalizedData: Record<string, any> = {};

        // 1️⃣ Fill missing keys with empty string
        if (shape && typeof shape === "object") {
            for (const key of Object.keys(shape)) {
                normalizedData[key] =
                    data?.[key] === undefined || data?.[key] === null ? "" : data[key];
            }
        }

        // 2️⃣ Merge back any other data keys (for flexibility)
        for (const key in data) {
            if (!(key in normalizedData)) normalizedData[key] = data[key];
        }

        // 3️⃣ Validate
        const result = schema.safeParse(normalizedData);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((err: ZodIssue) => {
                const field = err.path[0];
                if (typeof field === "string") fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            return false;
        }

        setErrors({});
        return true;
    };


    const login = async (data: GenericFormData<typeof LoginFormSchema>) => {
        if (!validateForm(data, LoginFormSchema)) return;
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseBody = await res.json();
            if (!res.ok) {
                Toast.error(responseBody.message || "Login request failed");
                // if (responseBody.message && responseBody.message === "No active account found with the given credentials") {
                //     createTempUser(formData, "null", "null");
                //     window.location.href = `/signup/verify?role=null`;
                // }
                return;
            }

            if (responseBody?.data?.access) {
                createUser(responseBody?.data?.user, responseBody?.data?.access, responseBody?.data?.refresh);
                // Toast.warning(responseBody?.data?.access)
            } else {
                setAuthStep("1");
                await localStorage.setItem("authStep", "1");
                createTempUser(responseBody?.data, responseBody?.data?.id, responseBody.code);
            }
            // Toast.success("Success");
            window.location.href = "/user/home";
        } catch (error) {
            Toast.error("Failed to Login" + error);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (data: GenericFormData<typeof SignupFormSchema>) => {
        if (!validateForm(data, SignupFormSchema)) return;
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseBody = await res.json();
            if (!res.ok) {
                Toast.error(responseBody.message || 'Registration failed. Please check your input.');
                return;
            }
            // console.log(JSON.stringify(responseBody?.data))
            createTempUser(responseBody?.data, responseBody?.data?.id, responseBody.code);
            Toast.success("Success");
            window.location.href = `/signup/verify?role=${responseBody?.data?.role}`;

        } catch (error: unknown) {
            if (error instanceof Error) {
                Toast.error("Failed to Login" + error?.message || error);
            } else {
                Toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }

    const createProfile = async (data: GenericFormData<typeof CreateSeekerProfileSchema> | GenericFormData<typeof CreateProviderProfileSchema>, type: "seeker" | "provider"): Promise<void> => {
        if (!tempUser) {
            Toast.error("No session found, Please log in again.");
            return;
        }

        const scheme = type === "provider" ? CreateProviderProfileSchema : CreateSeekerProfileSchema;

        if (!validateForm(data, scheme)) return;
        setLoading(true);
        const form = new FormData();

        const payload = data as Record<string, any>; // ✅ fix here

        for (const key in payload) {
            if (payload[key] !== undefined && payload[key] !== null) {
                form.append(key, payload[key]);
            }
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/update-seeker-profile/${tempUser.id}`,
                {
                    method: "PUT",
                    body: form,
                }
            );

            const result = await response.json();

            if (!response.ok) {
                Toast.error(result?.message || "Something went wrong!");
                return;
            }

            Toast.success("Profile updated successfully");
            window.location.href = "/user/home";
        } catch (error) {
            Toast.error("Failed to update profile: " + error);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data: GenericFormData<typeof CreateSeekerProfileSchema> | GenericFormData<typeof CreateProviderProfileSchema>, type: "seeker" | "provider"): Promise<void> => {
        if (!tempUser) {
            Toast.error("No session found, Please log in again.");
            return;
        }

        const scheme = type === "provider" ? CreateProviderProfileSchema : CreateSeekerProfileSchema;

        if (!validateForm(data, scheme)) return;
        setLoading(true);
        const form = new FormData();

        const payload = data as Record<string, any>; // ✅ fix here

        for (const key in payload) {
            if (payload[key] !== undefined && payload[key] !== null) {
                form.append(key, payload[key]);
            }
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/update-seeker-profile/${tempUser.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "PUT",
                    body: form,
                }
            );

            const result = await response.json();

            if (!response.ok) {
                Toast.error(result?.message || "Something went wrong!");
                return;
            }

            Toast.success("Profile updated successfully");
            window.location.href = "/user/home";
        } catch (error) {
            Toast.error("Failed to update profile: " + error);
        } finally {
            setLoading(false);
        }
    };

    const requestRegistrationOtp = async () => {
        if (!tempUser) {
            Toast.error("Session not found. Please log in again");
            return;
        }

        setSubLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp/${tempUser?.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: tempUser.email }),
            });

            const responseBody = await res.json();
            if (!res.ok) {
                Toast.error(responseBody.message || 'OTP request failed. Please try again.');
                return;
            }
            Toast.success(responseBody.message || 'OTP sent successfully!')

        } catch (error: unknown) {
            if (error instanceof Error) {
                Toast.error("Failed to resend email: " + error?.message || error);
            } else {
                Toast.error("An unexpected error occurred.");
            }
        } finally {
            setSubLoading(false);
        }
    }

    const verifyRegistrationOtp = async (data: GenericFormData<typeof Otp>) => {
        if (!tempUser) {
            Toast.error("Session not found. Please log in again");
            return;
        }
        if (!validateForm(data, Otp)) return;
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp/${tempUser?.id}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseBody = await res.json();
            if (!res.ok) {
                Toast.error(responseBody.message || 'OTP verification failed. Please check your input.');
                return;
            }
            setAuthStep("1");
            await localStorage.setItem("authStep", "1");
            // console.log(JSON.stringify(responseBody?.data));
            // Toast.success(JSON.stringify(responseBody?.data));
            Toast.success("Success");
            window.location.href = `/signup/create-profile?role=${tempUser.role}`;
        } catch (error: unknown) {
            if (error instanceof Error) {
                Toast.error("Something went wrong: " + error?.message || error);
            } else {
                Toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }





    const retrievProfileData = async (token: string) => {
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYwODYxOTA1LCJpYXQiOjE3NjA4NTgzMDUsImp0aSI6ImUwNzEwOTQwNTIzZjRjYmY4NTE5ZWQ5NzRlOTEyZmQ3IiwidXNlcl9pZCI6MTE4fQ.VXQCxBYLhwgEAefxADP4LjikEB0AwnKGmhbeaM75Cuo"
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/seeker/update/`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const responseBody = await res.json();
            if (!res.ok) {
                Toast.error(responseBody.message || "Retrieve Profile request failed");
                return;
            }
            setFormData(responseBody?.data)
            // Toast.success("Retrieve Profile request Success");
        } catch (error) {
            Toast.error("Retrieve Profile Error:" + error);
        } finally {
            setLoading(false);
        }
    };

    const verifyOldPassword = async (password: string) => {
        console.log(token)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/verify-current/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ current_password: password })
            });
            const responseBody = await res.json();
            if (!res.ok) {
                Toast.error(responseBody?.message || "Wrong Passowrd -");
                return { status: "failed" };
            }
            return { status: "success" };
        } catch (error) {
            Toast.error(error || "Error checking Password Validity");
            return { status: "failed" };
        }
    }

    const verifyPasswordChangeOTP = async (otp: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/verify-otp/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ otp: otp })
            });
            const responseBody = await res.json();
            if (!res.ok) {
                Toast.error(responseBody?.message || "Wrong OTP");
                return { status: "failed" };
            }
            return { status: "success" };
        } catch (error) {
            Toast.error(error || "Error Validating OTP");
            return { status: "failed" };
        }
    }


    const resend_verifyPasswordChangeOTP = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/resend-otp/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({})
            });
            const responseBody = await res.json();
            if (!res.ok) {
                Toast.error(responseBody?.message || "Failed to resend OTP");
                return { status: "failed" };
            }
            return { status: "success" };
        } catch (error) {
            Toast.error(error || "Error cResending OTP");
            return { status: "failed" };
        }
    }

    const changePassword = async (currentPassword: string, newPassword: string) => { }




    // User Actions
    const createUser = async (userData: User, token: string, refresh: string) => {
        setUser(userData);
        setToken(token);
        await localStorage.setItem("user", JSON.stringify(userData));
        await localStorage.setItem("token", token);
        await localStorage.setItem("refresh", refresh);
        console.log("user", JSON.stringify(userData));
        console.log("token", token);
        console.log("refresh", refresh);
    };

    const createTempUser = async (userData: User, token: string, code: string) => {
        setTempUser(userData);
        setToken(token);
        await localStorage.setItem("tempUser", JSON.stringify(userData));
        await localStorage.setItem("token", token);
        await localStorage.setItem("code", code);
        console.log("tempUser", JSON.stringify(userData));
        console.log("token", token);
        console.log("code", code);
    };

    const logout = async () => {
        setUser(null);
        setTempUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("code");
        localStorage.clear()
        router.push("/login");
    };




    return (
        <AuthContext.Provider
            value={{
                user,
                tempUser,
                authStep,
                code,
                firstLoad,
                createUser,
                logout,
                formData,
                setFormData,
                errors,
                setErrors,
                loading,
                subLoading,
                login,
                signup,
                createProfile,
                verifyRegistrationOtp,
                requestRegistrationOtp,
                updateProfile,
                verifyOldPassword,
                verifyPasswordChangeOTP,
                resend_verifyPasswordChangeOTP,
                changePassword,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

export const useAuth_ = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};





// {"status":true,"code":7001,"message":"Onboarding not completed","data":{"id":112,"first_name":"Splendor","last_name":"Marvel Jerry","email":"jerrysplendour6204+34@gmail.com","phone_number":null,"date_of_birth":null,"gender":null,"country":{"id":null,"name":null},"avatar":"https://your-default-avatar-url.com/default.png","username":"jerrysplendour6204+34@gmail.com","state":null,"location":"","onboarding_status":"verify_device","role":"seeker"},"meta":null}