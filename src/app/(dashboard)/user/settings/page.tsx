"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Lock, Shield, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { type ChangeEvent, useEffect, useState } from "react"
import { BiCamera } from "react-icons/bi"
import { z } from "zod"
import { useAuth } from "@/context/AuthContext"

const Settings = () => {
    const { user, formData, setFormData, updateProfile, errors, loading, setErrors } = useAuth()

    const [profileSrc, setProfileSrc] = useState<string>("")
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [countries, setCountries] = useState<string[]>(["AW Aruba"])
    const [countryEnum, setCountryEnum] = useState<any>(null)
    const [skills, setSkills] = useState<string[]>([])
    const [disabledFields, setDisabledFields] = useState<any>({
        email: true
    })

    const serviceOptions = ["service1", "service2", "service3"] as const
    const genderOptions = ["male", "female"] as const
    const intervalOptions = [
        "1 hour",
        "2 hours",
        "3 hours",
        "4 hours",
        "5 hours",
        "6 hours",
        "7 hours",
        "8 hours",
        "9 hours",
        "10 hours",
    ] as const
    const educationOptions = ["High School", "Bachelor's", "Master's", "PhD"] as const
    const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const
    //   const timeOptions = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"]
    const timeOptions = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);


    useEffect(() => {
        const fecthcountry = async () => {
            const data = await fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
                .then((response) => response.json())
                .then((data) => {
                    return data.countries.map((country: any) => {
                        return country.label
                    })
                })
            setCountries(data)
            setCountryEnum(z.enum(data))
        }

        fecthcountry()
    }, [])

    useEffect(() => {
        if (formData.available_work_time) {
            const [from, to] = formData.available_work_time.split('-').map((t: any) => t.trim());
            setFromTime(from);
            setToTime(to);
        }
        if (formData.available_work_day) {
            const [from, to] = formData.available_work_day.split('-').map((t: any) => t.trim());
            setFromDate(from);
            setToDate(to);
        }
    }, [formData]);

    const formSchema = z.object({
        fullname: z
            .string()
            .min(2, { message: "Full name is required" })
            .max(50, { message: "Full name cannot exceed 50 characters" }),
        mobileNumber: z
            .string()
            .min(2, { message: "mobile number is required" })
            .max(15, { message: "mobile number cannot exceed 15 characters" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(50, { message: "Password cannot exceed 50 characters" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
        service: z.enum(serviceOptions),
        gender: z.enum(genderOptions),
        from: z
            .string()
            .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format. Please use HH:MM format." }),
        to: z
            .string()
            .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format. Please use HH:MM format." }),
        interval: z.enum(intervalOptions),
        country: countryEnum || z.string().min(1, { message: "Country is required" }),
        state: z
            .string()
            .min(2, { message: "State is required" })
            .max(50, { message: "State cannot exceed 50 characters" }),
        address: z.string().min(2, { message: "address is required" }),
        referralCode: z.string().optional(),
    })

    const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files || []
        if (files[0]) {
            const blob = new Blob([files[0]], { type: files[0].type })
            const imageUrl = URL.createObjectURL(blob)
            setProfileSrc(imageUrl)
            setFormData({ ...formData, avatar_file: files[0] })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (name === "fromTime" || name === "toTime") {
            name === "fromTime" ? setFromTime(value) : setToTime(value);
            const available_work_time = name === "fromTime" ? `${value}-${toTime}` : `${fromTime}-${value}`
            setFormData((prev: any) => ({
                ...prev,
                available_work_time
            }));
            checkForErrors({ name: "available_work_time", value: available_work_time });
            return;
        }
        if (name === "fromDate" || name === "toDate") {
            name === "fromDate" ? setFromDate(value) : setToDate(value);
            const available_work_day = name === "fromDate" ? `${value}-${toDate}` : `${fromDate}-${value}`
            setFormData((prev: any) => ({
                ...prev,
                available_work_day
            }));
            checkForErrors({ name: "available_work_day", value: available_work_day });
            return;
        }

        setFormData((prev: any) => ({ ...prev, [name]: value }))
        checkForErrors({ name, value });
    }

    const handleRadioChange = (name: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [name]: value }))
        checkForErrors({ name, value })
    }

    const checkForErrors = ({ name, value }: { name: string; value: any }) => {
        try {
            const fieldSchema = (formSchema as any).shape?.[name]
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

    const handleAddSkill = () => {
        setSkills([...skills, ""])
    }

    const handleSkillChange = (index: number, value: string) => {
        const newSkills = [...skills]
        newSkills[index] = value
        setSkills(newSkills)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const availableTime = (fromTime && toTime) ? `${fromTime}-${toTime}` : "";
        await updateProfile(formData, user?.role || "seeker")
    }

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
                    <Link
                        href="/user/settings"
                        className="p-2 xl:p-3 px-4 bg-primary-2 text-primary-1 font-medium text-base xl:text-xl"
                    >
                        <span className="flex items-center gap-2">
                            <User size={18} /> Profile settings
                        </span>
                    </Link>
                    <Link
                        href="/user/settings/password"
                        className="p-2 lg:p-3 px-4 bg-[#fff] text-primary-1 flex-1 text-center xl:text-start font-medium text-base xl:text-xl"
                    >
                        <span className="flex items-center gap-2">
                            <Lock size={18} /> Password
                        </span>
                    </Link>
                    <Link
                        href="/password"
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
                {/* <div className="w-[400px] z-50">{JSON.stringify(formData)}</div> */}

                {/* Form - Seeker */}
                {user?.role === "seeker" && (
                    <div className="flex flex-col rounded-2xl border-2 overflow-hidden py-3 shadow-xl">
                        <form className="flex items-start flex-col w-full max-w-[1024px] px-8 py-16" onSubmit={handleSubmit}>
                            {/* Avatar */}
                            <div className="flex gap-8 w-full items-center">
                                <div className="relative mb-4">
                                    <div className="w-[100px] h-[100px] xl:w-[130px] xl:h-[130px] border-[2px] border-primary-1 rounded-full relative flex items-center justify-center bg-[#F8F7F7]">
                                        <Image src="/assets/images/profile.svg" alt="profile" className="z-0" width={43} height={48} />
                                        {profileSrc && (
                                            <Image
                                                src={profileSrc || "/placeholder.svg"}
                                                className="w-auto h-auto rounded-full object-cover z-10 absolute top-0 left-0"
                                                width={200}
                                                height={200}
                                                alt="profile image"
                                            />
                                        )}
                                        <label htmlFor="fileInput">
                                            <BiCamera className="text-white w-9 h-9 xl:w-10 xl:h-10 cursor-pointer bg-primary-1 border-[6px] border-white absolute rounded-full p-1 -right-2 bottom-0 xl:right-0 z-20" />
                                        </label>
                                    </div>
                                    <input id="fileInput" hidden type="file" onChange={handleProfile} name="profile_pic" />
                                </div>
                                <div className="flex justify-center items-center gap-3">
                                    <Button size="sm">Upload New</Button>
                                    <Button size="sm" className="bg-gray-500">
                                        Delete Avatar
                                    </Button>
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div className="flex items-start flex-col md:flex-row gap-10 w-full">
                                <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                                    <div>
                                        <label className="font-normal text-xs text-primary-1">First name</label>
                                        <input
                                            name="first_name"
                                            value={formData.first_name || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder="First name"
                                        />
                                        {errors.fullname && <p className="text-red-500 text-xs">{errors.fullname}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            disabled={disabledFields.email}
                                            value={user.email || ""}
                                            onChange={handleChange}
                                            className={`w-full border rounded-md p-2 ${disabledFields.email ? "text-gray-400" : "text-black-1"}`}
                                            placeholder="example@gmail.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Sex</label>
                                        <div className="flex gap-4 mt-2">
                                            <label className="flex items-center gap-2 border rounded-md p-2 cursor-pointer flex-1">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={formData.gender === "male"}
                                                    onChange={(e) => handleRadioChange("gender", e.target.value)}
                                                />
                                                Male
                                            </label>
                                            <label className="flex items-center gap-2 border rounded-md p-2 cursor-pointer flex-1">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    checked={formData.gender === "female"}
                                                    onChange={(e) => handleRadioChange("gender", e.target.value)}
                                                />
                                                Female
                                            </label>
                                        </div>
                                        {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Postal Code</label>
                                        <input
                                            name="post_code"
                                            value={formData.post_code || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder=""
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Last name</label>
                                        <input
                                            name="last_name"
                                            value={formData.last_name || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder="Last name"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Mobile Number</label>
                                        <input
                                            name="phone_number"
                                            value={formData.phone_number || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder="07064553249"
                                        />
                                        {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">D O B</label>
                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            value={formData.date_of_birth || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">State of Residence</label>
                                        <input
                                            name="state"
                                            value={formData.state || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder=""
                                        />
                                        {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Residential Address</label>
                                        <textarea
                                            name="location"
                                            value={formData.location || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder="St george street Adamo, Lagos"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 w-full sm:max-w-[1024px]">
                                <label className="font-normal text-xs text-primary-1">Enter a bio (optional)</label>
                                <Textarea
                                    name="bio"
                                    value={formData.bio || ""}
                                    onChange={handleChange}
                                    placeholder="Enter a bio"
                                    rows={6}
                                />
                            </div>

                            <div className="mt-5 lg:mt-10">
                                <Button size="rs" disabled={loading}>
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Form - Provider */}
                {user?.role === "provider" && (
                    <div className="flex flex-col rounded-2xl border-2 overflow-hidden py-3 shadow-xl">
                        <form className="flex items-start flex-col w-full max-w-[1024px] px-8 py-16" onSubmit={handleSubmit}>
                            {/* Avatar */}
                            <div className="flex gap-8 w-full items-center">
                                <div className="relative mb-4">
                                    <div className="w-[100px] h-[100px] xl:w-[130px] xl:h-[130px] border-[2px] border-primary-1 rounded-full relative flex items-center justify-center bg-[#F8F7F7]">
                                        <Image src="/assets/images/profile.svg" alt="profile" className="z-0" width={43} height={48} />
                                        {profileSrc && (
                                            <Image
                                                src={profileSrc || "/placeholder.svg"}
                                                className="w-auto h-auto rounded-full object-cover z-10 absolute top-0 left-0"
                                                width={200}
                                                height={200}
                                                alt="profile image"
                                            />
                                        )}
                                        <label htmlFor="fileInput">
                                            <BiCamera className="text-white w-9 h-9 xl:w-10 xl:h-10 cursor-pointer bg-primary-1 border-[6px] border-white absolute rounded-full p-1 -right-2 bottom-0 xl:right-0 z-20" />
                                        </label>
                                    </div>
                                    <input id="fileInput" hidden type="file" onChange={handleProfile} name="profile_pic" />
                                </div>
                                <div className="flex justify-center items-center gap-3">
                                    <Button size="sm">Upload New</Button>
                                    <Button size="sm" className="bg-gray-500">
                                        Delete Avatar
                                    </Button>
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div className="flex items-start flex-col md:flex-row gap-10 w-full">
                                <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                                    <div>
                                        <label className="font-normal text-xs text-primary-1">First name</label>
                                        <input
                                            name="first_name"
                                            value={formData.first_name || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder="First name"
                                        />
                                        {errors.fullname && <p className="text-red-500 text-xs">{errors.fullname}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            disabled={disabledFields.email}
                                            value={user.email || ""}
                                            onChange={handleChange}
                                            className={`w-full border rounded-md p-2 ${disabledFields.email ? "text-gray-400" : "text-black-1"}`}
                                            placeholder="example@gmail.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Sex</label>
                                        <div className="flex gap-4 mt-2">
                                            <label className="flex items-center gap-2 border rounded-md p-2 cursor-pointer flex-1">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={formData.gender === "male"}
                                                    onChange={(e) => handleRadioChange("gender", e.target.value)}
                                                />
                                                Male
                                            </label>
                                            <label className="flex items-center gap-2 border rounded-md p-2 cursor-pointer flex-1">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    checked={formData.gender === "female"}
                                                    onChange={(e) => handleRadioChange("gender", e.target.value)}
                                                />
                                                Female
                                            </label>
                                        </div>
                                        {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Postal Code</label>
                                        <input
                                            name="post_code"
                                            value={formData.post_code || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder=""
                                        />
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Business Name</label>
                                        <input
                                            name="business_name"
                                            value={formData.business_name || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder=""
                                        />
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Education Level</label>
                                        <select
                                            name="education_level"
                                            value={formData.education_level || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                        >
                                            <option value="">Select Education Level</option>
                                            {educationOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Add Skill</label>
                                        <select name="skills" className="w-full border rounded-md p-2">
                                            <option value={formData.skills || ""}>Select Skill</option>
                                            {serviceOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Working Days</label>
                                        <div className="flex gap-3 mt-2">
                                            <select
                                                name="fromDate"
                                                value={fromDate || ""}
                                                onChange={handleChange}
                                                className="w-full border rounded-md p-2"
                                            >
                                                <option value="">From</option>
                                                {dayOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                name="toDate"
                                                value={toDate || ""}
                                                onChange={handleChange}
                                                className="w-full border rounded-md p-2"
                                            >
                                                <option value="">To</option>
                                                {dayOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Last name</label>
                                        <input
                                            name="last_name"
                                            value={formData.last_name || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder="Last name"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Mobile Number</label>
                                        <input
                                            name="phone_number"
                                            value={formData.phone_number || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder="07064553249"
                                        />
                                        {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">D O B</label>
                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            value={formData.date_of_birth || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">State of Residence</label>
                                        <input
                                            name="state"
                                            value={formData.state || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder=""
                                        />
                                        {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Residential Address</label>
                                        <textarea
                                            name="location"
                                            value={formData.location || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder="St george street Adamo, Lagos"
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">RC Number</label>
                                        <input
                                            name="rc_number"
                                            value={formData.rc_number || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder=""
                                        />
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Core Service</label>
                                        <select
                                            name="core_service"
                                            value={formData.core_service || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                        >
                                            <option value="">Select Core Service</option>
                                            {serviceOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="font-normal text-xs text-primary-1">Working Hours</label>
                                        <div className="flex gap-3 mt-2">
                                            <select
                                                name="fromTime"
                                                value={fromTime || ""}
                                                onChange={handleChange}
                                                className="w-full border rounded-md p-2"
                                            >
                                                <option value="">From</option>
                                                {timeOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                name="toTime"
                                                value={toTime || ""}
                                                onChange={handleChange}
                                                className="w-full border rounded-md p-2"
                                            >
                                                <option value="">To</option>
                                                {timeOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 w-full sm:max-w-[1024px]">
                                <label className="font-normal text-xs text-primary-1">Enter a bio (optional)</label>
                                <Textarea
                                    name="bio"
                                    value={formData.bio || ""}
                                    onChange={handleChange}
                                    placeholder="Enter a bio"
                                    rows={6}
                                />
                            </div>

                            {/* Add more skills button */}
                            <div className="mt-5 w-full sm:max-w-[482px]">
                                <button
                                    type="button"
                                    onClick={handleAddSkill}
                                    className="flex items-center gap-2 text-primary-1 font-medium text-sm"
                                >
                                    + Add more Skills
                                </button>
                            </div>

                            {/* Portfolio Upload */}
                            <div className="mt-8 w-full sm:max-w-[1024px]">
                                <label className="font-normal text-xs text-primary-1 block mb-4">Upload Portfolio Images</label>
                                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <p className="text-sm text-gray-600">Select or drag a file (Jpg format)</p>
                                        <Button size="sm" type="button">
                                            Select a file
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 lg:mt-10">
                                <Button size="rs" disabled={loading}>
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Settings














const Settings__ = () => {
    const { user, formData, setFormData, updateProfile, errors, loading, setErrors } = useAuth();



    const [profileSrc, setProfileSrc] = useState<string>('');
    const [countries, setCountries] = useState<string[]>(["AW Aruba"]);
    const [countryEnum, setCountryEnum] = useState<any>(null);

    const serviceOptions = ["service1", "service2", "service3"] as const
    const genderOptions = ["male", "female"] as const
    const intervalOptions = ["1 hour", "2 hours", "3 hours", "4 hours", "5 hours", "6 hours", "7 hours", "8 hours", "9 hours", "10 hours"] as const

    useEffect(() => {

        const fecthcountry = async () => {
            const data = await fetch(
                "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
            )
                .then((response) => response.json())
                .then((data) => {
                    return data.countries.map((country: any) => {
                        return country.label
                    })
                });
            setCountries(data);
            setCountryEnum(z.enum(data));
        }

        fecthcountry()
    }, []);


    const formSchema = z.object({
        fullname: z.string().min(2, { message: "Full name is required" }).max(50, { message: "Full name cannot exceed 50 characters" }),
        mobileNumber: z.string().min(2, { message: "mobile number is required" }).max(15, { message: "mobile number cannot exceed 15 characters" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long" })
            .max(50, { message: "Password cannot exceed 50 characters" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
        service: z.enum(serviceOptions),
        gender: z.enum(genderOptions),
        from: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format. Please use HH:MM format." }),
        to: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format. Please use HH:MM format." }),
        interval: z.enum(intervalOptions),
        country: countryEnum || z.string().min(1, { message: "Country is required" }),
        state: z.string().min(2, { message: "State is required" }).max(50, { message: "State cannot exceed 50 characters" }),
        address: z.string().min(2, { message: "address is required" }),
        referralCode: z.string().optional(),
    })

    const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files || [];
        if (files[0]) {
            const blob = new Blob([files[0]], { type: files[0].type });
            const imageUrl = URL.createObjectURL(blob);
            setProfileSrc(imageUrl);
            setFormData({ ...formData, avatar_file: files[0] });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
        checkForErrors({ name, value });
    };

    const checkForErrors = ({ name, value }: { name: string, value: any }) => {
        // 2️⃣ Live validate just this field
        try {
            const fieldSchema = (formSchema as any).shape?.[name]; // "scheme" = your active zod schema
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
        await updateProfile(formData, user?.role || "seeker");
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
                    <Link href="/settings" className="p-2 xl:p-3 px-4 bg-primary-2 text-primary-1 font-medium text-base xl:text-xl">
                        <span className="flex items-center gap-2">
                            <User size={18} /> Profile settings
                        </span>
                    </Link>
                    <Link href="/password" className="p-2 lg:p-3 px-4 bg-[#fff] text-primary-1 flex-1 text-center xl:text-start font-medium text-base xl:text-xl">
                        <span className="flex items-center gap-2">
                            <Lock size={18} /> Password
                        </span>
                    </Link>
                    <Link href="/password" className="p-2 lg:p-3 px-4 bg-[#fff] text-primary-1 flex-1 text-center xl:text-start font-medium text-base xl:text-xl">
                        <span className="flex items-center gap-2">
                            <Shield size={18} /> Security
                        </span>
                    </Link>
                    <Link href="/notifications" className="p-2 lg:p-3 px-4 bg-[#fff] text-primary-1 font-medium text-base xl:text-xl">
                        <span className="flex items-center gap-2">
                            <Bell size={18} /> Notifications
                        </span>
                    </Link>
                </div>

                {/* Form - seeker */}
                {user?.role === "seeker" && <div className="flex flex-col rounded-2xl border-2 overflow-hidden py-3 shadow-xl">
                    <form className="flex items-start flex-col w-full max-w-[1024px] px-8 py-16" onSubmit={handleSubmit}>
                        {/* Avatar */}
                        <div className="flex gap-8 w-full items-center">
                            <div className="relative mb-4">
                                <div className="w-[100px] h-[100px] xl:w-[130px] xl:h-[130px] border-[2px] border-primary-1 rounded-full relative flex items-center justify-center bg-[#F8F7F7]">
                                    <Image src="/assets/images/profile.svg" alt="profile" className="z-0" width={43} height={48} />
                                    {profileSrc && (
                                        <Image
                                            src={profileSrc}
                                            className="w-auto h-auto rounded-full object-cover z-10 absolute top-0 left-0"
                                            width={200}
                                            height={200}
                                            alt="profile image"
                                        />
                                    )}
                                    <label htmlFor="fileInput">
                                        <BiCamera className="text-white w-9 h-9 xl:w-10 xl:h-10 cursor-pointer bg-primary-1 border-[6px] border-white absolute rounded-full p-1 -right-2 bottom-0 xl:right-0 z-20" />
                                    </label>
                                </div>
                                <input id="fileInput" hidden type="file" onChange={handleProfile} name="profile_pic" />
                            </div>
                            <div className="flex justify-center items-center gap-3">
                                <Button size="sm">Upload New</Button>
                                <Button size="sm" className="bg-gray-500">
                                    Delete Avatar
                                </Button>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="flex items-start flex-col md:flex-row gap-10 w-full">
                            <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                                <div>
                                    <label className="font-normal text-xs text-primary-1">Full Name</label>
                                    <input
                                        name="fullname"
                                        value={formData.fullname || ""}
                                        onChange={handleChange}
                                        className="w-full border rounded-md p-2"
                                        placeholder="Full name"
                                    />
                                    {errors.fullname && <p className="text-red-500 text-xs">{errors.fullname}</p>}
                                </div>

                                <div>
                                    <label className="font-normal text-xs text-primary-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleChange}
                                        className="w-full border rounded-md p-2"
                                        placeholder="Email Address"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="font-normal text-xs text-primary-1">Gender</label>
                                    <select name="gender" value={formData.gender || ""} onChange={handleChange} className="w-full border rounded-md p-2">
                                        <option value="">Select Gender</option>
                                        {genderOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-5 w-full sm:max-w-[482px]">
                                <div>
                                    <label className="font-normal text-xs text-primary-1">Mobile Number</label>
                                    <input
                                        name="mobileNumber"
                                        value={formData.mobileNumber || ""}
                                        onChange={handleChange}
                                        className="w-full border rounded-md p-2"
                                        placeholder="Mobile Number"
                                    />
                                    {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber}</p>}
                                </div>

                                <div>
                                    <label className="font-normal text-xs text-primary-1">Select Available Time</label>
                                    <div className="flex items-center justify-between gap-3 mt-2">
                                        <input type="time" name="from" value={formData.from || ""} onChange={handleChange} className="border p-2 rounded-md w-full" />
                                        <input type="time" name="to" value={formData.to || ""} onChange={handleChange} className="border p-2 rounded-md w-full" />
                                    </div>
                                    {(errors.from || errors.to) && <p className="text-red-500 text-xs">{errors.from || errors.to}</p>}
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <div className="w-full">
                                        <label className="font-normal text-xs text-primary-1">Country</label>
                                        <select name="country" value={formData.country || ""} onChange={handleChange} className="w-full border rounded-md p-2">
                                            <option value="">Select Country</option>
                                            {countries.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                                    </div>

                                    <div className="w-full">
                                        <label className="font-normal text-xs text-primary-1">State of Residence</label>
                                        <input
                                            name="state"
                                            value={formData.state || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2"
                                            placeholder="Delta State"
                                        />
                                        {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 w-full sm:max-w-[547px]">
                            <label className="font-normal text-xs text-primary-1">Enter a bio  (optional)</label>
                            <Textarea
                                name="address"
                                value={formData.bio || ""}
                                onChange={handleChange}
                                placeholder="Enter Address"
                                rows={6}
                            />
                            {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                        </div>

                        <div className="mt-5 lg:mt-10">
                            <Button size="rs" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </div>}
            </section>
        </div>
    )
}

