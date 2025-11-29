import { z } from 'zod'
import { isValidPhoneNumber } from "react-phone-number-input";
const genderOptions = ["male", "female"] as const

export const SignupFormSchema = z
  .object({
    full_name: z
      .string()
      .min(2, { message: "full name is required" })
      .max(50, { message: "full name cannot exceed 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password cannot exceed 50 characters" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
    confirm_password: z.string(),
    role: z.enum(["seeker", "provider"]).optional(),
    terms: z.coerce
      .boolean()
      .refine((val) => val === true, {
        message: "You must accept the terms and conditions before proceeding",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"], // Target the confirmPassword field
    message: "Passwords must match",
  });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, { message: "Type your Password" }),
  rememberMe: z.coerce.boolean().optional(),
  // password: z.string().min(8, { message: "Password must be at least 8 characters long" })
  //   .max(50, { message: "Password cannot exceed 50 characters" })
  //   .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  //   .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  //   .regex(/[0-9]/, { message: "Password must contain at least one number" })
  //   .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" })
})




export const CreateSeekerProfileSchema = z.object({
  first_name: z.string().min(2, { message: "First name is required" }).max(50, { message: "First name cannot exceed 50 characters" }),
  last_name: z.string().min(2, { message: "Last name is required" }).max(50, { message: "Last name cannot exceed 50 characters" }),
  gender: z.enum(genderOptions),
  username: z.string().min(2, { message: "Username is required" }).max(50, { message: "Username cannot exceed 50 characters" }),
  phone_number: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((value) => isValidPhoneNumber(value), { message: "Invalid phone number" }),
  date_of_birth: z.string().min(2, { message: "date of birth is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(2, { message: "State is required" }).max(50, { message: "State cannot exceed 50 characters" }),
  post_code: z.string().min(2, { message: "Post Code is required" }),
  location: z.string().min(2, { message: "address is required" }),
  avatar_file: z.any().optional(),
})

export const CreateProviderProfileSchema = z.object({
  first_name: z.string().min(2, { message: "First name is required" }).max(50, { message: "First name cannot exceed 50 characters" }),
  last_name: z.string().min(2, { message: "Last name is required" }).max(50, { message: "Last name cannot exceed 50 characters" }),
  gender: z.enum(['male', 'female']),
  phone_number: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((value) => isValidPhoneNumber(value), { message: "Invalid phone number" }),
  date_of_birth: z.string().min(2, { message: "date of birth is required" }),
  business_name: z.string().min(2, { message: "company name is required" }).max(50, { message: "company name cannot exceed 50 characters" }),
  core_service: z.string().min(1, { message: "Service category is required" }),
  skills: z.string().min(1, { message: "Service is required" }),
  // education_level: z.string().min(1, { message: "Education level is required" }),
  available_work_time: z.string().min(2, { message: "Work time is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(2, { message: "State is required" }).max(50, { message: "State cannot exceed 50 characters" }),
  post_code: z.string().min(1, { message: "Postal Code is required" }),
  location: z.string().min(2, { message: "address is required" }),
  rc_number: z.string().optional(),
  // bio: z.string().min(2, { message: "Bio is required" }),
  avatar_file: z.any().optional(),
})


export const Otp = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export const Pin = z.object({
  pin1: z.string().min(4, {
    message: "Your Pin must be 4 characters.",
  }),
  pin2: z.string().min(4, {
    message: "Your Pin must be 4 characters.",
  }),
}).refine((data) => data.pin1 === data.pin2, {
  path: ["pin2"], // Target the pin2 field
  message: "Pins must match",
});

export interface SessionPayload {
  email?: string;
  role?: 'seeker' | 'provider';
  id?: number;
  reset_token?: string;
}

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const ResetPasswordSchema = z.object({
  new_password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  path: ["confirm_password"], // Target the confirmPassword field
  message: "Passwords must match",
});