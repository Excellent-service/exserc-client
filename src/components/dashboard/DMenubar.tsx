"use client"

import React from 'react'
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import { cn, Dashboardlinks } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Close } from '@radix-ui/react-dialog'
  

const DMenubar = () => {
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
            </SheetHeader>
            <div className='items-start gap-7 flex-col flex pt-10'>
                    {
                        Dashboardlinks.map(({name, path, icon}) => (
                            <Link key={name} href={path} >
                                <Close>
                                    <div className={cn('text-[#3C3742] flex justify-center gap-x-2 text-[20px] font-normal', {
                                "font-medium": path === pathname
                                })}>
                                        <div className='w-5 h-5 flex items-center justify-center pt-3'>
                                            <Image alt={`${icon} icon`} className='object-cover' width={18} height={18} src={`/assets/images/icons/${icon}`} />
                                        </div>
                                        <span>{name}</span>
                                    </div>
                                </Close>
                            </Link>
                        ))
                    }
                </div>
        </SheetContent>
    </>

  )
}

export default DMenubar