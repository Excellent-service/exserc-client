"use client"

import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { SheetTrigger } from '../ui/sheet'
import { BsBellFill } from 'react-icons/bs'
import { Input } from '../ui/input'



const DNavbar = () => {
    const pathname = usePathname()
    
  return (
    !pathname?.includes('chat') && 
    <div className='flex items-center justify-center w-full z-10'>
        <div className='flex items-center justify-between gap-4 lg:gap-20 shadow-sm w-full py-4 px-4 xl:px-6 border-b-[0.15em] border-[rgba(0,0,0,0.11)] '>
            <div className={cn('flex items-center gap-6 lg:hidden', {'lg:flex': pathname.includes('find-service-providers')})}> 
                <figure className='min-w-[100px]'>
                    <Image src='/assets/images/logo-1.png' className='block w-auto h-auto object-cover' alt='logo' width={130} height={30} />
                </figure>
            </div>
            <div className='flex gap-2 w-full justify-end lg:gap-32'>
                <div className='items-center gap-12 hidden lg:flex w-full flex-1 xl:justify-center'>
                    {/* {
                        links.map(({name, path}) => (
                            <Link key={name} href={path} className={cn('text-[#3C3742] text-[17px] font-medium', {
                                "text-[#9A65CF]": path === pathname
                            })} >{name}</Link>
                        ))
                    } */}
                    <Input name='search' placeholder='search feature, settings and more' className='px-10 max-w-[500px]' />
                </div>
                <div className='flex items-center gap-6'>
                    <div>
                        <BsBellFill className='w-[22px] h-[22px] text-black-1' />
                    </div>
                    <div>
                        <figure className='w-[28px] h-[28px] rounded-full overflow-hidden border border-primary-1'>
                            <Image src='/assets/images/big-profile_pic.png' className='w-full h-full object-cover' alt='logo' width={128} height={128} />
                        </figure>
                    </div>
                    <div>       
                        <figure className='w-[28px] h-[28px] cursor-pointer lg:hidden'>
                            <SheetTrigger className='w-full h-full tracking'><HamburgerMenuIcon className='w-full h-full tracking' /></SheetTrigger>
                        </figure>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default DNavbar