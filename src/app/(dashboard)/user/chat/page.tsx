"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import { RiSendPlaneFill } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { HiOutlinePaperClip } from "react-icons/hi2";
import ProtectedRoute from '@/components/ProtectedRoute';


const Chat = () => {
    return (
        <div className='relative h-full flex flex-col w-full'>
                {/* message area */}
                <div className='w-full justify-end h-full flex-col gap-1 flex'>
                    <div className='overflow-y-auto h-full py-2 hover:on-scrollbar'>

                        {/* recieved messages */}
                        <div className='px-6 lg:px-10 xl:px-16 my-2 gap-1 flex items-start justify-start'>
                            <figure className='w-[28px] h-[28px] rounded-full overflow-hidden border border-primary-1'>
                                <Image src='/assets/images/big-profile_pic.png' className='w-full h-full object-cover' alt='logo' width={128} height={128} />
                            </figure>
                            <div className='flex relative items-end flex-col max-w-[70%]  text-black-2  rounded-lg'>
                                <div className='flex items-start flex-col bg-[#f0f0f0] z-10 rounded-tr-2xl rounded-b-2xl p-[6px] xl:p-2'>
                                    {/* <p className='text-xs font-bold'>Roland Odenore</p> */}
                                    <section className='flex items-center gap-1'>
                                        <p className='text-xs lg:text-sm px-1 break-words'>how are you</p>
                                        <div className='flex items-center self-end gap-1 pt-2'>
                                            <span className='text-[10px] lg:text-sm font-light'>20:34</span>
                                        </div>
                                    </section>
                                </div>
                                {/* <IoTriangle className='absolute overflow-hidden -top-[7px] left-[98%] z-0 inline-block w-6 h-6 rotate-[60deg] text-primary-two'/> */}
                            </div>
                        </div>

                        {/* sent message */}
                        <div className='px-6 lg:px-10 xl:px-16 my-2 gap-1 flex items-start justify-end'>
                            <div className='flex relative  items-end flex-col max-w-[70%] text-white  rounded-lg'>
                                <div className='flex items-end flex-col bg-primary-1 z-10 rounded-tl-2xl rounded-b-2xl p-[6px] xl:p-2'>
                                    {/* <p className='text-xs font-bold'>Roland Odenore</p> */}
                                    <section className='flex items-center gap-1'>
                                        <p className='text-xs lg:text-sm px-1 break-words'>am fine</p>
                                        <div className='flex items-center self-end gap-1 pt-2'>
                                            <span className='text-[10px] lg:text-sm font-light'>20:34</span>
                                        </div>
                                    </section>
                                </div>
                                {/* <IoTriangle className='absolute overflow-hidden -top-[7px] left-[98%] z-0 inline-block w-6 h-6 rotate-[60deg] text-primary-two'/> */}
                            </div>
                            <div className='w-[30px] h-[30px] flex items-center justify-center rounded-full overflow-hidden text-base p-1 font-medium text-white border bg-[#4AB46E]'>
                                N
                            </div>
                        </div>
                        <div className='px-6 lg:px-10 xl:px-16 my-2 gap-1 flex items-start justify-end'>
                            <div className='flex relative  items-end flex-col max-w-[70%] text-white  rounded-lg'>
                                <div className='flex items-end flex-col bg-primary-1 z-10 rounded-tl-2xl rounded-b-2xl p-[6px] xl:p-2'>
                                    {/* <p className='text-xs font-bold'>Roland Odenore</p> */}
                                    <section className='flex items-center gap-1'>
                                        <p className='text-xs lg:text-sm px-1 break-words'>You need my service?</p>
                                        <div className='flex items-center self-end gap-1 pt-2'>
                                            <span className='text-[10px] lg:text-sm font-light'>20:34</span>
                                        </div>
                                    </section>
                                </div>
                                {/* <IoTriangle className='absolute overflow-hidden -top-[7px] left-[98%] z-0 inline-block w-6 h-6 rotate-[60deg] text-primary-two'/> */}
                            </div>
                            <div className='w-[30px] h-[30px] flex items-center justify-center rounded-full overflow-hidden text-base p-1 font-medium text-white border bg-[#4AB46E]'>
                                N
                            </div>
                        </div>

                    </div>
                </div>

                {/* keyboard area */}
                <div className='self-end absolute top-0 left-1/2 -translate-x-1/2 z-10 flex items-end w-11/12 bottom-2 bg-[#f0f0f0] rounded-3xl py-1 px-4'>
                    <div className='py-1'>
                        <button className='p-[6px] flex items-center justify-center lg:p-2'>
                            <HiOutlinePaperClip size={24} color="#000" />
                        </button>
                    </div>
                    <div className='py-1 lg:py-2 px-2 lg:px-3 max-h-36 h-[25px] my-1 mx-2 bg-light-bg rounded-md flex items-center justify-center flex-1'>
                        <textarea placeholder='Your message' id='message' className='text-unread-msg placeholder:text-black-1 p-0 bg-transparent resize-none overflow-y-auto w-full no-scrollbar outline-none text-sm'>
                        </textarea>
                    </div>
                    <button className='p-[6px] flex items-center justify-center lg:p-2'>
                        <MdOutlineEmojiEmotions size={24} color="#000" />
                    </button>
                    <button className='p-[6px] flex items-center justify-center lg:p-2'>
                        <RiSendPlaneFill size={27} className='duration-500 text-primary-1' />
                    </button>
                </div>
            </div>
    )
}

export default Chat