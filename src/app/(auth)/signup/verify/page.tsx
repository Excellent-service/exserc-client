"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  CustomOTPInput
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useAuth_ } from "@/context/AuthContext";
import { requestRegistrationOtp, verifyRegistrationOtp } from "@/actions/auth";
import { Otp } from "@/lib/definitions";
import Countdown from "react-countdown";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion"

const VerifyRegistration_ = () => {
  // Custom hook to handle authentication logic
  // It uses the Otp schema for validation and the verifyRegistrationOtp action for OTP verification
  const searchParams = useSearchParams();
  // Extract end of path to get the role parameter
  const role = searchParams.get("role")

  // const { form, loading, onSubmit } = useAuth({
  //   schema: Otp,
  //   action: verifyRegistrationOtp,
  //   path: `/signup/create-profile?role=${role}`,
  // });

  // Custom hook to handle OTP request
  // It uses the requestRegistrationOtp action to resend the OTP
  // const { onSubmit: resendOtp, loading: resendLoading } = useAuth({
  //   schema: Otp,
  //   action: requestRegistrationOtp,
  // })

  const { user, formData, setFormData, errors, loading, subLoading, verifyRegistrationOtp, setErrors, requestRegistrationOtp } = useAuth_();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // 1️⃣ Update form data
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    checkForErrors({ name, value });
  };

  const checkForErrors = ({ name, value }: { name: string, value: any }) => {
    // 2️⃣ Live validate just this field
    try {
      const fieldSchema = (Otp as any).shape?.[name]; // "scheme" = your active zod schema
      if (fieldSchema) {
        const result = fieldSchema.safeParse(value);

        setErrors((prev: any) => {
          const newErrors = { ...prev };
          if (!result.success) {
            newErrors[name] = result.error.issues[0]?.message || "Invalid value";
          } else {
            delete newErrors[name];
          }
          return newErrors;
        });
      }
    } catch (err) {
      console.error("Validation error:", err);
    }
  }

  const resendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    requestRegistrationOtp()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyRegistrationOtp({ ...formData, email: user?.email });
  };



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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl"
      >
        <form
          className="flex items-center flex-col gap-y-4 w-full max-w-[1024px] px-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full items-center gap-2">
            <div>
              <Link href="/">
                <div className='w-40 h-12 rounded-md overflow-hidden opacity-90'>
                  <Image src='/assets/images/logo-1.png' className='block object-contain w-full h-full' alt='logo' width={100} height={50} />
                </div>
              </Link>
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl text-center text-black-1 mb-2">
              OTP Verification
            </h1>
            <h3 className="text-lg sm:text-xl text-center text-black-1 mb-6">
              Input 6 digit code sent to your email address
            </h3>
          </div>
          <div className="flex flex-col gap-y-5 w-full max-w-[482px] items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <label htmlFor="otp" className="text-sm text-center font-medium text-gray-700">
                Enter OTP
              </label>

              <div className="w-full flex justify-center items-center">
                <CustomOTPInput
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </div>

              {errors.otp && (
                <p className="text-sm text-red-500 mt-1">{errors.otp}</p>
              )}
            </div>

          </div>
          <div className="mt-4 flex flex-col gap-y-4 w-full max-w-[482px] items-center">
            <p className="text-black-2 font-medium text-sm">
              Didn&rsquo;t recieved any email?{"  "}
              <Button type="button" disabled={subLoading || loading} variant={"link"} onClick={resendOtp} className="text-primary-1 px-0 mr-4">
                Resend
              </Button>
              {subLoading &&
                <Countdown className="text-primary-1" date={Date.now() + 30000} renderer={renderer} />
              }
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || subLoading}
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              {loading ? 'Loading...' : 'Send'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};


function VerifyRegistration() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyRegistration_ />
    </Suspense>
  );
}

export default VerifyRegistration;
