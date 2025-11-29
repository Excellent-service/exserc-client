"use client"
import BuildingPlaceholder from '@/components/BuildingPlaceholder'
import React, { useEffect } from 'react'
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

const Transaction = () => {
  return (
    <div>

    </div>
  )
}

const Notifications = () => {
  const { user } = useAuth();
  const router = useRouter();


  return (<BuildingPlaceholder />)
}

export default Notifications