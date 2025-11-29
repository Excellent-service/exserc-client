"use client"

import { Input } from "@/components/ui/input"
import Link from 'next/link';
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth_ } from "@/context/AuthContext";



import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { LoginFormSchema } from "@/lib/definitions";

function Login() {
  const { formData, setFormData, errors, setErrors, loading, login } = useAuth_();

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
      const fieldSchema = (LoginFormSchema as any).shape?.[name]; // "scheme" = your active zod schema
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };


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
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div className="flex flex-col gap-y-5 w-full max-w-[482px]">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-6 text-[16px] border bg-white/0 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password || ""}
                onChange={handleChange}
                className="w-full px-4 py-6 text-[16px] border bg-white/0 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className='flex items-center justify-between w-full mb-4 max-w-[482px]'>
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                name="rememberMe"
                checked={formData.rememberMe || false}
                onCheckedChange={(checked) =>
                  setFormData((prev: any) => ({ ...prev, rememberMe: !!checked }))
                }
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${formData.rememberMe ? "bg-teal-600 border-teal-600" : "border-gray-300"
                  }`}
              />
              <label
                htmlFor="remember"
                className="text-gray-600 font-medium text-[10px] sm:text-sm"
              >
                Keep me logged in
              </label>
            </div>
            <Link href="login/forgot-password" className='text-red-500 hover:underline font-medium text-xs sm:text-sm'>Forgot Password?</Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            {loading ? 'Loading...' : 'Login'}
          </motion.button>

          <p className="text-center text-gray-600">
            Don&rsquo;t have an account?{" "}
            <Link href="/signup" className="text-teal-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default Login