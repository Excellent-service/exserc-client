"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Webcam from "react-webcam"
import { Laptop } from "lucide-react"

type ProviderStep = "document-upload" | "selfie-capture" | "review-details"

export function ProviderKYC() {
  const [currentStep, setCurrentStep] = useState<ProviderStep>("document-upload")
  const [selectedState, setSelectedState] = useState("")
  const [selectedDocType, setSelectedDocType] = useState("")
  const [frontDoc, setFrontDoc] = useState<File | null>(null)
  const [selfie, setSelfie] = useState<string | null>(null)
  const [backDoc, setBackDoc] = useState<File | null>(null)
  const webcamRef = useRef<Webcam>(null)

  const renderStepIndicator = () => {
    const steps: { id: ProviderStep; label: string }[] = [
      { id: "document-upload", label: "Step 1" },
      { id: "selfie-capture", label: "Step 2" },
      { id: "review-details", label: "Step 3" },
    ];

    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center relative">
          {steps.map((step, index) => (
            <div key={step.id} className="flex relative items-center">
              {/* Step wrapper */}
              <div className="flex flex-col items-center" onClick={() => { setCurrentStep(step.id) }}>
                <span
                  className={`mb-2 text-sm absolute w-16 text-center bottom-5 ${currentStep === step.id
                    ? "text-[#225F6A] font-medium"
                    : "text-gray-400"
                    }`}
                >
                  {step.label}
                </span>
                {/* Circle */}
                <div
                  className={`w-5 h-5 rounded-full ${currentStep === step.id ? "bg-[#225F6A]" : "bg-gray-300"
                    }`}
                />
              </div>

              {/* Connector (only between steps) */}
              {index !== steps.length - 1 && (
                <div className="w-40 h-1 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDocumentUpload = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col justify-center items-center bg-white rounded-lg p-8 gap-5"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-8">KYC Verification</h1>

      {renderStepIndicator()}

      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload a proof of Identity</h2>
        <p className="text-gray-600">
          Exserc requires a valid government issue ID (driver&apos;s license, passport, national ID)
        </p>
      </div>

      <div className="w-[90%] grid grid-cols-2 gap-36 mb-8 mx-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your state</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select your state</option>
            <option value="delta">Delta</option>
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Document type</label>
          <select
            value={selectedDocType}
            onChange={(e) => setSelectedDocType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select document type</option>
            <option value="nin">NIN Slip</option>
            <option value="passport">International Passport</option>
            <option value="license">Driver&apos;s License</option>
          </select>
        </div>
      </div>

      <div className="w-[90%] grid grid-cols-2 gap-24 mb-8 mx-10">
        {/* FRONT SIDE */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const file = e.dataTransfer.files?.[0]
            if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
              setFrontDoc(file)
            } else {
              alert("Only JPG, PNG, or PDF files are allowed.")
            }
          }}
          className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center"
        >
          <div className="mb-4">
            {frontDoc ? (
              frontDoc.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(frontDoc)}
                  alt="Front document preview"
                  className="mx-auto h-32 object-contain rounded-lg shadow"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <embed
                    src={URL.createObjectURL(frontDoc)}
                    type="application/pdf"
                    className="border rounded-lg shadow max-h-64 w-full"
                  />
                  <p className="text-sm mt-2 text-gray-600">{frontDoc.name}</p>
                </div>
              )
            ) : (
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            )}
          </div>

          <h3 className="font-medium text-gray-800 mb-2">Front side of your document</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload the front side of your document
            <br />
            Supports: JPG, PNG, PDF
          </p>

          <button
            type="button"
            onClick={() => document.getElementById("frontDocInput")?.click()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Choose a file
          </button>

          <input
            type="file"
            id="frontDocInput"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null
              if (!file || file.type.startsWith("image/") || file.type === "application/pdf") {
                setFrontDoc(file)
              } else {
                alert("Only JPG, PNG, or PDF files are allowed.")
              }
            }}
          />
        </div>

        {/* BACK SIDE */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const file = e.dataTransfer.files?.[0]
            if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
              setBackDoc(file)
            } else {
              alert("Only JPG, PNG, or PDF files are allowed.")
            }
          }}
          className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center"
        >
          <div className="mb-4">
            {backDoc ? (
              backDoc.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(backDoc)}
                  alt="Back document preview"
                  className="mx-auto h-32 object-contain rounded-lg shadow"
                />
              ) : (

                <div className="flex flex-col items-center">
                  <embed
                    src={URL.createObjectURL(backDoc)}
                    type="application/pdf"
                    className="border rounded-lg shadow max-h-64 w-full"
                  />
                  <p className="text-sm mt-2 text-gray-600">{backDoc.name}</p>
                </div>
              )
            ) : (
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            )}
          </div>

          <h3 className="font-medium text-gray-800 mb-2">Back side of your document</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload the back side of your document
            <br />
            Supports: JPG, PNG, PDF
          </p>

          <button
            type="button"
            onClick={() => document.getElementById("backDocInput")?.click()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Choose a file
          </button>

          <input
            type="file"
            id="backDocInput"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0] || null
              if (!file || file.type.startsWith("image/") || file.type === "application/pdf") {
                setBackDoc(file)
              } else {
                alert("Only JPG, PNG, or PDF files are allowed.")
              }
            }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 mb-8 mx-10">
        <label className="flex items-start gap-3">
          <span className="text-sm text-gray-600 px-20 text-center">
            I confirm that I uploaded valid government-issued photo ID. This include my picture, signature, name, date
            of birth and address
          </span>
        </label>
        <button
          onClick={() => setCurrentStep("selfie-capture")}
          className="w-96 bg-[#225F6A] text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Continue
        </button>
      </div>

    </motion.div >
  )

  const renderSelfieCapture = () => {

    const capture = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot()
        setSelfie(imageSrc) // save base64 image
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-lg p-8 w-[100%] h-[100%]"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-8">KYC Verification</h1>

        {renderStepIndicator()}

        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Verify your Identity</h2>
          <p className="text-gray-600">Let&apos;s take a selfie</p>
        </div>

        <div className="relative bg-[#225F6A] rounded-lg p-10 mb-8 mx-20 flex items-center justify-center">
          <Image src='/assets/images/selfie-gesture.png' className='absolute block w-96 h-96 object-cover' alt='logo' width={400} height={400} />
          <div className="relative z-10">
            {selfie ? (
              <img
                src={selfie}
                alt="Captured selfie"
                className="w-96 h-96 object-cover rounded-lg shadow"
              />
            ) : (
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="rounded-lg shadow w-96 h-96 object-cover"
                videoConstraints={{
                  width: 740,
                  height: 580,
                  facingMode: "user", // front camera
                }}
              />
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          {selfie ? (
            <div className="flex flex-col justify-center items-center gap-4">
              <button
                onClick={() => setCurrentStep("review-details")}
                className="w-[500px] bg-teal-700 text-white px-12 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                ✅ Use this Selfie
              </button>
              <button
                onClick={() => setSelfie(null)}
                className="w-[500px] bg-gray-200 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Retake
              </button>
            </div>
          ) : (
            <button
              onClick={capture}
              className="bg-[#225F6A] text-white px-12 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
            >
              <Laptop />
              Take a selfie with your Webcam
            </button>
          )}



          <p className="text-sm text-gray-500 mt-4">
            Ensure your face is clearly visible
            <br />
            before capturing.
          </p>
        </div>
      </motion.div>
    )
  }

  const renderSelfieCapture_ = () => {

    const capture = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot()
        setSelfie(imageSrc) // save base64 image
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-lg p-8 w-[100%] h-[100%]"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-8">KYC Verification</h1>

        {/* Step Indicator */}
        {renderStepIndicator()}

        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Verify your Identity</h2>
          <p className="text-gray-600">Let&apos;s take a selfie</p>
        </div>

        <div className="bg-[#225F6A] rounded-lg p-6 mb-8 mx-20 flex items-center justify-center">
          {selfie ? (
            <img
              src={selfie}
              alt="Captured selfie"
              className="w-64 h-64 object-cover rounded-lg shadow"
            />
          ) : (
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="rounded-lg shadow w-64 h-64 object-cover"
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: "user", // front camera
              }}
            />
          )}
        </div>

        <div className="text-center mb-8 flex flex-col gap-4">
          {selfie ? (
            <>
              <button
                onClick={() => setCurrentStep("review-details")}
                className="bg-green-600 text-white px-12 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                ✅ Use this Selfie
              </button>
              <button
                onClick={() => setSelfie(null)}
                className="bg-gray-200 text-gray-700 px-8 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Retake
              </button>
            </>
          ) : (
            <button
              onClick={capture}
              className="bg-[#225F6A] text-white px-12 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
            >
              <Laptop />
              Take a Selfie with your Webcam
            </button>
          )}

          <p className="text-sm text-gray-500 mt-4">
            Ensure your face is clearly visible before capturing.
          </p>
        </div>
      </motion.div>
    )
  }

  const renderReviewDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col justify-center items-center bg-white rounded-lg p-8"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-8">KYC Verification</h1>

      {renderStepIndicator()}

      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Review your details</h2>
      </div>

      <div className="flex justify-between items-center w-[80%] mb-8 mx-20">
        <span className="text-gray-600">State: Delta</span>
        <span className="text-gray-600">Document type: NIN Slip</span>
      </div>

      <div className="flex justify-between items-center mx-20 gap-8 mb-8 w-[85%]">
        <div className="text-center ">
          <div className="relative w-64 h-64 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-3xl p-4 mb-2">
            {frontDoc ? (
              frontDoc.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(frontDoc)}
                  alt="Front document preview"
                  className="mx-auto w-52 h-52 object-cover rounded-lg shadow"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <embed
                    src={URL.createObjectURL(frontDoc)}
                    type="application/pdf"
                    className="border rounded-lg shadow w-52 h-52"
                  />
                </div>
              )
            ) : (
              <div className="absolute w-52 h-52 mx-auto bg-gray-200/0 rounded-3xl flex items-center justify-center">
                <svg className="w-52 h-52 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          <span className="text-sm font-medium text-gray-700">Front</span>
        </div>

        <div className="text-center">
          <div className="relative w-64 h-64 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-3xl p-4 mb-2">
            {backDoc ? (
              backDoc.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(backDoc)}
                  alt="Front document preview"
                  className="mx-auto w-52 h-52 object-cover rounded-lg shadow"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <embed
                    src={URL.createObjectURL(backDoc)}
                    type="application/pdf"
                    className="border rounded-lg shadow w-52 h-52"
                  />
                </div>
              )
            ) : (
              <div className="absolute w-52 h-52 mx-auto bg-gray-200/0 rounded-3xl flex items-center justify-center">
                <svg className="w-52 h-52 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
          <span className="text-sm font-medium text-gray-700">Back</span>
        </div>
      </div>


      <div className="text-center">
        <div className="relative w-64 h-64 border-2 border-dashed border-gray-300 rounded-3xl p-4 mb-2 justify-center items-center flex">
          {selfie ? (
            <img
              src={selfie}
              alt="Captured selfie"
              className="absolute w-52 h-52 object-cover rounded-lg shadow"
            />
          ) : (
            <div className="absolute w-52 h-52 mx-auto bg-gray-200/0 rounded-3xl flex items-center justify-center">
              <svg className="w-52 h-52 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        <span className="text-sm font-medium text-gray-700">Selfie</span>
      </div>

      <div className="flex flex-col justify-center items-center gap-0 mt-8 space-y-4">
        <button
          onClick={() => setCurrentStep("document-upload")}
          className="w-[400px] bg-[#225F6A] text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Submit
        </button>
        <button
          onClick={() => setCurrentStep("selfie-capture")}
          className="w-[400px] border border-gray-300 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Go back
        </button>
      </div>
    </motion.div>
  )

  return (
    <div>
      <AnimatePresence mode="wait">
        {currentStep === "document-upload" && renderDocumentUpload()}
        {currentStep === "selfie-capture" && renderSelfieCapture()}
        {currentStep === "review-details" && renderReviewDetails()}
      </AnimatePresence>
    </div>
  )
}
