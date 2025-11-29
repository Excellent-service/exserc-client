"use client"

import CreateProviderProfile from '@/components/CreateProviderProfile'
import CreateSeekerProfile from '@/components/CreateSeekerProfile'
import ProtectedRoute from '@/components/ProtectedRoute';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'

const CreateProfile_ = () => {

  // It uses the Otp schema for validation and the verifyOtp action for OTP verification
  const searchParams = useSearchParams();
  // Extract end of path to get the option parameter
  const role = searchParams.get("role")

  if (role === 'seeker') {
    return (
      <CreateSeekerProfile />
    )
  } else if (role === 'provider') {
    return (
      <CreateProviderProfile />
    )
  }

}



function CreateProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedRoute>
        <CreateProfile_ />
      </ProtectedRoute>
    </Suspense>
  );
}


export default CreateProfile