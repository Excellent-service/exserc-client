"use client"
import { BellIcon, PlusIcon } from '@radix-ui/react-icons'
import { BiTransferAlt } from "react-icons/bi";
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import BuildingPlaceholder from '@/components/BuildingPlaceholder';

const page_ = () => {
    return (
        <div className='py-6 px-4 xl:p-10 max-w-[964px] flex flex-col gap-y-6'>
            <section className='py-6 px-4 sm:p-8 flex items-start justify-between bg-primary-1 rounded-xl relative overflow-hidden'>
                <div className='flex flex-col items-start justify-start'>
                    <div className='flex gap-x-4 items-center'>
                        <div className='w-10 sm:w-14 h-10 sm:h-14 bg-[#4AB46E] rounded-full flex items-center justify-center text-xl sm:text-3xl'>N</div>
                        <div className='flex flex-col'>
                            <h1 className='text-base sm:text-xl tracking-wider font-bold text-white'>My Wallet</h1>
                            <p className='text-xs sm:text-sm font-medium text-[#ffffffcd]'>John kennedy</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1 sm:gap-y-3 mt-8'>
                        <p className='text-sm font-medium text-[#ffffffcd]'>Total Balance</p>
                        <div className='flex items-start gap-x-3'>
                            <p className='text-xl font-bold text-[#ffffffa2]'>₦</p>
                            <h1 className='text-3xl sm:text-6xl font-bold text-white tracking-wider'>20,000</h1>
                        </div>
                    </div>
                    <div className='flex items-start gap-x-2 font-bold text-[#ffffffcd] mt-10 sm:mt-16 mb-4'>
                        <span className='text-sm tracking-widest'>****</span>
                        <span className='text-sm tracking-widest'>****</span>
                        <span className='text-sm tracking-widest'>****</span>
                        <span className='text-lg tracking-widest'>4934</span>
                    </div>
                </div>
                <div>
                    <BellIcon width={40} height={40} className='text-white bg-[#ffffff40] rounded-full p-2' />
                </div>
                <Image src='/assets/images/ellipse.svg' width={100} height={100} alt='ellipse' className='absolute bottom-[42px] right-[55px]' />
                <Image src='/assets/images/ellipse.svg' width={100} height={100} alt='ellipse' className='absolute bottom-[74px] -right-[40px]' />
                <Image src='/assets/images/ellipse.svg' width={100} height={100} alt='ellipse' className='absolute -bottom-6 -right-[20px]' />
                <Image src='/assets/images/ellipse.svg' width={100} height={100} alt='ellipse' className='absolute -bottom-14 right-[79px]' />
            </section>
            <section className='flex items-center justify-between gap-x-3'>
                <div className='w-full rounded-full font-medium bg-[#1D1D1BB2] flex items-center text-white text-base sm:text-lg tracking-wider cursor-pointer' >
                    <span className='flex items-center justify-center m-1 sm:m-2 h-9 w-9 sm:h-12 sm:w-12 bg-[#D9D9D94D] rounded-full'><BiTransferAlt className='w-6 h-6 m-1' /></span>
                    <span className='w-[70%] text-center'>Transfer</span>
                </div>
                <div className='w-full rounded-full font-medium bg-[#4AB46E] flex items-center text-white text-base sm:text-lg tracking-wider cursor-pointer' >
                    <span className='flex items-center justify-center m-1 sm:m-2 h-9 w-9 sm:h-12 sm:w-12 bg-[#D9D9D94D] rounded-full'><PlusIcon className='w-6 h-6 m-1' /></span>
                    <span className='w-[70%] text-center'>Add money</span>
                </div>
            </section>
            <section>
                <div className='flex items-center justify-between border-b border-[#0000000D] pb-2'>
                    <span className='text-lg sm:text-2xl font-medium text-black-2'>Transaction</span>
                    <span className='text-lg sm:text-2xl font-medium text-primary-1'>View All</span>
                </div>
                <div className='flex items-center justify-between border-b border-[#0000000D] pb-2'>
                    <div className='flex items-center gap-x-4 pt-2' >
                        <div className='w-14 h-14 overflow-hidden rounded-full'>
                            <Image src="/assets/images/profile_pic.png" className='object-cover w-full h-full' width={100} height={100} alt='profile pic' />
                        </div>
                        <div className='text-black-1 font-medium'>
                            <p className='font-semibold'>Service Payment</p>
                            <p className='text-xs'>Kelvin Patrick</p>
                        </div>
                    </div>
                    <div className='text-black-1 font-medium'>
                        <p className='font-semibold'>- 4000</p>
                        <p className='text-xs'>9th June</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

const Wallet = () => {
    const { user } = useAuth();
    const router = useRouter();

    return (<BuildingPlaceholder />)
}

export default Wallet