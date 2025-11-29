"use client"

import { Button } from '@/components/ui/button'
import { ChartLine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

const Jobs = () => {
    const { user } = useAuth();
    const id = 1

    return (
        <div className='px-3 md:px-6'>
                <section className='py-4'>
                    <div className='flex flex-col gap-3'>
                        <ChartLine className='flex items-center justify-between self-end' />
                        {/* <div className='flex items-center justify-between self-end'>
                    <Button onClick={() => router.back()} size="sm" type='button'>Back</Button>
                </div> */}
                    </div>
                </section>
                <section className='flex flex-col gap-4 md:gap-8 py-4'>
                    <div className='flex items-center gap-x-2 md:gap-x-4 justify-between p-2 md:p-6  border border-[#2F9C26B2] rounded-2xl'>
                        <div className='w-[90px]  md:w-[124px] md:h-[92px] object-cover'>
                            <Image src="/assets/images/profile_pic.png" className='w-full h-full block object-cover' width={124} height={92} alt='profile pic' />
                        </div>
                        <Link href={`/user/jobs/${id}`} className='flex flex-1 flex-col gap-x-1'>
                            <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-base md:text-2xl'>Kelvin Patrick</p></div>
                            <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-sm md:text-base'>Plumbing services</p></div>
                        </Link>
                        <div className='flex items-center gap-3'>
                            <Button size="rs" className='rounded-2xl border border-[#2F9C26B2] text-[#2F9C26B2]' variant="outline">Completed</Button>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 md:gap-x-4 justify-between p-2 md:p-6  border border-[#D15858B2] rounded-2xl'>
                        <div className='w-[90px]  md:w-[124px] md:h-[92px] object-cover'>
                            <Image src="/assets/images/profile_pic.png" className='w-full h-full block object-cover' width={124} height={92} alt='profile pic' />
                        </div>
                        <Link href={`/user/jobs/${id}`} className='flex flex-1 flex-col gap-x-1'>
                            <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-base md:text-2xl'>David Plinkton</p></div>
                            <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-sm md:text-base'>Barbing services</p></div>
                        </Link>
                        <div className='flex items-center gap-3'>
                            <Button size="rs" className='rounded-2xl border border-[#D15858B2] text-[#D15858B2]' variant="outline">Canceled</Button>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 md:gap-x-4 justify-between p-2 md:p-6  border border-[#D15858B2] rounded-2xl'>
                        <div className='w-[90px]  md:w-[124px] md:h-[92px] object-cover'>
                            <Image src="/assets/images/profile_pic.png" className='w-full h-full block object-cover' width={124} height={92} alt='profile pic' />
                        </div>
                        <Link href={`/user/jobs/${id}`} className='flex flex-1 flex-col gap-x-1'>
                            <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-base md:text-2xl'>David Plinkton</p></div>
                            <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-sm md:text-base'>Barbing services</p></div>
                        </Link>
                        <div className='flex items-center gap-3'>
                            <Button size="rs" className='rounded-2xl border border-[#D15858B2] text-[#D15858B2]' variant="outline">Canceled</Button>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 md:gap-x-4 justify-between p-2 md:p-6  border border-[#D15858B2] rounded-2xl'>
                        <div className='w-[90px]  md:w-[124px] md:h-[92px] object-cover'>
                            <Image src="/assets/images/profile_pic.png" className='w-full h-full block object-cover' width={124} height={92} alt='profile pic' />
                        </div>
                        <Link href={`/user/jobs/${id}`} className='flex flex-1 flex-col gap-x-1'>
                            <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-base md:text-2xl'>David Plinkton</p></div>
                            <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-sm md:text-base'>Barbing services</p></div>
                        </Link>
                        <div className='flex items-center gap-3'>
                            <Button size="rs" className='rounded-2xl border border-[#D15858B2] text-[#D15858B2]' variant="outline">Canceled</Button>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 md:gap-x-4 justify-between p-2 md:p-6  border border-[#D15858B2] rounded-2xl'>
                        <div className='w-[90px]  md:w-[124px] md:h-[92px] object-cover'>
                            <Image src="/assets/images/profile_pic.png" className='w-full h-full block object-cover' width={124} height={92} alt='profile pic' />
                        </div>
                        <Link href={`/user/jobs/${id}`} className='flex flex-1 flex-col gap-x-1'>
                            <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-base md:text-2xl'>David Plinkton</p></div>
                            <div className='flex flex-wrap items-center gap-x-2'><p className='font-medium text-black-1 text-sm md:text-base'>Barbing services</p></div>
                        </Link>
                        <div className='flex items-center gap-3'>
                            <Button size="rs" className='rounded-2xl border border-[#D15858B2] text-[#D15858B2]' variant="outline">Canceled</Button>
                        </div>
                    </div>
                </section>
            </div>
    )
}

export default Jobs