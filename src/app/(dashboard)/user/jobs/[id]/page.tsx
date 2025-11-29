"use client"

import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

const JobDetails = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className='px-3 md:px-20 py-10 md:py-28 max-w-[1000px] m-auto'>
      <section className='flex items-center gap-4 md:gap-14'>
        <div className='w-[268px] h-[256px] rounded-3xl object-cover overflow-hidden'>
          <Image src="/assets/images/big-profile_pic.png" className='w-full h-full block object-cover' width={266} height={258} alt='profile pic' />
        </div>
        <div className='w-[100px] md:w-[236px] min-h-[168px]'>
          <Image src="/assets/images/icons/complete.png" className='w-full h-full block object-cover' width={236} height={168} alt='complete' />
        </div>
      </section>
      <section className='flex flex-col gap-y-7'>
        <div className='flex flex-col lg:flex-row gap-x-20 gap-y-1 py-7'>
          <div className='flex flex-col gap-y-2 flex-1'>
            <div className='text-lg flex items-end gap-1 font-semibold text-[#1A1D23]'><h3>Customer&apos;s name:</h3> <span className='font-normal text-black-1 text-base'>Kelvin Patrick</span></div>
            <div className='text-lg flex items-start gap-1 font-semibold text-[#1A1D23]'><h3>Address:</h3> <span className='font-normal text-black-1 text-base'>No 34, Alausa Street, Ekuigbo</span></div>
            <div className='text-lg flex items-end gap-1 font-semibold text-[#1A1D23]'><h3>Job Category:</h3> <span className='font-normal text-black-1 text-base'>Plumbing Services</span></div>
            <div className='text-lg flex items-end gap-1 font-semibold text-[#1A1D23]'><h3>Job Duration:</h3> <span className='font-normal text-black-1 text-base'>3 hours</span></div>
          </div>
          <div className='flex flex-col gap-y-2 flex-1'>
            <div className='text-lg flex items-end gap-1 font-semibold text-[#1A1D23]'><h3>Amount Paid:</h3> <span className='font-normal text-black-1 text-base'>N6,000</span></div>
            <div className='text-lg flex items-start gap-1 font-semibold text-[#1A1D23]'>
              <h3>Review:</h3>
              <span className='font-normal text-black-1 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla culpa laborum velit iste alias cumque quo assumenda, nihil ipsum optio?</span>
            </div>
            <div className='text-lg flex items-center gap-1 font-semibold text-[#1A1D23]'>
              <h3>Rating:</h3>
              <div className='flex items-end gap-1 pt-1'>
                <StarFilledIcon width={15} height={15} className='text-primary-1' />
                <StarFilledIcon width={15} height={15} className='text-primary-1' />
                <StarFilledIcon width={15} height={15} className='text-primary-1' />
                <StarFilledIcon width={15} height={15} className='text-primary-1' />
                <StarIcon width={15} height={15} />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <Button onClick={() => router.back()} size="rs" className='flex items-center gap-1'> <ArrowLeftIcon className='w-4 h-5 md:w-6 font-extrabold' /> Back</Button>
        </div>
      </section>
    </div>
  )
}

export default JobDetails