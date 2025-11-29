"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ContactRound } from "lucide-react"
import Image from "next/image"

type SeekerStep = "overview" | "identity-selection" | "bvn-entry" | "entry" | "success"
type DocumentType = "nin" | "passport" | "drivers-license" | null

export function SeekerKYC() {
  const [currentStep, setCurrentStep] = useState<SeekerStep>("overview")
  const [history, setHistory] = useState<SeekerStep[]>([])
  const [selectedDoc, setSelectedDoc] = useState<DocumentType>(null)
  const [bvnDigits, setBvnDigits] = useState(Array(11).fill(""))
  const [passportDigits, setPassportDigits] = useState(Array(9).fill(""))

  const [ninDigits, setNinDigits] = useState(Array(11).fill(""))
  const [passportChars, setPassportChars] = useState(Array(9).fill(""))
  const [driversChars, setDriversChars] = useState(Array(11).fill(""))

  const goToStep = (step: SeekerStep) => {
    setHistory((prev) => [...prev, currentStep])
    setCurrentStep(step)
  }

  const handleBack = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev
      const lastStep = prev[prev.length - 1]
      setCurrentStep(lastStep)
      return prev.slice(0, -1)
    })
  }

  const BackButton = () =>
    currentStep !== "overview" ? (
      <button
        onClick={handleBack}
        className="mb-4 flex items-center gap-2 text-[#225F6A] hover:text-teal-800 transition-colors"
      >
        <ChevronLeft /> Back
      </button>
    ) : null

  const handleBvnChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newDigits = [...bvnDigits]
      newDigits[index] = value
      setBvnDigits(newDigits)

      if (value && index < 10) {
        const nextInput = document.getElementById(`bvn-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handlePassportChange_ = (index: number, value: string) => {
    if (value.length <= 1) {
      const newDigits = [...passportDigits]
      newDigits[index] = value
      setPassportDigits(newDigits)

      if (value && index < 8) {
        const nextInput = document.getElementById(`passport-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleNinChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newDigits = [...ninDigits]
      newDigits[index] = value
      setNinDigits(newDigits)
    }
  }

  const handlePassportChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      const newChars = [...passportChars]
      newChars[index] = value
      setPassportChars(newChars)
    }
  }

  const handleDriversChange = (index: number, value: string) => {
    const isLetter = /^[a-zA-Z]?$/.test(value)
    const isDigit = /^\d?$/.test(value)

    if (index < 3 && isLetter) {
      const newChars = [...driversChars]
      newChars[index] = value.toUpperCase()
      setDriversChars(newChars)
    } else if (index >= 3 && isDigit) {
      const newChars = [...driversChars]
      newChars[index] = value
      setDriversChars(newChars)
    }
  }

  const renderOverview = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-lg p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Update KYC</h1>
      <p className="text-gray-600 mb-8">
        This action woulld give you full access to the platform. It foosters trust and genuity . To ensure accurate KYC please note the following :
      </p>

      <div className="space-y-4 mb-8">
        <p className="text-sm text-gray-700"><span className="font-medium">1.</span> Ensure all information matches exactly as it appears on your official records (e.g., BVN, NIN, Passport, or Driver’s License)</p>
        <p className="text-sm text-gray-700"><span className="font-medium">2.</span> BVN and NIN must be 11 digits. Passport and License numbers must follow the correct format. Double-check before submitting.</p>
        <p className="text-sm text-gray-700"><span className="font-medium">3.</span> Too many failed verification attempts may temporarily lock your account. Double-check your details before resubmitting.</p>
        <p className="text-sm text-gray-700"><span className="font-medium">4.</span> Once submitted, your data cannot be edited during verification. Please confirm all fields before proceeding.</p>
      </div>

      <div className="space-y-4">
        <div
          onClick={() => goToStep("bvn-entry")}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100/0 rounded flex items-center justify-center"><span className="text-sm"><ContactRound /></span></div>
            <span className="font-medium text-gray-800">Bank Verification Number</span>
          </div>
          <span className="text-gray-400"><ChevronRight /></span>
        </div>

        <div
          onClick={() => goToStep("identity-selection")}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100/0 rounded flex items-center justify-center"><span className="text-sm"><ContactRound /></span></div>
            <span className="font-medium text-gray-800">Identity Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"><span className="text-white text-xs">!</span></div>
            <span className="text-gray-400"><ChevronRight /></span>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderIdentitySelection = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-lg p-8 flex flex-col justify-center items-center gap-2">

      <div className="w-[100%]">
        <BackButton />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Identity Verification</h1>
        <p className="text-gray-600 mb-8">This action woulld give you full access to the platform. It foosters trust and genuity . To ensure accurate KYC please note the following :</p>
      </div>

      <div className="bg-[#225F6A] rounded-lg p-10 mb-8 w-[90%] mx-20 flex items-center justify-center">
        <Image src='/assets/images/hugeicons_user-id-verification.png' className='block w-64 h-64 object-cover' alt='logo' width={400} height={400} />
      </div>

      <div className="space-y-4 mb-8 w-[70%]">
        <div className="flex justify-between items-center gap-4">
          <label htmlFor="nin" className="text-lg font-medium text-gray-800">National Identification Number</label>
          <input
            type="radio"
            id="nin"
            name="document-type"
            onChange={() => setSelectedDoc("nin")}
            className="w-5 h-5 accent-[#225F6A] rounded-full"
          />
        </div>

        <div className="flex justify-between items-center gap-4">
          <label htmlFor="passport" className="text-lg font-medium text-gray-800">International Passport</label>
          <input
            type="radio"
            id="passport"
            name="document-type"
            onChange={() => setSelectedDoc("passport")}
            className="w-5 h-5 accent-[#225F6A] rounded-full"
          />
        </div>

        <div className="flex justify-between items-center gap-4">
          <label htmlFor="drivers-license" className="text-lg font-medium text-gray-800">Driver&apos;s License</label>
          <input
            type="radio"
            id="drivers-license"
            name="document-type"
            onChange={() => setSelectedDoc("drivers-license")}
            className="w-5 h-5 accent-[#225F6A] rounded-full"
          />
        </div>
      </div>

      <button
        disabled={!selectedDoc}
        onClick={() => goToStep("entry")}
        className={`w-[700px] py-3 rounded-lg font-medium transition-colors ${selectedDoc ? "bg-[#225F6A] text-white hover:bg-[#174048]" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Continue
      </button>

      {/* <div className="space-y-4 mb-8 w-[70%]">
        <div className="flex justify-between items-center gap-4">
          <label
            htmlFor="national-id"
            className="text-lg font-medium text-gray-800"
          >
            National Identification Number
          </label>
          <input
            type="radio"
            id="national-id"
            name="document-type"
            className="w-5 h-5 accent-[#225F6A] rounded-full"
          />
        </div>

        <div className="flex justify-between items-center gap-4">
          <label
            htmlFor="passport"
            className="text-lg font-medium text-gray-800"
          >
            International Passport
          </label>
          <input
            type="radio"
            id="passport"
            name="document-type"
            defaultChecked
            className="w-5 h-5 accent-[#225F6A] rounded-full"
          />
        </div>

        <div className="flex justify-between items-center gap-4">
          <label
            htmlFor="drivers-license"
            className="text-lg font-medium text-gray-800"
          >
            Driver's License
          </label>
          <input
            type="radio"
            id="drivers-license"
            name="document-type"
            className="w-5 h-5 accent-[#225F6A] rounded-full"
          />
        </div>
      </div> */}

      {/* <button onClick={() => goToStep("entry")} className="w-[700px] bg-[#225F6A] text-white py-3 rounded-lg font-medium hover:bg-[#174048] transition-colors">Continue</button> */}
    </motion.div>
  )


  const renderBvnEntry = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col justify-center items-center bg-white rounded-lg p-8">
        <div className="w-full">
          <BackButton />
        </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Bank Verification Number</h1>
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter your BVN</h2>
        <h1 className="text-md text-gray-800 text-center mb-12">
          To verify your identity, please enter your 11-digit Bank Verification Number (BVN).
          Ensure the number matches exactly with your bank records. Submitting incorrect
          information may lead to failed verification.
        </h1>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {bvnDigits.map((digit, index) => (
          <input
            key={index}
            id={`bvn-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleBvnChange(index, e.target.value)}
            className="w-12 h-12 text-center border-b-2 border-gray-300 focus:border-[#225F6A] focus:outline-none text-lg font-medium"
            maxLength={1}
          />
        ))}
      </div>

      <div className="text-center mb-12">
        <button onClick={() => goToStep("success")} className="w-[400px] bg-[#225F6A] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#174048] transition-colors">Verify</button>
      </div>
    </motion.div>
  )

  const renderEntry = () => {
    let title = "";
    let description = "";
    let inputs: JSX.Element[] = []

    if (selectedDoc === "nin") {
      title = "Enter your NIN"
      description =
        "To verify your identity, please enter your 11-digit National Identification Number (NIN). Ensure it matches exactly as shown on your records. Submitting incorrect details may lead to failed verification."
      inputs = ninDigits.map((digit, i) => (
        <input
          key={i}
          value={digit}
          maxLength={1}
          onChange={(e) => handleNinChange(i, e.target.value)}
          className="w-12 h-12 text-center border-b-2"
        />
      ))
    }

    if (selectedDoc === "passport") {
      title = "Enter your Passport Number"
      description =
        "To verify your identity, please enter your 9-character International Passport Number. The first character must be a letter, followed by numbers. Double-check before submitting to avoid failed verification."
      inputs = passportChars.map((ch, i) => (
        <input
          key={i}
          value={ch}
          maxLength={1}
          onChange={(e) => handlePassportChange(i, e.target.value)}
          className="w-12 h-12 text-center border-b-2"
        />
      ))
    }

    if (selectedDoc === "drivers-license") {
      title = "Enter your Driver’s License Number"
      description =
        "To verify your identity, please enter your 11-character Driver’s License Number. The first three characters must be letters, followed by digits. Ensure accuracy to avoid failed verification."
      inputs = driversChars.map((ch, i) => (
        <input
          key={i}
          value={ch}
          maxLength={1}
          onChange={(e) => handleDriversChange(i, e.target.value)}
          className="w-12 h-12 text-center border-b-2"
        />
      ))
    }

    return (
      <motion.div className="flex flex-col justify-center items-center bg-white rounded-lg p-8">
        <div className="w-full">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
        <h1 className="text-md text-gray-800 text-center mb-12">{description}</h1>
        <div className="flex justify-center gap-2 mb-8">{inputs}</div>
        <div className="text-center mb-12">
          <button onClick={() => goToStep("success")} className="w-[400px] bg-[#225F6A] text-white px-8 py-3 rounded-lg hover:bg-[#174048]">Verify</button>
        </div>
      </motion.div>
    )
  }

  const renderSuccess = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-lg p-8 text-center">
      <BackButton />
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Passport Verification</h1>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Details Submitted Successfully</h2>
      <p className="text-[#225F6A]">(Your submitted informations are under review)</p>
      <button onClick={() => setCurrentStep("overview")} className="mt-6 bg-[#225F6A] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#174048] transition-colors">Back to Overview</button>
    </motion.div>
  )

  return (
    <AnimatePresence mode="wait">
      {currentStep === "overview" && renderOverview()}
      {currentStep === "identity-selection" && renderIdentitySelection()}
      {currentStep === "bvn-entry" && renderBvnEntry()}
      {currentStep === "entry" && renderEntry()}
      {currentStep === "success" && renderSuccess()}
    </AnimatePresence>
  )
}