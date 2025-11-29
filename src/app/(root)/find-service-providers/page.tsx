"use client"

import DropdownSelect from '@/components/DropdownSelect'
import { Button } from '@/components/ui/button'
import { ChatBubbleIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React, { ChangeEvent, useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from "@/components/ui/card"
import { FaMapLocationDot } from 'react-icons/fa6'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MdLocationPin } from 'react-icons/md'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn, Dashboardlinks, links } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { ChevronLeft, ChevronRight, Handshake, MessageCircle, MessageSquareDiff, Search, Star } from 'lucide-react'






const Seeker = () => {

    const [searchText, setSearchText] = useState<string>("")
    const [selected, setSelected] = useState<string>("")
    const [currentLocation, setCurrentLocation] = useState<string>("Uvwie, Warri")

    const router = useRouter()
    const pathname = usePathname()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }



    const handleSelectCurrentLocation = () => {
        setCurrentLocation("Effurun, PTI road Masojie")
    }

    const handleSubmit = () => {

        router.push("/service-categories/" + selected.toLowerCase().replace(" ", "-"))
    }

    return (
        <div>
            {/* Hero Section */}
            <section className='seeker-bg-image h-[calc(100vh-200px)] md:h-[calc(100vh-85px)] w-full no-scrollbar'>
                <div className='flex flex-col gap-y-6 items-center  self-start justify-center z-10 absolute top-0 left-0 h-full w-full'>
                    <div className='flex items-center justify-between pr-3 gap-2 w-full h-7 absolute top-0 left-0 '>
                        {/* <Image alt={`location icon`} width={11} height={15} src={`/assets/images/icon ]s/location.png`} />
                    <p className='capitalize text-white'>Current location:</p> */}
                        <Dialog>
                            <DialogTrigger className="self-start">
                                <div className='flex items-center gap-2 px-4 py-2 hover:shadow-md transition-all cursor-pointer'>
                                    <div className='flex items-center gap-2 p-1 px-2 rounded-sm bg-white'>
                                        <FaMapLocationDot className="w-4 h-4 text-primary-1" />
                                        <p className='text-sm text-primary-1'>Edit</p>
                                    </div>
                                    <p className='text-white'>|</p>
                                    <p className='text-sm text-start text-white max-w-48 truncate'>{currentLocation}</p>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <div className='sm:max-w-md'>
                                    <DialogHeader>
                                        <DialogTitle>
                                            <div className='flex items-end gap-2'>
                                                <MdLocationPin className="w-8 h-8 text-primary-1" />
                                                <p className='text-xl text-primary-1 font-semibold'>Service Location</p>
                                            </div>
                                            <p className='text-black-1 text-base text-start mt-2'>Enter location of desired services</p>
                                        </DialogTitle>
                                        <DialogDescription>
                                            <div className='relative'>
                                                <Input value={searchText} onChange={handleChange} type='text' name='address' placeholder='Enter address' />
                                                {
                                                    searchText.length > 1 &&
                                                    <div className='absolute top-[120%] rounded p-2 bg-white w-full left-0 border border-black-2'>
                                                        <h1 className='mb-2'>PLACES</h1>
                                                        <ul className='text-lg font-light text-black-1'>
                                                            {
                                                                ["warri, dsc round-about", "warri, Ebrumede secondary school", "warri, Ugbomro, girls hostel. Delta state", "warri, Ugbomro, federal university petroleum university"].map((address) => (
                                                                    <li key={address} onClick={() => setCurrentLocation(address)}>
                                                                        <DialogTrigger className='flex items-center gap-2'>
                                                                            <MdLocationPin className="w-3 h-3 text-primary-1" />
                                                                            <p className='text-[14px] text-black-2 hover:text-black-1 transition-all cursor-pointer'>{address}</p>
                                                                        </DialogTrigger>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                            <DialogTrigger onClick={handleSelectCurrentLocation} className='bg-[#ffffffc0] mt-6 px-4 py-1 rounded-md flex flex-col self-start hover:bg-white shadow-sm hover:shadow-md transition-all cursor-pointer w-full'>
                                                <div className='flex items-center gap-2 justify-center md:justify-start w-full'>
                                                    <FaMapLocationDot className="w-4 h-4 text-primary-1" />
                                                    <p className='text-sm text-primary-1'>Current Location</p>
                                                </div>
                                                <p className='text-xs text-center md:text-start text-black-1 font-light w-full'>Tap to select your current location</p>
                                            </DialogTrigger>
                                        </DialogDescription>
                                    </DialogHeader>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <div className='self-start py-1 gap-1 xl:gap-4 hidden lg:flex'>
                            {
                                links.map(({ name, path }) => (
                                    <Link key={name} href={path} className={cn('text-white px-2 rounded-sm hover:text-primary-1 text-sm xl:text-base font-medium', {
                                        "text-white": path === pathname
                                    })} >{name}</Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className=' w-full max-w-[980px] flex flex-col gap-y-8 md:gap-y-20 mt-[20%]'>
                        <div>
                            <h1 className='text-sm md:text-2xl xl:text-4xl text-center font-bold text-white'>LOOKING FOR SERVICE PROVIDERS <br /> NEAR YOU?</h1>
                        </div>
                        <div className='flex flex-col gap-y-24 lg:gap-y-9'>
                            <div className='flex items-center justify-center gap-2'>
                                <div className='w-12 h-5 sm:w-16 sm:h-6 lg:w-24 lg:h-10 bg-white rounded'></div>
                                <div className='w-12 h-5 sm:w-16 sm:h-6 lg:w-24 lg:h-10 bg-primary-1 rounded relative after:content-[""] after:w-3 after:h-3 lg:after:w-6 lg:after:h-6 after:bg-primary-1 after:absolute after:-bottom-[4px] lg:after:-bottom-[5px] after:left-[40%] after:rotate-45'></div>
                                <div className='w-12 h-5 sm:w-16 sm:h-6 lg:w-24 lg:h-10 bg-white rounded'></div>
                                <div className='w-12 h-5 sm:w-16 sm:h-6 lg:w-24 lg:h-10 bg-white rounded'></div>
                            </div>
                            <div>
                                <div className='flex flex-col items-center gap-y-4 bg-[#ffffff] p-4 lg:px-20 lg:py-6 rounded'>
                                    {/* <h1 className='text-xl font-bold text-white'>Select service</h1> */}
                                    <div className='w-full flex flex-col lg:flex-row items-center gap-2'>
                                        <DropdownSelect selected={selected} setSelected={setSelected} />
                                        <Button onClick={handleSubmit} size="lg" type='submit'>Search</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className='px-3 sm:px-4 lg:px-12'>
                {/* Most Popular Services */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="aspect-video flex flex-col items-center justify-between">
                                <div>
                                    <h2 className="text-3xl text-gray-900 mb-2">Most Popular Services</h2>
                                    <p className="text-gray-600">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua.
                                    </p>
                                    <div className="flex gap-2 mt-2">
                                        <Button className="rounded-full bg-[#B5CACD] h-20 w-20">
                                            <ChevronLeft size={32} />
                                        </Button>
                                        <Button className="rounded-full bg-[#B5CACD] h-20 w-20">
                                            <ChevronRight size={32} />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="overflow-hidden">
                                    <div
                                        className="aspect-video bg-cover bg-center h-[300px]"
                                        style={{
                                            backgroundImage: `url(/placeholder.svg?height=200&width=300&query=service provider ${i})`,
                                        }}
                                    ></div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Categories */}
                <section className='py-10 sm:py-16 lg:py-32 lg:pb-0 flex flex-col gap-y-10 md:gap-y-20'>
                    <h1 className='text-center text-3xl lg:text-5xl text-black-1'>Featured Categories</h1>
                    <div className='grid grid-cols-3 sm:grid-cols-4 grid-rows-3 sm:grid-rows-2 max-h-[400px] sm:max-h-[620px] gap-2 xl:gap-6'>
                        <div className='row-span-1 col-span-2 sm:col-span-1 bg-black-2 relative'>
                            <Image src='/assets/images/catering.png' className='block w-full h-full object-cover' alt='logo' width={350} height={350} />
                            <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                                <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>FOOD & CATERING</p>
                            </div>
                        </div>
                        <div className='row-span-1 col-span-1 bg-black-2 relative'>
                            <Image src='/assets/images/lifestyle.png' className='block w-full h-full object-cover' alt='logo' width={350} height={350} />
                            <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                                <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>LIFESTYLE</p>
                            </div>
                        </div>
                        <div className='row-span-1 col-span-1 sm:col-span-2 bg-black-2 relative'>
                            <Image src='/assets/images/health.png' className='block w-full h-full object-cover' alt='logo' width={650} height={350} />
                            <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                                <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>HEALTH</p>
                            </div>
                        </div>
                        <div className='row-span-1 col-span-2 bg-black-2 relative'>
                            <Image src='/assets/images/engineering.png' className='block w-full h-full object-cover' alt='logo' width={650} height={350} />
                            <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                                <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>ENGINEERING</p>
                            </div>
                        </div>
                        <div className='row-span-1 col-span-2 sm:col-span-1 bg-black-2 relative'>
                            <Image src='/assets/images/entertainment.png' className='block w-full h-full object-cover' alt='logo' width={350} height={350} />
                            <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                                <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>ENTERTAINMENT</p>
                            </div>
                        </div>
                        <div className='row-span-1 col-span-1 bg-black-2 relative'>
                            <Image src='/assets/images/fashion.png' className='block w-full h-full object-cover' alt='logo' width={350} height={350} />
                            <div className='bg-[#00000068] absolute top-0 left-0 w-full h-full flex items-end justify-center pb-10'>
                                <p className='text-sm lg:text-xl text-center text-wrap xl:text-3xl text-white font-bold'>FASHION</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Popular Service Providers */}
                <section className='py-10 sm:py-16 xl:pb-20 flex flex-col gap-y-10 md:gap-y-20'>
                    <h1 className='text-center text-3xl lg:text-5xl text-black-1'>Popular Service Providers Near You</h1>
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-3 lg:gap-6'>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                                <div className='shadow-md rounded pb-3 hover:bg-slate-50 hover:scale-95 cursor-pointer duration-500' key={item}>
                                    <div className='overflow-hidden w-full'>
                                        <Image src='/assets/images/mama-ada.png' className='block w-full h-full object-cover' alt='logo' width={350} height={350} />
                                    </div>
                                    <div className='flex flex-col gap-2 items-start justify-start p-3'>
                                        <h1 className='capitalize text-black-1 font-medium text-sm sm:text-base lg:text-xl truncate max-w-full'>Mama ada tailoring shop</h1>
                                        <div className='flex items-start gap-1'>
                                            <p className='text-xs lg:text-base font-normal text-primary-1'>Available: </p>
                                            <p className='text-xs lg:text-base font-normal text-black-2'>Monday to Saturdays 9am to 6pm</p>
                                        </div>
                                        <div className='flex items-start gap-1'>
                                            <p className='text-xs lg:text-base font-normal text-primary-1'>Payment: </p>
                                            <p className='text-xs lg:text-base font-normal text-black-2'>Base on service rendered</p>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <StarFilledIcon width={15} height={15} className='text-primary-1' />
                                            <StarFilledIcon width={15} height={15} className='text-primary-1' />
                                            <StarFilledIcon width={15} height={15} className='text-primary-1' />
                                            <StarFilledIcon width={15} height={15} className='text-primary-1' />
                                            <StarIcon width={15} height={15} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section>

                {/* 4 Easy Ways */}
                <section className="relative py-16 mb-[200px] w-[100%] bg-gradient-to-r from-purple-950 to-pink-950 text-white h-[280px] overflow-visible">
                    <Image src='/assets/images/Desktop 29.png' className='absolute top-0 block w-full h-full object-cover' alt='logo' width={350} height={350} />
                    <div className='absolute top-0 block w-full h-full object-cover bg-black-1/40'/>
                    <div className="relative max-w-7xl mx-auto px-4 flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-bold text-center mb-16 mt-16 p-1 px-4 border border-white">4 easy ways to get your needed service settled</h2>

                        <div className="w-full grid grid-cols-4 md:grid-cols-4 gap-10">
                            {[
                                { icon: <Search color='gray' size={50}/>, title: "Search", desc: "Search for Service providers near you" },
                                { icon: <MessageCircle color='gray' size={50}/>, title: "Connect", desc: "Message the selected Service provider" },
                                { icon: <Handshake color='gray' size={50}/>, title: "Book", desc: "Strike a deal the selected Service provider" },
                                { icon: <MessageSquareDiff color='gray' size={50}/>, title: "Done", desc: "Drop a  review on the service rendered" },
                            ].map((step, index) => (
                                <div key={index} className="text-center bg-white shadow-md p-7 h-[200px] flex flex-col justify-center items-center">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                        {step.icon}
                                    </div>
                                    <p className="text-sm opacity-90 text-gray-600">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What They&apos;re Saying About Us</h2>
                            <div className="flex justify-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                            <blockquote className="text-lg text-gray-700 mb-6 italic">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.
                            </blockquote>
                            <div className="flex items-center justify-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: "url(/placeholder.svg?height=48&width=48&query=happy customer testimonial)",
                                    }}
                                ></div>
                                <div>
                                    <p className="font-semibold text-gray-900">John Doe</p>
                                    <p className="text-sm text-gray-600">Satisfied Customer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Seeker