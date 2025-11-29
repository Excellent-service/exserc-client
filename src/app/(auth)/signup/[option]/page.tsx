"use client"

import React, { useState, use } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { SignupFormSchema } from '@/lib/definitions'
// import { signup } from '@/actions/auth'
import { useAuth } from '@/hooks/useAuth'
import { useAuth_ } from "@/context/AuthContext";
import { motion } from "framer-motion"
import { User, Check, Plus } from "lucide-react"


function SignUpOption({
  params,
}: {
  params: Promise<{ option: "seeker" | "provider" }>;
}) {
  const { option } = use(params);
  const [checked, setChecked] = useState<boolean>(false);



  const { formData, setFormData, errors, loading, signup, setErrors } = useAuth_();

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
      const fieldSchema = (SignupFormSchema as any).shape?.[name]; // "scheme" = your active zod schema
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
    await signup({ ...formData, role: option });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="text-gray-400" size={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
              {/* <span className="text-white text-xs font-bold">1</span> */}
              <Check className="text-white text-xs font-bold" size={11} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Register</h1>
          <p className="text-teal-600">To {option === "seeker" ? "find" : "provide"} a service</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div className="flex flex-col gap-y-5 w-full max-w-[482px]">
            <div>
              <Input
                type="text"
                name="full_name"
                placeholder="John Doe"
                value={formData.full_name || ""}
                onChange={handleChange}
                className="w-full px-4 py-6 text-[16px] border bg-white/0 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
              )}
            </div>

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

            <div>
              <Input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={formData.confirm_password || ""}
                onChange={handleChange}
                className="w-full px-4 py-6 text-[16px] border bg-white/0 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
              )}
            </div>

          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              name="terms"
              checked={formData.terms || false}
              onCheckedChange={(checked) => {
                const name = "terms";
                const value = !!checked;
                setFormData((prev: any) => ({ ...prev, terms: value }));
                checkForErrors({ name, value });
              }}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${formData.terms ? "bg-teal-600 border-teal-600" : "border-gray-300"
                }`}
            />
            <p className="text-sm text-gray-600">
              By Signing up, you agree to our{" "}
              <Link href="/terms" className="text-teal-600 hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-teal-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
          <p>{JSON.stringify(formData.role)}</p>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            {loading ? 'Loading...' : 'Register'}
          </motion.button>

          <p className="text-center text-gray-600">
            Have an account?{" "}
            <Link href="/login" className="text-teal-600 hover:underline">
              Log in
            </Link>
          </p>
        </form>

      </motion.div>
    </div>
  )
}

export default SignUpOption