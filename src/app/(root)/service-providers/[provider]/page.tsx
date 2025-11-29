import Image from 'next/image'
import React from 'react'
import { MdLocationPin } from 'react-icons/md'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ProviderDetails = () => {
  return (
    <div className='py-8 px-6'>
        <section className='flex items-center justify-center flex-col gap-y-3'>
            <div className='w-[200px] h-[190px] border-[2px] border-primary-1 rounded-md relative flex items-center justify-center bg-[#F8F7F7] object-cover'>
                <Image src="/assets/images/big-profile_pic.png" alt='profile' className='z-0 block h-full w-full object-cover' width={200} height={200} />
            </div>
            <div>
                <h1 className="font-medium text-4xl text-black-1 relative">Kelvin Patrick <span className='text-[#2F9C26] text-sm absolute top-1/3 -right-12'>Online</span></h1>
            </div>
            <div className='flex gap-3 items-center'>
                <h1 className="font-medium text-xl text-black-2 flex items-center gap-1">
                    <MdLocationPin className="w-5 h-5 text-[#d15858]" /> <span>Warri</span>
                </h1> |
                <h1 className="font-medium text-xl text-primary-1 flex items-center gap-1">PLumbing Service</h1>
            </div>
            <div className='p-4 py-6 sm:p-8 sm:px-10 border border-primary-1 rounded-3xl flex items-center justify-center gap-x-2 sm:gap-x-12 mt-4'>
                <div className='flex flex-col gap-2 items-center justify-center'>
                    <p className='text-sm text-center font-medium text-black-1'>Total Jobs</p>
                    <p className='text-xl sm:text-2xl font-medium text-black-1'>15</p>
                </div> 
                <span className='bg-primary-1 rounded-full w-[1.5px] h-16'></span>
                <div className='flex flex-col gap-2 items-center justify-center'>
                    <p className='text-sm text-center font-medium text-black-1'>Number Of Reviews</p>
                    <p className='text-xl sm:text-2xl font-medium text-black-1'>26</p>
                </div> 
                <span className='bg-primary-1 rounded-full w-[1.5px] h-16'></span>
                <div className='flex flex-col gap-2 items-center justify-center'>
                    <p className='text-sm text-center font-medium text-black-1'>Average Rating</p>
                    <p className='text-xl sm:text-2xl font-medium text-black-1'>3.5/5</p>
                </div> 
            </div>
                <Button type='button' variant="default" size="rs" className='rounded-full max-w-80 w-full'><Link href="/user/chat">Message</Link></Button>
            <div className='py-3 xl:py-6 border border-primary-1 rounded-3xl grid grid-cols-1 sm:grid-cols-3 items-start mt-4 w-full'>
                <div className='flex flex-col gap-2 items-center justify-start border-b sm:border-b-0 sm:border-r-[2px] h-full py-3 border-primary-1'>
                    <p className='text-lg font-medium text-primary-1'>Skills</p>
                    <div className='text-base xl:text-xl font-medium text-black-1'>
                        <ul className='list-disc'>
                            <li>Drain Leaks Fixing</li>
                            <li>Piping</li>
                            <li>Water tank fixing</li>
                        </ul>
                    </div>
                </div> 
                {/* <span className='bg-black-2 rounded-full w-[1.5px] '></span> */}
                <div className='flex flex-col gap-2 items-center justify-start border-b sm:border-b-0 sm:border-r-[2px] h-full  py-3 border-primary-1'>
                    <p className='text-lg font-medium text-primary-1'>Bio</p>
                    <p className='text-base xl:text-xl font-medium text-black-1 max-w-[300px] text-pretty px-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, illum odio tempore maiores labore iure consequatur obcaecati dolorum omnis porro reprehenderit ex ratione?</p>
                </div> 
                {/* <span className='bg-black-2 rounded-full w-[1.5px] h-full'></span> */}
                <div className='flex flex-col gap-2 items-center justify-start px-3 py-3 border-b-primary-1'>
                    <p className='text-lg font-medium text-primary-1'>Working Hours</p>
                    <div className='text-base xl:text-xl font-medium text-black-1'>
                        <ul className='list-disc list-inside'>
                            <li>Modays to Fridays 9am - 5pm</li>
                            <li>Saturdays 9am - 3pm</li>
                        </ul>
                    </div>
                </div> 
            </div>
        </section>
        <section className='flex flex-col items-center justify-center gap-6 mt-5'>
            <h1 className='font-medium text-2xl text-black-1'>Work Photos</h1>
            <div className='px-10'>
                <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full max-w-5xl"
                >
                    <CarouselContent>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <div className='rounded-2xl overflow-hidden'>
                                        <Image src="/assets/images/work-photos-1.png" alt='profile' className='z-0 block h-full w-full object-cover' width={247} height={247} />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
        <section className='flex flex-col items-center justify-center gap-6 mt-5'>
            <h1 className='font-medium text-2xl text-black-1'>Reviews</h1>
            <div className='py-6 border border-primary-1 rounded-3xl grid grid-cols-1 md:grid-cols-3 items-start mt-4 w-full'>
                <div className='flex flex-col gap-2 items-center justify-start border-b md:border-b-0 md:border-r-[2px] border-primary-1 h-full py-3'>
                    <p className='text-lg font-medium text-primary-1'>Mrs Sam Onwuka</p>
                    <p className='text-xl font-medium text-black-1 max-w-[300px] text-pretty px-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, illum odio tempore maiores labore iure consequatur obcaecati dolorum omnis porro reprehenderit ex ratione?</p>
                    <div className='flex items-end gap-1 pt-1'>
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarIcon width={15} height={15} />
                    </div>
                </div> 
                {/* <span className='bg-black-2 rounded-full w-[1.5px] '></span> */}
                <div className='flex flex-col gap-2 items-center justify-start border-b md:border-b-0 md:border-r-[2px] border-primary-1 h-full  py-3'>
                    <p className='text-lg font-medium text-primary-1'>Thomas Jackson</p>
                    <p className='text-xl font-medium text-black-1 max-w-[300px] text-pretty px-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, illum odio tempore maiores labore iure consequatur obcaecati dolorum omnis porro reprehenderit ex ratione?</p>
                    <div className='flex items-end gap-1 pt-1'>
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarIcon width={15} height={15} />
                    </div>
                </div> 
                {/* <span className='bg-black-2 rounded-full w-[1.5px] h-full'></span> */}
                <div className='flex flex-col gap-2 items-center justify-start px-3 py-3'>
                    <p className='text-lg font-medium text-primary-1'>Samson Peter</p>
                    <p className='text-xl font-medium text-black-1 max-w-[300px] text-pretty px-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, illum odio tempore maiores labore iure consequatur obcaecati dolorum omnis porro reprehenderit ex ratione?</p>
                    <div className='flex items-end gap-1 pt-1'>
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarFilledIcon width={15} height={15} className='text-primary-1' />
                        <StarIcon width={15} height={15} />
                    </div>
                </div> 
            </div>
        </section>
    </div>
  )
}

export default ProviderDetails