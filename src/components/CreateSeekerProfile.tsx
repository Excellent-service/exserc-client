"use client"

import { PlusIcon } from '@radix-ui/react-icons';
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, parse, isValid } from "date-fns";
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { createSeekerProfile } from '@/actions/user';
import { useAuth } from '@/hooks/useAuth';
import { useAuth_ } from "@/context/AuthContext";
import useCountries from '@/hooks/useCountries';
import { motion } from "framer-motion"
import { ToastContainer } from "@/components/Toast";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import "@/components/ui/inputStyle.css"
import { CreateSeekerProfileSchema } from '@/lib/definitions';

const CreateSeekerProfile_ = () => {
  const [profileSrc, setProfileSrc] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<any>();
  const [phone, setPhone] = useState("");
  const genderOptions = ["male", "female"] as const

  const { countries, countrySchema } = useCountries();

  const schema = z.object({
    first_name: z.string().min(2, { message: "First name is required" }).max(50, { message: "First name cannot exceed 50 characters" }),
    last_name: z.string().min(2, { message: "Last name is required" }).max(50, { message: "Last name cannot exceed 50 characters" }),
    gender: z.enum(genderOptions),
    username: z.string().min(2, { message: "Username is required" }).max(50, { message: "Username cannot exceed 50 characters" }),

    phone_number: z.string().min(2, { message: "phone number is required" }).refine((val) => isValidPhoneNumber(val), { message: "Invalid phone number", }),
    date_of_birth: z.string().min(2, { message: "date of birth is required" }),
    country: countrySchema || z.string().min(1, { message: "Country is required" }),
    state: z.string().min(2, { message: "State is required" }).max(50, { message: "State cannot exceed 50 characters" }),
    post_code: z.string().min(2, { message: "Post Code is required" }),
    location: z.string().min(2, { message: "address is required" }),
    avatar_file: z.any().optional(),
  })

  const {
    form,
    loading,
    onSubmit
  } = useAuth({
    schema,
    action: createSeekerProfile,
    checked: true,
    path: '/find-service-providers',
  })

  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || []
    if (files[0]) {
      const blob = new Blob([files[0]], { type: files[0].type });
      const imageUrl = URL.createObjectURL(blob);
      form.setValue('avatar_file', files[0])
      setProfileSrc(imageUrl)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl mt-6 mb-6"
      >
        <Form {...form}>
          <form className='flex items-center flex-col gap-y-9 w-full max-w-5xl px-4 py-16' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col w-full items-center'>
              <div className='relative mb-4'>
                <div className='w-[100px] h-[100px] xl:w-[130px] xl:h-[130px] border-[2px] border-primary-1 rounded-full relative flex items-center justify-center bg-[#F8F7F7]'>
                  <Image src="/assets/images/profile.svg" alt='profile' className='z-0' width={43} height={48} />
                  {
                    profileSrc &&
                    <Image src={`${profileSrc}`} className='w-full h-full rounded-full object-cover z-10 absolute top-0 left-0' width={200} height={200} alt='profile image' />
                  }
                  <label htmlFor="fileInput">
                    <PlusIcon className='text-white w-10 h-10 cursor-pointer bg-primary-1 border-2 border-primary-three absolute rounded-full p-1 -bottom-1 -right-[3px] z-20' />
                  </label>
                </div>
                <input id='fileInput' hidden type="file" onChange={handleProfile} className='absolute rounded-full p-1 bottom-2 -right-full z-30' name="profile_picture"></input>
              </div>
              <h1 className='font-normal text-2xl sm:text-3xl text-center text-black-1'>Find Services Faster</h1>
              <h3 className='text-primary-1 font-normal text-xs sm:text-xl text-center mt-1'>Create Your Seeker Profile</h3>
              <p className='text-primary-1 font-normal text-sm text-center mt-1'>Tap The Plus Icon above to add Image</p>
            </div>

            {/* inputs begings */}
            <div className='flex flex-col lg:flex-row gap-10'>
              <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">

                {/* FirstName & LastName */}
                <div>
                  <FormLabel className='font-normal text-xs text-primary-1 pb-5'>Confirm Basic Info</FormLabel>
                  <div className='flex gap-3 mt-2'>
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem
                          className='w-full'
                        >
                          <FormControl
                            className='w-full'
                          >
                            <Input className='w-full' placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem
                          className='w-full'
                        >
                          <FormControl
                            className='w-full'
                          >
                            <Input className='w-full' placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='w-full'>
                            {
                              genderOptions?.map((option: string) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Username */}
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel className='font-normal text-xs text-primary-1'>User Name</FormLabel>
                        <FormControl>
                          <Input className='w-full' placeholder="johndoe1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* float to right */}
              </div>

              <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                {/* Phone Number & D.O.B. */}
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-normal text-xs text-primary-1'>Phone number</FormLabel>
                        <FormControl>
                          {/* <Input placeholder="+2349000000000" {...field} /> */}
                          <div className='w-[190px]'>
                            <PhoneInput
                              international
                              defaultCountry="NG" // Nigeria by default
                              value={phone}
                              onChange={(value: any) => {
                                setPhone(value);
                                form.setValue('phone_number', value)
                              }}
                              className={`
                              flex h-9 w-full bg-[#F8F7F7] rounded-md 
                            px-3 py-2 text-sm text-gray-700 transition-colors file:border-0 file:bg-transparent file:text-sm 
                            file:font-medium placeholder:font-normal font-normal focus-visible:outline-none 
                            focus-visible:ring-1 focus-visible:ring-primary-1 disabled:cursor-not-allowed 
                            disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 
                            dark:focus-visible:ring-slate-300`}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-normal text-xs text-primary-1'>Date of Birth</FormLabel>
                        <FormControl>
                          {/* <Input placeholder="D.O.B." {...field} /> */}
                          <DatePicker selected={selectedDate}
                            onChange={(date) => {
                              setSelectedDate(date);
                              form.setValue('date_of_birth', date?.toString())
                            }}
                            dateFormat={"dd-MM-yyyy"}
                            // calendarContainer={MyContainer}
                            placeholderText={new Date().toLocaleDateString()}
                            className={`flex h-9 w-full bg-[#F8F7F7] rounded-md 
                            px-3 py-2 text-sm text-gray-700 transition-colors file:border-0 file:bg-transparent file:text-sm 
                            file:font-medium placeholder:font-normal font-normal focus-visible:outline-none 
                            focus-visible:ring-1 focus-visible:ring-primary-1 disabled:cursor-not-allowed 
                            disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 
                            dark:focus-visible:ring-slate-300`}
                          />

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Country - State */}
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange}>
                          <FormLabel className='font-normal text-xs text-primary-1'>Location Information</FormLabel>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {
                              countries?.map((c) => (
                                <SelectItem key={c.name} value={c.id.toString()}>{c.name}</SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-normal text-xs text-primary-1'>-</FormLabel>
                        <FormControl>
                          <Input placeholder="Delta State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Post_code & location(Address) */}
                <div className='flex items-center justify-between gap-3'>
                  <FormField
                    control={form.control}
                    name="post_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Postal Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Enter Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* float to Left */}
              </div>
            </div>

            <div className='mt-4 flex flex-col gap-y-4  w-full max-w-[482px] items-center'>
              <p className='text-black-2 font-medium text-[10px] sm:text-sm'>By Signing up, you agree to our <Link href="#" className="text-[#3FBFA9]">Term & Conditions</Link> and <Link href="#" className="text-[#3FBFA9]">Privacy Policy</Link></p>
              <Button variant="default" className='w-full disabled:bg-primary-2' type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Create profile'}
              </Button>
              <p className='text-black-2 font-medium text-[10px] sm:text-sm'>Have an account? <Link href="/login" className="text-primary-1">Login</Link></p>
            </div>

          </form>
        </Form>
      </motion.div>
      <ToastContainer theme="dark" pauseOnHover newestOnTop pauseOnFocusLoss />
    </div>
  )
}

const CreateSeekerProfile = () => {
  const [profileSrc, setProfileSrc] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<any>();
  const [phone, setPhone] = useState("");

  const { countries } = useCountries();
  const genderOptions = ["male", "female"];

  const { formData, setFormData, createProfile, errors, loading, setErrors } = useAuth_();



  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    if (files[0]) {
      const blob = new Blob([files[0]], { type: files[0].type });
      const imageUrl = URL.createObjectURL(blob);
      setProfileSrc(imageUrl);
      setFormData({ ...formData, avatar_file: files[0] });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    checkForErrors({ name, value });
  };

  const checkForErrors = ({ name, value }: { name: string, value: any }) => {
    // 2️⃣ Live validate just this field
    try {
      const fieldSchema = (CreateSeekerProfileSchema as any).shape?.[name]; // "scheme" = your active zod schema
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
    await createProfile(formData, "seeker");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl mt-6 mb-6"
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-col gap-y-9 w-full max-w-5xl px-4 py-16"
        >
          {/* Profile Image */}
          <div className="flex flex-col w-full items-center">
            <div className="relative mb-4">
              <div className="w-[100px] h-[100px] xl:w-[130px] xl:h-[130px] border-[2px] border-primary-1 rounded-full relative flex items-center justify-center bg-[#F8F7F7]">
                <Image src="/assets/images/profile.svg" alt="profile" className="z-0" width={43} height={48} />
                {profileSrc && (
                  <Image
                    src={profileSrc}
                    className="w-full h-full rounded-full object-cover z-10 absolute top-0 left-0"
                    width={200}
                    height={200}
                    alt="profile image"
                  />
                )}
                <label htmlFor="fileInput">
                  <PlusIcon className="text-white w-10 h-10 cursor-pointer bg-primary-1 border-2 border-primary-three absolute rounded-full p-1 -bottom-1 -right-[3px] z-20" />
                </label>
              </div>
              <input id="fileInput" hidden type="file" onChange={handleProfile} />
            </div>
            <h1 className="font-normal text-2xl sm:text-3xl text-center text-black-1">Find Services Faster</h1>
            <h3 className="text-primary-1 font-normal text-xs sm:text-xl text-center mt-1">
              Create Your Seeker Profile
            </h3>
            <p className="text-primary-1 font-normal text-sm text-center mt-1">
              Tap The Plus Icon above to add Image
            </p>
          </div>

          {/* Inputs */}
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
              {/* Basic Info */}
              <div>
                <p className="font-normal text-xs text-primary-1 pb-2">Confirm Basic Info</p>
                <div className="flex gap-3 mt-2">
                  <div>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First name"
                      value={formData.first_name || ""}
                      onChange={handleChange}
                      className="w-full bg-[#F8F7F7] rounded-md px-3 py-2 text-sm"
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last name"
                      value={formData.last_name || ""}
                      onChange={handleChange}
                      className="w-full bg-[#F8F7F7] rounded-md px-3 py-2 text-sm"
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div className="gap-3">
                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  className={`w-full bg-[#F8F7F7] rounded-md px-3 py-2 text-sm appearance-none ${formData.gender ? "text-black" : "text-gray-400"}`}
                >
                  <option value="">Select gender</option>
                  {genderOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              {/*  Username */}
              <div className=" gap-3">
                <p className="font-normal text-xs text-primary-1 pb-2">User Name</p>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username || ""}
                  onChange={handleChange}
                  className="w-full bg-[#F8F7F7] rounded-md px-3 py-2 text-sm"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
            </div>


            <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
              {/* Phone & DOB */}
              <div className="flex gap-3">
                <div className='w-full lg:max-w-[50%]'>
                  <p className="font-normal text-xs text-primary-1 pb-2">Phone number</p>
                  <PhoneInput
                    international
                    defaultCountry="NG"
                    value={phone}
                    onChange={(value: any) => {
                      setPhone(value);
                      setFormData((prev: any) => ({
                        ...prev,
                        phone_number: value
                      }));
                      const name = "phone_number";
                      checkForErrors({ name, value });
                    }}
                    className="flex h-9 w-full bg-[#F8F7F7] rounded-md px-3 py-2 text-sm"
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
                  )}
                </div>

                <div className='w-full'>
                  <p className="font-normal text-xs text-primary-1 pb-2">Date of Birth</p>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      const name = "date_of_birth";
                      const value = date ? format(date, "yyyy-MM-dd") : "";
                      setFormData((prev: any) => ({ ...prev, date_of_birth: value }));
                      checkForErrors({ name, value });
                    }}
                   
                    dateFormat="MM/dd/yyyy"
                    placeholderText="20-12-2025"
                    className="flex h-9 w-full bg-[#F8F7F7] rounded-md px-3 py-2 text-sm"
                  />
                  <p>date: {JSON.stringify(formData.date_of_birth)}</p>
                  {errors.date_of_birth && (
                    <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>
                  )}
                </div>
              </div>

              {/* Country & State */}
              <div className=" gap-3">
                <p className="font-normal text-xs text-primary-1 pb-2 pt-2">Location Information</p>
                <div className="flex gap-3">
                  <div className='w-full'>
                    <select
                      name="country"
                      value={formData.country || ""}
                      onChange={handleChange}
                      className={`w-full bg-[#F8F7F7] rounded-md px-3 py-2 text-sm appearance-none ${formData.country ? "text-black" : "text-gray-400"}`}
                    >
                      <option value="">Select Country</option>
                      {countries?.map((c) => (
                        <option key={c.id} value={c.id.toString()}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                    )}
                  </div>

                  <div className='w-full'>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state || ""}
                      onChange={handleChange}
                      className="w-full bg-[#F8F7F7] rounded-md px-3 py-2 text-sm"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Post code & Address */}
              <div className="flex gap-3">
                <div className='w-full'>
                  <input
                    type="text"
                    name="post_code"
                    placeholder="Postal Code"
                    value={formData.post_code || ""}
                    onChange={handleChange}
                    className="w-full bg-[#F8F7F7] rounded-md px-3 py-2 text-sm"
                  />
                  {errors.post_code && (
                    <p className="text-red-500 text-sm mt-1">{errors.post_code}</p>
                  )}
                </div>

                <div className='w-full'>
                  <input
                    type="text"
                    name="location"
                    placeholder="Address"
                    value={formData.location || ""}
                    onChange={handleChange}
                    className="w-full bg-[#F8F7F7] rounded-md px-3 py-2 text-sm"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-4 flex flex-col gap-y-4 w-full max-w-[482px] items-center">
            <p className="text-black-2 font-medium text-[10px] sm:text-sm">
              By Signing up, you agree to our{" "}
              <Link href="#" className="text-[#3FBFA9]">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#3FBFA9]">
                Privacy Policy
              </Link>
            </p>
            <Button
              variant="default"
              className="w-full disabled:bg-primary-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Create profile"}
            </Button>
            <p className="text-black-2 font-medium text-[10px] sm:text-sm">
              Have an account?{" "}
              <Link href="/login" className="text-primary-1">
                Login
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
      <ToastContainer theme="dark" pauseOnHover newestOnTop pauseOnFocusLoss />
    </div>
  );
};

export default CreateSeekerProfile