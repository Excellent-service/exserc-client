"use client"
import BuildingPlaceholder from '@/components/BuildingPlaceholder'
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import React, {useEffect} from 'react'

const Transaction_ = () => {
  return (
    <div>
        
    </div>
  )
}

const Transaction = () => {
  const { user } = useAuth();
  const router = useRouter();

    return(<BuildingPlaceholder />)
}

export default Transaction