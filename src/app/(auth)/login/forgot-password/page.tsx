"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import Image from 'next/image'
import { requestForgotPasswordOtp } from '@/actions/auth'
import { ForgotPasswordSchema } from '@/lib/definitions'
import { useAuth } from '@/hooks/useAuth'
import { motion } from "framer-motion"

const ForgotPassword_old = () => {

  // Custom hook to handle authentication logic
  // It uses the LoginFormSchema for validation and the login action for authentication
  const {
    form,
    loading,
    onSubmit,
  } = useAuth({
    schema: ForgotPasswordSchema,
    action: requestForgotPasswordOtp,
    checked: true,
    path: '/login/verify'
  })

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <Form {...form}>
        <form className='flex items-center flex-col gap-y-4 w-full max-w-[1024px] px-4' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col w-full items-center gap-2'>
            <div>
              <Link href="/">
                <div className='w-12 h-12 rounded-md overflow-hidden'>
                  <Image src='/assets/images/favicon.png' className='block w-full h-full object-cover' alt='logo' width={50} height={50} />
                </div>
              </Link>
            </div>
            <h1 className='font-bold text-2xl sm:text-3xl text-center text-black-1 mb-6'>Forgot Password</h1>
          </div>
          <div className="flex flex-col gap-y-5 w-full max-w-[482px]">
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='mt-4 flex flex-col gap-y-4 w-full max-w-[482px] items-center'>
            <Button variant="default" className='w-full' type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Send'}
            </Button>
          </div>

        </form>
      </Form>
    </div>
  )
}

function ForgotPassword() {

  // Custom hook to handle authentication logic
  // It uses the LoginFormSchema for validation and the login action for authentication
  const {
    form,
    loading,
    onSubmit,
  } = useAuth({
    schema: ForgotPasswordSchema,
    action: requestForgotPasswordOtp,
    checked: true,
    path: '/login/verify'
  })

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-teal-600 mb-0 flex items-center justify-center">
            <Link href="/">
              <div className='w-40 h-12 rounded-md overflow-hidden opacity-90'>
                <Image src='/assets/images/logo-1.png' className='block object-contain w-full h-full' alt='logo' width={100} height={50} />
              </div>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>

            <div className="flex flex-col gap-y-5 w-full max-w-[482px]">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="Email Address" {...field}
                          className="w-full px-4 py-6 text-[16px] border bg-white/0 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              {loading ? 'Loading...' : 'Send'}
            </motion.button>

            <p className="text-center text-gray-600">
              Don&rsquo;t have an account?{" "}
              <Link href="/signup" className="text-teal-600 hover:underline">
                Sign Up
              </Link>
            </p>

            
          </form>
        </Form>
      </motion.div>
    </div>
  )
}

export default ForgotPassword