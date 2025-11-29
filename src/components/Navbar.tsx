"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { cn, links } from '@/lib/utils'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { SheetTrigger } from './ui/sheet'



const Navbar = () => {
    const pathname = usePathname()
    return (
        <div className='flex items-center justify-center w-full pt-2 lg:pt-5 z-10'>
            <div className='flex items-center justify-between gap-4 lg:gap-20 w-full py-2 px-4 xl:px-6 border-b-[0.15em] border-t-[0.15em] border-[rgba(0,0,0,0.26)] '>

                <div className='flex gap-2 w-full lg:gap-8 items-center'>
                    <div>
                        <figure className='min-w-[100px]'>
                            <Image src='/assets/images/logo-1.png' className='block w-full h-full object-cover' alt='logo' width={160} height={50} />
                        </figure>
                    </div>
                    <div className='items-center gap-12 hidden lg:flex mt-2'>
                        {
                            links.map(({ name, path }) => (
                                <Link key={name} href={path} className={cn('text-[#3C3742] text-[17px] font-medium', {
                                    "text-primary-1": path === pathname
                                })} >{name}</Link>
                            ))
                        }
                    </div>
                </div>
                <div className='flex gap-2 justify-end lg:gap-32'>

                    <div className='flex items-center gap-6'>
                        <Button className='px-5' variant="default" size="sm" ><Link href={'/login'}>Sign In/Sign Up</Link></Button>
                        <figure className='w-[30px] h-[30px] lg:hidden cursor-pointer'>
                            <SheetTrigger className='w-full h-full tracking'><HamburgerMenuIcon className='w-full h-full tracking' /></SheetTrigger>
                        </figure>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar