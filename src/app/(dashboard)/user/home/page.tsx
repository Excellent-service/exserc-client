"use client"

import { BellIcon, PlusIcon } from '@radix-ui/react-icons'
import { BiTransferAlt } from "react-icons/bi";
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import BuildingPlaceholder from '@/components/BuildingPlaceholder';
import { ProviderKYC } from '@/components/KYC/provider-kyc';
import { SeekerKYC } from '@/components/KYC/seeker-kyc';
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import ProtectedRoute from '@/components/ProtectedRoute';


const Home = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState("seeker"); //provider
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-50 p-8 pt-16">
      <AnimatePresence mode="wait">
        {userRole === "seeker" ? (
          <motion.div
            key="seeker"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='w-[100%] h-[100%]'
          >
            <SeekerKYC />
          </motion.div>
        ) : (
          <motion.div
            key="provider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='w-[100%] h-[100%]'
          >
            <ProviderKYC />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home