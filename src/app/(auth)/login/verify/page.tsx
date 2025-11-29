"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { resendForgotPasswordOtp, verifyForgotPasswordOtp } from "@/actions/auth";
import { Otp } from "@/lib/definitions";
import Countdown from "react-countdown";
import { motion } from "framer-motion"

const VerifyForgotPassword = () => {
  // Custom hook to handle authentication logic
  // It uses the Otp schema for validation and the verifyForgotPasswordOtp action for OTP verification

  const { form, loading, onSubmit } = useAuth({
    schema: Otp,
    action: verifyForgotPasswordOtp,
    path: `/login/reset`,
  });

  // Custom hook to handle OTP request
  // It uses the requestRegistrationOtp action to resend the OTP
  const { onSubmit: resendOtp, loading: resendLoading } = useAuth({
    schema: Otp,
    action: resendForgotPasswordOtp,
  })

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
        <Form {...form}>
          <form
            className="flex items-center flex-col gap-y-4 w-full max-w-[1024px] px-4"
            onSubmit={form.handleSubmit(onSubmit)}
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
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP autoFocus maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <div className="mt-4 flex flex-col gap-y-4 w-full max-w-[482px] items-center">
              <p className="text-black-2 font-medium text-sm">
                Didn&rsquo;t recieved any email?{"  "}
                <Button type="button" disabled={resendLoading || loading} variant={"link"} onClick={form.handleSubmit(resendOtp)} className="text-primary-1 px-0 mr-4">
                  Resend
                </Button>
                {resendLoading &&
                  <Countdown className="text-primary-1" date={Date.now() + 30000} renderer={renderer} />
                }
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || resendLoading}
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                {loading ? 'Loading...' : 'Send'}
              </motion.button>


            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default VerifyForgotPassword;
