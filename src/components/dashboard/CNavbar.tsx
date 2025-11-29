'use client'
import React from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import BookService from '../BookService'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const CNavbar = () => {
    const pathname = usePathname()
  return (
    pathname?.includes('chat') && 
    <div className='flex items-center justify-center w-full z-10'>
        <div className='flex items-center justify-between lg:gap-20 shadow-sm w-full py-2 px-2 xl:px-6 border-b-[0.15em] border-[rgba(0,0,0,0.11)] '>
            <div className='flex items-center w-full justify-start gap-2'>
                <figure className='w-[45px] h-[45px] rounded-full overflow-hidden border border-primary-1'>
                    <Image src='/assets/images/big-profile_pic.png' className='w-full h-full object-cover' alt='logo' width={128} height={128} />
                </figure>
                <div className='flex flex-1 flex-col'>
                    <p className='text-black-1 text-sm lg:text-base'>Kelvin Patrick</p>
                    <span className='text-[#4AB46E] text-xs lg:text-sm flex items-center gap-1'>
                        <div className='animate-ping duration-1500 ease-in-out w-[4px] h-[4px] rounded-full bg-[#4AB46E]'></div>
                        <span>Active</span>
                    </span>
                </div>
            </div>
            <div className='flex gap-2 justify-end'>
                <div className='flex items-center gap-0 lg:gap-3'>
                    <div className='flex items-center gap-2'>
                        <BookService variant="default" size={'rs'}  className='rounded-full font-normal px-2 lg:px-4' />
                        {/* <Button type='button' variant="outline" className='rounded-full'>Back</Button> */}
                    </div>
                    <div>       
                        <figure className='w-[28px] h-[28px] cursor-pointer'>
                            <HiOutlineDotsVertical className='w-full h-full tracking' />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CNavbar