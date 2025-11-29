"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn, Dashboardlinks } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Home,
  Search,
  User,
  Wallet,
  Briefcase,
  CreditCard,
  FileText,
  Bell,
  Settings,
  LogOut,
  Pin,
  PinOff,
  ChevronLeft,
  ChevronRight,
  Star,
  Phone,
} from "lucide-react"
import { Toast } from '../Toast'
import { useAuth } from '@/context/AuthContext'


const DSidebar = () => {
  const pathname = usePathname()

  return (
    <>
      <aside className="w-full">
        <div className="flex flex-col space-y-2 text-center sm:text-left pl-14 pt-10">
          <div>
            <figure className='w-[160px]'>
              <Image src='/assets/images/logo-1.png' className='block w-auto h-auto object-cover' alt='logo' priority width={160} height={50} />
            </figure>
          </div>
          <div className='items-start flex-col flex pt-10'>
            {
              Dashboardlinks.map(({ name, path, icon }) => (
                <Link key={name} href={path} className={cn('text-[#3C3742] px-3 py-4 w-full flex justify-start gap-x-2 text-[20px] font-normal', {
                  "font-medium bg-primary-2": path === pathname
                })} >
                  <div className='w-5 h-5 flex items-center justify-center pt-3'>
                    <Image alt={`${icon} icon`} className='object-cover w-auto h-auto' priority width={18} height={18} src={`/assets/images/icons/${icon}`} />
                  </div>
                  <span>{name}</span>
                </Link>
              ))
            }
          </div>
        </div>
      </aside>
    </>

  )
}

export function UseDSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logout, user, tempUser, authStep, firstLoad, code } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const [canShow, setCanShow] = useState(true);
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    Dashboardlinks.forEach(item => {
      if (pathname.includes("find-service-providers")) {
        setSidebarPinned(false)
      }
    })
  }, [])

  useEffect(() => {
    const showSideBar = user !== null ? true : false;
    setCanShow(showSideBar);
  }, [user])

  const handleSignOut = async () => {
    Toast.callBack.warning("Are you sure you want to log out?", {
      onConfirm: async () => {
        await logout();
      },
      onCancel: () => {
        Toast.info("Logout cancelled.");
      }
    });
  };


  return (
    <div className="min-h-screen bg-white relative">
      {/* Sidebar */}
      {canShow && <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${sidebarVisible || sidebarPinned ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{ width: "280px" }}
        onMouseEnter={() => !sidebarPinned && setSidebarVisible(true)}
        onMouseLeave={() => !sidebarPinned && setSidebarVisible(false)}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarPinned(!sidebarPinned)}
              className="text-gray-600 hover:text-gray-800"
            >
              {sidebarPinned ? <PinOff size={16} /> : <Pin size={16} />}
            </Button>
          </div>

          <nav className="space-y-2">
            {Dashboardlinks.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${item.path === pathname ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={() => { window.open(item.path, "_parent") }}
              >
                {/* <item.icon size={20} /> */}
                <div className='w-5 h-5 flex items-center justify-center pt-0'>
                  <Image alt={`${item.icon} icon`} className='object-cover w-auto h-auto' priority width={18} height={18} src={`/assets/images/icons/${item.icon}`} />
                </div>
                <span className="font-medium">{item.name}</span>
              </div>
            ))}

            <div className="pt-8 mt-8 border-t border-gray-200">
              <div onClick={handleSignOut} className="flex items-center gap-4 p-3 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-50">
                <LogOut size={20} />
                <span className="font-medium">Log out</span>
              </div>
            </div>
          </nav>
        </div>
      </div>}

      {/* Hover trigger area */}
      {!sidebarPinned && (
        <div className="fixed left-0 top-0 w-4 h-full z-40" onMouseEnter={() => setSidebarVisible(true)} />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarPinned && canShow ? "ml-[280px]" : "ml-0"}`}>
        {children}
      </div>
    </div>
  )
}

export default DSidebar