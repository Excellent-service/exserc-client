"use client"

import React from 'react'
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import { cn, links } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
  

const Menubar = () => {
    const pathname = usePathname()
  return (
    <>
        <SheetContent side={'left'} className="w-full sm:w-[540px]">
            <SheetHeader>
            <SheetTitle>
                <figure className='w-[160px]'>
                    <Image src='/assets/images/logo-1.png' className='block w-full h-full object-cover' alt='logo' width={160} height={50} />
                </figure>
            </SheetTitle>
            <div className='items-center gap-6 flex-col flex pt-10'>
                    {
                        links.map(({name, path}) => (
                            <Link key={name} href={path} className={cn('text-[#3C3742] text-[20px] font-medium', {
                                "text-[#9A65CF]": path === pathname
                            })} >{name}</Link>
                        ))
                    }
                </div>
            </SheetHeader>
        </SheetContent>
    </>

  )
}

export default Menubar