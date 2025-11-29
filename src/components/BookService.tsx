import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@radix-ui/react-label'
import { Textarea } from '@/components/ui/textarea'
import { Button, ButtonProps } from './ui/button'

type BookServiceType = ButtonProps

const BookService = (props: BookServiceType ) => {
  return (
    <div className='w-full max-w-[400px]'>
                <Dialog>
                    <DialogTrigger asChild>
                    <Button {...props} >Book Service</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[925px] h-full lg:h-auto items-start">
                        <DialogHeader className='text-center'>
                            <DialogTitle className='text-center'>Book a Service</DialogTitle>
                            <DialogDescription className='text-center'>
                                What services are you in need of?
                            </DialogDescription>
                        </DialogHeader>
                        <div className='py-4 md:py-8 md:px-16'>
                            <div className='grid grid-cols-2 items-center justify-between gap-4 w-full md:w-2/3 m-auto'>
                                {
                                    ["borehole", "Toilet repairs", "Pumping Machine", "Water Treatment", "Tank Washing", "Drains/Leaks fixing", "Installation", "Piping"].map((item) => (
                                        <div className="flex items-center space-x-2" key={item}>
                                            <Checkbox id={item} />
                                            <label
                                                htmlFor={item}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {item}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='w-full md:w-2/3 m-auto'>
                                <div className="grid w-full gap-1.5 py-8">
                                    <Label htmlFor="others">Others</Label>
                                    <Textarea placeholder="what other service" className='border border-primary-1' id="others" />
                                </div>
                            </div>
                        <DialogFooter className='flex items-center justify-between w-full md:w-2/3 m-auto gap-3'>
                            <DialogClose asChild>
                                <Button variant="default" size="lg" className='rounded-full w-full text-lg font-normal p-5' >Booker Now</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant="outline" size="lg" className='rounded-full w-full text-lg font-normal p-5' >Schedule appointment</Button>
                            </DialogClose>
                        </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
  )
}

export default BookService