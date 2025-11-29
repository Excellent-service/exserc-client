"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion"

const SignUp_old = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center px-7'>
      <div className='flex flex-col gap-y-16 items-center justify-center w-full'>
        <h1 className='text-black-1 text-2xl font-normal'>Register as</h1>
        <div className='flex items-center justify-between md:justify-center md:gap-x-16 w-full'>
          <div className='flex items-center justify-center flex-col'>
            <figure className='w-[100px] h-[90px] lg:w-[129px] lg:h-[119px]'>
              <Image src={'/assets/images/seeker.png'} alt='seeker' width={129} height={129}  className='w-full h-full object-contain block' />
            </figure>
            <Button variant="default" className='rounded-2xl rounded-ee-none rounded-es-none' size="sm" >
              <Link href="signup/seeker">
                Service Seeker
              </Link>
            </Button>
          </div>
          <div className='flex items-center justify-center flex-col'>
            <figure className='w-[100px] h-[90px] lg:w-[129px] lg:h-[119px]'>
              <Image src={'/assets/images/provider.png'} alt='provider' width={129} height={129}  className='w-full h-full object-contain block' />
            </figure>
            <Button variant="default" className='rounded-2xl rounded-ee-none rounded-es-none' size="sm" >
              <Link href="signup/provider">
                Service Provider
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SignUp() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register as</h1>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="signup/seeker" className="block">
              <div className="bg-gray-50 rounded-2xl p-8 pb-0 text-center hover:bg-gray-100 transition-colors">
                <div className="mb-0">
                  <img
                    src="/assets/images/seeker.png"
                    alt="Service seeker"
                    className="w-[100px] h-[90px] lg:w-[129px] lg:h-[119px] mx-auto object-contain"
                  />
                </div>
                <div className="bg-teal-600 text-white px-6 py-3 rounded-2xl rounded-ee-none rounded-es-none font-semibold">Service seeker</div>
              </div>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="signup/provider" className="block">
              <div className="bg-gray-50 rounded-2xl p-8 pb-0 text-center hover:bg-gray-100 transition-colors">
                <div className="mb-0">
                  <img
                    src="/assets/images/provider.png"
                    alt="Service Provider"
                    className="w-[100px] h-[90px] lg:w-[129px] lg:h-[119px] mx-auto object-contain"
                  />
                </div>
                <div className="bg-teal-600 text-white px-6 py-3 rounded-2xl rounded-ee-none rounded-es-none font-semibold">Service Provider</div>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUp