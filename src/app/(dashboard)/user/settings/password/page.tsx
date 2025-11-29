"use client"

import { Button } from "@/components/ui/button"
import { Check, CircleAlert, Ellipsis, Lock } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { z } from "zod"
import { Bell, Shield, User } from "lucide-react"
import Spinner, { Spinner2 } from "@/components/Spinner"
import { MotionConfig, motion } from "framer-motion"
import Countdown from "react-countdown"

const PasswordChange = () => {
    const { changePassword, verifyOldPassword, verifyPasswordChangeOTP, resend_verifyPasswordChangeOTP, loading, setErrors, errors } = useAuth()
    const [currentPassword, setCurrentPassword] = useState("");
    const [currentPasswordStatus, setCurrentPasswordStatus] = useState("");
    const [currentPasswordEvent, setCurrentPasswordEvent] = useState<NodeJS.Timeout | null>(null);
    const [otp, setOtp] = useState("");
    const [otpStatus, setOtpStatus] = useState("");
    const [otpEvent, setOtpEvent] = useState<NodeJS.Timeout | null>(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [otpNotSent, setOtpNotSent] = useState(true);
    const [otpNotVerified, setOtpNotVerified] = useState(true);
    const [waitTillRequestNewOTP, setWaitTillRequestNewOTP] = useState(false);
    const [waitBeforeResendEvent, setWaitBeforeResendEvent] = useState<NodeJS.Timeout | null>(null);


    useEffect(() => {
        // If there's no password, reset everything
        if (!currentPassword) {
            if (currentPasswordEvent) clearTimeout(currentPasswordEvent);
            setCurrentPasswordStatus("");
            return;
        }

        const verifyPassword = async () => {
            const result = await verifyOldPassword(currentPassword);
            setCurrentPasswordStatus(result.status);
            if (result.status === "success") {
                setOtpNotSent(false);
                waitBeforeResend();
            }
        };

        // typing started
        setCurrentPasswordStatus("typing");

        // clear any pending timeout
        if (currentPasswordEvent) clearTimeout(currentPasswordEvent);

        // start new timeout (user stops typing for 2s)
        const timeout = setTimeout(() => {
            setCurrentPasswordStatus("loading");

            verifyPassword().finally(() => {
                // After verification, if result isn’t failed/success → reset
                setTimeout(() => {
                    setCurrentPasswordStatus(prev => {
                        if (prev !== "failed" && prev !== "success") return "";
                        return prev;
                    });
                }, 200); // small buffer
            });
        }, 2000);

        setCurrentPasswordEvent(timeout);

        // Cleanup: clear timeout if password changes again before delay
        return () => clearTimeout(timeout);
    }, [currentPassword]);


    useEffect(() => {
        // If there's no otp, reset everything
        if (!otp) {
            if (otpEvent) clearTimeout(otpEvent);
            setOtpStatus("");
            return;
        }

        const verifyPassword = async () => {
            const result = await verifyPasswordChangeOTP(otp);
            setOtpStatus(result.status);
            if (result.status === "success") {
                setOtpNotVerified(false)
            }
        };

        // typing started
        setOtpStatus("typing");

        // clear any pending timeout
        if (otpEvent) clearTimeout(otpEvent);

        // start new timeout (user stops typing for 2s)
        const timeout = setTimeout(() => {
            setOtpStatus("loading");

            verifyPassword().finally(() => {
                // After verification, if result isn’t failed/success → reset
                setTimeout(() => {
                    setOtpStatus(prev => {
                        if (prev !== "failed" && prev !== "success") return "";
                        return prev;
                    });
                }, 200); // small buffer
            });
        }, 2000);

        setOtpEvent(timeout);

        // Cleanup: clear timeout if password changes again before delay
        return () => clearTimeout(timeout);
    }, [otp]);



    const passwordSchema = z
        .object({
            currentPassword: z.string().min(1, { message: "Current password is required" }),
            otp: z.string().min(1, { message: "Current password is required" }),
            newPassword: z
                .string()
                .min(8, { message: "Password must be at least 8 characters long" })
                .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
                .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
                .regex(/[0-9]/, { message: "Password must contain at least one number" })
                .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
            confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        })

    const validateField = (name: string, value: string) => {
        try {
            const fieldSchema = (passwordSchema as any).shape?.[name]
            if (fieldSchema) {
                const result = fieldSchema.safeParse(value)
                setErrors((prev: any) => {
                    const newErrors = { ...prev }
                    if (!result.success) {
                        newErrors[name] = result.error.issues[0]?.message || "Invalid value"
                    } else {
                        delete newErrors[name]
                    }
                    return newErrors
                })
            }
        } catch (err) {
            console.error("Validation error:", err)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === "currentPassword") {
            setCurrentPassword(value)
            validateField(name, value)
        } else if (name === "newPassword") {
            setNewPassword(value)
            validateField(name, value)
        } else if (name === "confirmPassword") {
            setConfirmPassword(value)
            validateField(name, value)
        } else if (name === "otp") {
            setOtp(value);
            validateField(name, value);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSuccessMessage("")
        setErrorMessage("")

        try {
            // Validate all fields
            const result = passwordSchema.safeParse({
                currentPassword,
                newPassword,
                confirmPassword,
            })

            if (!result.success) {
                const fieldErrors: Record<string, string> = {}
                result.error.issues.forEach((issue) => {
                    fieldErrors[issue.path[0] as string] = issue.message
                })
                setErrors(fieldErrors)
                return
            }

            // Call changePassword from useAuth
            await changePassword(currentPassword, newPassword)
            setSuccessMessage("Password changed successfully!")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setErrors({})
        } catch (error: any) {
            setErrorMessage(error.message || "Failed to change password")
        }
    }

    const waitBeforeResend = () => {
        setWaitTillRequestNewOTP(true);
        // clear any pending timeout
        if (waitBeforeResendEvent) clearTimeout(waitBeforeResendEvent);

        const timeout = setTimeout(() => {
            setWaitTillRequestNewOTP(false);
        }, 30000);

        setWaitBeforeResendEvent(timeout);
    }

    const resendOtp = async () => {
        const result = await resend_verifyPasswordChangeOTP();
        if (result.status === "success") {
            waitBeforeResend();
        }
    }

    const handleCancel = () => {
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setErrors({})
        setSuccessMessage("")
        setErrorMessage("")
    }

    const renderer = ({ hours, minutes, seconds, completed }: any) => {
        if (completed) {
            // Render a complete state
            return ("");
        } else {
            // Render a countdown
            return (
                <span>
                    {hours}:{minutes}:{seconds}
                </span>
            );
        }
    };

    return (
        <div className="px-2 md:px-10">
            <section className="py-4">
                <div className="flex flex-col gap-3">
                    <p className="text-black-1 text-xl lg:text-2xl">Account Settings</p>
                </div>
            </section>

            <section className="flex flex-col xl:flex-row items-start gap-6 xl:gap-10 py-4">
                {/* Sidebar */}
                <div className="flex flex-row xl:flex-col justify-between rounded-lg xl:rounded-2xl xl:border-2 overflow-hidden w-full max-w-[400px] xl:max-w-[270px] shadow-md xl:shadow-xl">
                    <Link href="/user/settings" className="p-2 xl:p-3 px-4 bg-[#fff] text-primary-1 font-medium text-base xl:text-xl">
                        <span className="flex items-center gap-2">
                            <User size={18} /> Profile settings
                        </span>
                    </Link>
                    <Link
                        href="/user/settings/password"
                        className="p-2 lg:p-3 px-4 bg-primary-2 text-primary-1 flex-1 text-center xl:text-start font-medium text-base xl:text-xl"
                    >
                        <span className="flex items-center gap-2">
                            <Lock size={18} /> Password
                        </span>
                    </Link>
                    <Link
                        href="/security"
                        className="p-2 lg:p-3 px-4 bg-[#fff] text-primary-1 flex-1 text-center xl:text-start font-medium text-base xl:text-xl"
                    >
                        <span className="flex items-center gap-2">
                            <Shield size={18} /> Security
                        </span>
                    </Link>
                    <Link
                        href="/notifications"
                        className="p-2 lg:p-3 px-4 bg-[#fff] text-primary-1 font-medium text-base xl:text-xl"
                    >
                        <span className="flex items-center gap-2">
                            <Bell size={18} /> Notifications
                        </span>
                    </Link>
                </div>

                {/* Password Change Form */}
                <div className="flex flex-col rounded-2xl border-2 overflow-hidden py-3 shadow-xl w-full max-w-[600px]">
                    <form className="flex items-start flex-col w-full px-8 py-4" onSubmit={handleSubmit}>
                        {/* Header */}
                        <div className="mb-16 w-full">
                            <h2 className="text-2xl font-semibold text-black-1 mb-2">Change Password</h2>
                            <p className="text-gray-600 text-sm">Change your account password</p>
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <div className="w-full mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-green-700 text-sm">{successMessage}</p>
                            </div>
                        )}

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-700 text-sm">{errorMessage}</p>
                            </div>
                        )}


                        <div className="flex flex-col gap-5 w-full mb-10">

                            {/* Current Password */}
                            <div className="w-full flex mb-1 gap-10">
                                <label className="w-[30%] font-normal text-sm text-primary-1 block mb-2">Current Password</label>
                                <div className="w-full">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={currentPassword}
                                            disabled={otpNotSent === true ? false : true}
                                            onChange={handleChange}
                                            className={`w-full border rounded-md p-3 text-sm placeholder-gray-400 ${otpNotSent === false && "bg-slate-200"}`}
                                            placeholder="Current Password"
                                        />
                                        <div className="absolute right-7 top-1/4">
                                            {currentPasswordStatus === "typing" && <Ellipsis className="animate-pulse" color="gray" />}
                                            {currentPasswordStatus === "loading" && <Spinner2 size={6} />}
                                            {currentPasswordStatus === "success" && <Check color="green" />}
                                            {currentPasswordStatus === "failed" && <CircleAlert color="red" />}
                                        </div>
                                    </div>
                                    {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
                                    <Link href="#" className="text-primary-1 text-xs mt-2 inline-block hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            {/* OTP */}
                            <motion.div
                                animate={otpNotSent ? { opacity: 0, height: 0 } : { opacity: 1, height: "auto" }}
                                transition={{ ease: "easeInOut", duration: 0.5, }}
                                className="w-full flex mb-10 gap-10">
                                <label className="w-[30%] font-normal text-sm text-primary-1 block mb-2">OTP</label>
                                <div className="w-full">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="otp"
                                            value={otp}
                                            disabled={otpNotSent}
                                            onChange={handleChange}
                                            className={`w-full border rounded-md p-3 text-sm placeholder-gray-400 ${otpNotSent && "bg-slate-200"}`}
                                            placeholder="Current Password"
                                        />
                                        <div className="absolute right-7 top-1/4">
                                            {otpStatus === "typing" && <Ellipsis className="animate-pulse" color="gray" />}
                                            {otpStatus === "loading" && <Spinner2 size={6} />}
                                            {otpStatus === "success" && <Check color="green" />}
                                            {otpStatus === "failed" && <CircleAlert color="red" />}
                                        </div>
                                    </div>
                                    {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                                    <p className="text-primary-1 text-xs mt-2 inline-block hover:underline">
                                        Enter the otp sent to your email.

                                        <Button type="button" disabled={waitTillRequestNewOTP || otpStatus.length >= 1} variant={"link"} onClick={resendOtp} className="text-primary-1 px-0 mr-4">
                                            Resend
                                        </Button>
                                        {waitTillRequestNewOTP &&
                                            <Countdown className="text-primary-1" date={Date.now() + 30000} renderer={renderer} />
                                        }
                                    </p>
                                </div>
                            </motion.div>

                            {/* New Password */}
                            <div className="w-full flex mb-6 gap-10">
                                <label className="w-[30%] font-normal text-sm text-primary-1 block mb-2">New Password</label>
                                <div className="w-full">
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        disabled={otpNotVerified}
                                        onChange={handleChange}
                                        className={`w-full border rounded-md p-3 text-sm placeholder-gray-400 ${otpNotVerified && "bg-slate-200"}`}
                                        placeholder="New Password"
                                    />
                                    {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="w-full flex mb-6 gap-10">
                                <label className="w-[30%] font-normal text-sm text-primary-1 block mb-2">Confirm Password</label>
                                <div className="w-full">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        disabled={otpNotVerified}
                                        onChange={handleChange}
                                        className={`w-full border rounded-md p-3 text-sm placeholder-gray-400 ${otpNotVerified && "bg-slate-200"}`}
                                        placeholder="Confirm Password"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 w-full mb-32">
                            <Button type="submit" disabled={loading} className="bg-primary-1 text-white hover:bg-primary-1/90 px-8">
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                            <Button type="button" onClick={handleCancel} className="bg-gray-500 text-white hover:bg-gray-600 px-8">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default PasswordChange
