"use client"

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";
import Footer from "@/components/Footer";
import { Sheet } from "@/components/ui/sheet";
import Navbar from "@/components/Navbar";
import Menubar from "@/components/Menubar";

function Home() {

  useEffect(() => {
    AOS.init({
      once: true
    });
  }, [])

  return (
    <main>
      <Sheet>
        <Navbar />
        <Menubar />
      </Sheet>
      <section className="flex w-full items-center xl:justify-between justify-center gap-2 px-[25px] xl:max-w-[1100px] m-auto my-12 xl:my-0">
        <div className="flex w-2/3 items-center justify-center lg:items-end lg:justify-end">
          <div className="flex gap-y-3 flex-col">
            <div className="flex items-center gap-3">
              <span className="block w-14 h-[2px] bg-primary-1 rounded-full"></span>
              <h1 className="text-lg lg:text-xl text-primary-1">Service providing website</h1>
            </div>
            <h2 className="font-bold text-3xl lg:text-[40px] text-black-1 lg:leading-[48px]">Discover Local <br /> Service Providers <br /> near You</h2>
            <h3 className="font-normal text-lg text-[#3C3742B2] mt-0 lg:mt-0">
              Exserc is a service providing website where
              you can get service providers near your to sort
              your needs at your convenience.
              </h3>
            <h3 className="font-normal text-lg text-[#3C3742B2] mt-6 lg:mt-10">What do you need help with?</h3>
            <div className="flex items-center justify-between gap-3">
              <Button variant="default" size="sm" ><Link href="/seeker">Find Service Providers</Link></Button>
              <Button variant="outline" size="sm" ><Link href="/provider">Offer Your Services</Link></Button>
            </div>
          </div>
        </div>
        <div className="relative  h-[calc(100vh-90px)] md:block hidden">
          {/* <figure className="w-[280px] h-[300px] absolute top-0 left-0 animate-slidedown z-0">
            <Image
              src="/assets/images/hero-1.png"
              alt="hero-1"
              width={380}
              height={400}
              className="object-cover block"
            />
          </figure>
          <figure className="w-[320px] h-[350px] absolute bottom-16 right-0 animate-slideup z-0">
            <Image
              src="/assets/images/hero-2.png"
              alt="hero-2"
              width={400}
              height={600}
              className="object-cover block"
            />
          </figure> */}
          <div className="relative flex h-full justify-center items-center w-[100%] gap-6 md:ml-[10%] overflow-visible">
            <div className="flex flex-col gap-2">
              <div className="relative w-[25vw] h-[30vw] max-w-[300px] max-h-[370px] bg-[#225F6A] rounded-3xl">
                <Rectangles name="Barber" nameWidth="170px" showFeather />
                <Image
                  src="/assets/images/african_american_barber.png"
                  alt="hero-2"
                  width={400}
                  height={600}
                  className="object-cover block absolute bottom-0 "
                />
              </div>

              <div className="relative w-[25vw] max-w-[300px] h-[70px] bg-[#1d1d1b66] rounded-[20px]">
                <Image
                  src="/assets/images/tools.png"
                  alt="hero-2"
                  width={400}
                  height={600}
                  className="object-contain block absolute h-[100%] w-[100%] opacity-85"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative w-[25vw] max-w-[300px] h-[80px] rounded-3xl">
                <Image
                  src="/assets/images/no1_batch.png"
                  alt="hero-2"
                  width={400}
                  height={600}
                  className="object-cover block absolute -top-28 left-2 h-44 w-44"
                />
                <Image
                  src="/assets/images/tagRope.png"
                  alt="hero-2"
                  width={400}
                  height={600}
                  className="object-cover block absolute -top-0 right-2 h-20 w-20"
                />
              </div>

              <div className="relative w-[25vw] h-[30vw] max-w-[300px] max-h-[370px] bg-[#225F6A] rounded-3xl">
                <Rectangles name="Laundry woman" nameWidth="190px" />
                <Image
                  src="/assets/images/woman_holding_iron.png"
                  alt="hero-2"
                  width={400}
                  height={600}
                  className="object-cover block absolute bottom-0 "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wave-1-bg w-full min-h-screen flex items-center justify-center px-[25px] lg:px-[100px] pt-36 md:pt-56 pb-16">
        <div className="flex flex-col items-center justify-center gap-y-9 lg:gap-y-11 xl:max-w-[1100px]">
          <div className="flex items-center gap-1">
            <span className="block w-14 h-[2px] bg-primary-1 rounded-full"></span>
            <h1 className="text-xl text-primary-1">How we can help you</h1>
            <span className="block w-14 h-[2px] bg-primary-1 rounded-full"></span>
          </div>
          <div>
            <h1 className="font-bold text-xl md:text-[32px] md:leading-[40px] text-center text-black-1">Join Nigeria’s service market <br />
              for Service providers</h1>
          </div>
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 grid-rows-1 gap-x-8" >
            <div className="bg-white flex flex-col gap-y-6 items-center justify-center p-10" data-aos="fade-down" data-aos-duration="800">
              <figure className="w-[68px] h-[48px]">
                <Image
                  src="/assets/images/workman.png"
                  alt="workman"
                  width={68}
                  height={48}
                  className="object-cover block"
                />
              </figure>
              <p className="font-bold text-lg text-center text-black-1">Suitable Service <br />
                Providers</p>
              <p className="text-center text-[13px] leading-[17px] text-black-2">Lorem ipsum dolor sit amet,consectetur
                adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, q</p>
            </div>
            <div className="bg-white flex flex-col gap-y-6 items-center justify-center p-10" data-aos="fade-up" data-aos-duration="800">
              <figure className="w-[68px] h-[48px]">
                <Image
                  src="/assets/images/money.png"
                  alt="money"
                  width={68}
                  height={48}
                  className="object-cover block"
                />
              </figure>
              <p className="font-bold text-lg text-center text-black-1">Efficient Payment <br /> System</p>
              <p className="text-center text-[13px] leading-[17px] text-black-2">Lorem ipsum dolor sit amet,consectetur
                adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, q</p>
            </div>
            <div className="bg-white flex flex-col gap-y-6 items-center justify-center p-10" data-aos="fade-down" data-aos-duration="800">
              <figure className="w-[68px] h-[48px]">
                <Image
                  src="/assets/images/handshake.png"
                  alt="handshake"
                  width={68}
                  height={48}
                  className="object-cover block"
                />
              </figure>
              <p className="font-bold text-lg text-center text-black-1">Relaiable Service <br />
                Providers</p>
              <p className="text-center text-[13px] leading-[17px] text-black-2">Lorem ipsum dolor sit amet,consectetur
                adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, q</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col-reverse md:flex-row items-center gap-y-8 md:items-start justify-between gap-x-4 xl:gap-x-0 px-[25px] lg:px-[100px] xl:px-0 max-w-[1100px] m-auto">
        <div className="relative w-full md:w-[450px]">
          <figure className="w-[270px] xl:w-full md:w-[314px] h-[452px] xl:h-full animate-in z-10">
            <Image
              src="/assets/images/tailor.png"
              alt="hero-1"
              width={400}
              height={500}
              className="object-contain object-top w-full h-full block"
            />
          </figure>
          {/* <figure className="w-[30px] lg:w-[35px] xl:w-[50px] absolute top-0 left-0 z-0">
              <Image
                src="/assets/images/premscent.png"
                alt="premscent"
                width={65}
                height={15}
                className="w-full object-contain block"
              />
          </figure> */}
        </div>
        <div className="flex flex-col items-start justify-center gap-y-4 xl:gap-y-6 pt-12 lg:pt-20">
          <div className="flex items-center gap-3">
            <span className="block w-14 h-[2px] bg-primary-1 rounded-full"></span>
            <h1 className="text-xl text-primary-1">About Exserc</h1>
          </div>
          <h2 className="font-bold text-2xl xl:text-[50px] text-black-1 xl:leading-[58px]">Get your needs sorted <br /> out from your place of <br /> comfort</h2>
          <p className="text-start text-[13px] leading-[17px] xl:text-xl text-black-2 max-w-80 xl:max-w-[450px]">Lorem ipsum dolor sit amet,consectetur
            adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, q
          </p>
          <div className="flex gap-x-4 mt-8">
            <figure className="min-w-[27px] xl:w-[50px] xl:h-[60px] min-h-[35px] animate-in z-0">
              <Image
                src="/assets/images/location.png"
                alt="location"
                width={50}
                height={50}
                className="object-cover block"
              />
            </figure>
            <p className="text-start text-[13px] leading-[17px] xl:text-xl text-black-2 max-w-80 xl:max-w-[450px]">Lorem ipsum dolor sit amet,consectetur
              adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, q
            </p>
          </div>
          <Button variant="outline" className="font-light gap-2" size="sm" ><span>Learn more</span> <ArrowRightIcon fontSize={12} /> </Button>
        </div>
      </section>
      <section className="flex items-start justify-center flex-col md:flex-row my-10 lg:my-32 gap-y-8 gap-x-3 lg:gap-x-10 box-bg-image px-[25px] m-auto lg:px-[100px] xl:max-w-[1100px]">
        <div>
          <div className="flex flex-col items-center lg:items-start justify-center gap-y-6 pt-8 lg:pt-20">
            <div className="flex items-center gap-3">
              <span className="block w-14 h-[2px] bg-primary-1 rounded-full"></span>
              <h1 className="text-xl text-primary-1">About Exserc</h1>
            </div>
            <h2 className="font-bold text-center lg:text-start text-2xl xl:text-[40px] text-black-1 xl:leading-[48px]">We Provide Exclusive <br /> Marketing Service</h2>
            <div className="flex flex-col items-start gap-y-16 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-y-8 gap-2 lg:gap-8">
                <div className="flex gap-x-4">
                  <figure className="w-[50px] h-[42px] animate-in z-0">
                    <Image
                      src="/assets/images/speaker.png"
                      alt="location"
                      width={50}
                      height={42}
                      className="object-cover block"
                    />
                  </figure>
                  <div>
                    <h3 className="text-start tracking-widest text-lg font-bold text-black-1">Effective Business <br /> Promotion</h3>
                    <p className="text-start text-[13px] leading-[17px] text-black-2 max-w-80">Lorem ipsum dolor sit amet,consectetur
                      adipiscing elit, sed do eius
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <figure className="w-[50px] h-[42px] animate-in z-0">
                    <Image
                      src="/assets/images/laptop.png"
                      alt="location"
                      width={50}
                      height={42}
                      className="object-cover block"
                    />
                  </figure>
                  <div>
                    <h3 className="text-start text-lg font-bold text-black-1">Transcaction Tracking</h3>
                    <p className="text-start text-[13px] leading-[17px] text-black-2 max-w-80">Lorem ipsum dolor sit amet,consectetur
                      adipiscing elit, sed do eius
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <figure className="w-[50px] h-[42px] animate-in z-0">
                    <Image
                      src="/assets/images/processing.png"
                      alt="location"
                      width={50}
                      height={42}
                      className="object-cover block"
                    />
                  </figure>
                  <div>
                    <h3 className="text-start text-lg font-bold text-black-1">Smooth Processing</h3>
                    <p className="text-start text-[13px] leading-[17px] text-black-2 max-w-80">Lorem ipsum dolor sit amet,consectetur
                      adipiscing elit, sed do eius
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <figure className="w-[50px] h-[42px] animate-in z-0">
                    <Image
                      src="/assets/images/chat.png"
                      alt="location"
                      width={50}
                      height={42}
                      className="object-cover block"
                    />
                  </figure>
                  <div>
                    <h3 className="text-start text-lg font-bold text-black-1">Increase in Business output</h3>
                    <p className="text-start text-[13px] leading-[17px] text-black-2 max-w-80">Lorem ipsum dolor sit amet,consectetur
                      adipiscing elit, sed do eius
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="font-light gap-2" size="sm" ><span>Learn more</span> <ArrowRightIcon fontSize={12} /> </Button>
            </div>
          </div>
        </div>
        <div className="relative">
          <figure className="w-[250px] lg:w-[360px] lg:h-[453px] animate-slideup z-0">
            <Image
              src="/assets/images/cleaner.png"
              alt="hero-2"
              width={360}
              height={453}
              className="object-cover block"
            />
          </figure>
        </div>
      </section>
      <section className="flex items-center justify-center px-[25px] lg:px-[100px] pt-24 pb-32 bg-[#F4F3F5]">
        <div className="grid grid-cols-1 w-full md:grid-cols-2 xl:grid-cols-4 grid-rows-1 gap-y-10 gap-x-12">
          <div className="relative flex flex-col gap-y-6 items-center justify-center h-[400px]" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
            <figure className="w-full h-full">
              <Image
                src="/assets/images/chef.png"
                alt="chef"
                width={280}
                height={400}
                className="w-full h-full object-cover block"
              />
            </figure>
            <Image
              src="/assets/images/star.png"
              alt="star"
              width={40}
              height={40}
              className="absolute top-3 right-3 object-cover block"
            />
            <p className="text-start absolute bottom-0 text-[15px] leading-[20px] p-2 text-white font-bold">Lorem ipsum dolor sit amet,consecte</p>
          </div>
          <div className="relative flex flex-col gap-y-6 items-center justify-center h-[400px]" data-aos="fade-up" data-aos-delay="600" data-aos-duration="800">
            <figure className="w-full h-full">
              <Image
                src="/assets/images/bricklayer.png"
                alt="bricklayer"
                width={280}
                height={400}
                className="w-full h-full object-cover block"
              />
            </figure>
            <Image
              src="/assets/images/star.png"
              alt="star"
              width={40}
              height={40}
              className="absolute top-3 right-3 object-cover block"
            />
            <p className="text-start absolute bottom-0 text-[15px] leading-[20px] p-2 text-white font-bold">Lorem ipsum dolor sit amet,consecte</p>
          </div>
          <div className="relative flex flex-col gap-y-6 items-center justify-center h-[400px]" data-aos="fade-up" data-aos-delay="900" data-aos-duration="800">
            <figure className="w-full h-full">
              <Image
                src="/assets/images/electrician.png"
                alt="electrician"
                width={280}
                height={400}
                className="w-full h-full object-cover block"
              />
            </figure>
            <Image
              src="/assets/images/star.png"
              alt="star"
              width={40}
              height={40}
              className="absolute top-3 right-3 object-cover block"
            />
            <p className="text-start absolute bottom-0 text-[15px] leading-[20px] p-2 text-white font-bold">Lorem ipsum dolor sit amet,consecte</p>
          </div>
          <div className="relative flex flex-col gap-y-6 items-center justify-center h-[400px]" data-aos="fade-up" data-aos-delay="1200" data-aos-duration="800">
            <figure className="w-full h-full">
              <Image
                src="/assets/images/driver.png"
                alt="driver"
                width={280}
                height={400}
                className="w-full h-full object-cover block"
              />
            </figure>
            <Image
              src="/assets/images/star.png"
              alt="star"
              width={40}
              height={40}
              className="absolute top-3 right-3 object-cover block"
            />
            <p className="text-start absolute bottom-0 text-[15px] leading-[20px] p-2 text-white font-bold">Lorem ipsum dolor sit amet,consecte</p>
          </div>
        </div>
      </section>
      <section className="bg-white items-center flex justify-center px-[25px] h-[100px] md:h-[250px] relative">
        <div className="flex max-w-[990px] max-h-[198px] w-full absolute -top-10">
          <div className="bg-primary-1 text-white flex justify-center gap-x-3 py-2 lg:gap-x-8 items-center flex-1" data-aos="fade-down" data-aos-duration="800">
            <div className="flex flex-col justify-start gap-y-3">
              <h1 className="font-bold text-xl md:text-3xl lg:text-5xl">500+</h1>
              <p className="md:text-base text-sm lg:text-xl">Service seekers</p>
            </div>
            <div className="flex flex-col justify-start gap-y-3">
              <h1 className="font-bold text-xl md:text-3xl lg:text-5xl">200+</h1>
              <p className="md:text-base text-sm lg:text-xl">Service providers</p>
            </div>
            <div className="flex flex-col justify-start gap-y-3">
              <h1 className="font-bold text-xl md:text-3xl lg:text-5xl">5000+</h1>
              <p className="md:text-base text-sm lg:text-xl">Transactions</p>
            </div>
          </div>

          <div className="relative hidden md:block" data-aos="fade-down" data-aos-duration="800">
            <figure className=" w-[200px] lg:w-[266px] h-[198px] z-0">
              <Image
                src="/assets/images/salesman.png"
                alt="salesman"
                width={266}
                height={198}
                className="object-cover block"
              />
            </figure>
            <div className="bg-[#225f6a51] text-xs text-white flex items-center justify-center absolute top-0 left-0 w-full h-full">
              <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus rerum provident sit sed!</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}


export default Home




const Rectangles = ({ name, nameWidth, showFeather }: any) => {
  return (
    <>
      {showFeather &&
        <>
          <div className="absolute -left-9 top-1 rotate-[42deg] w-[100px] h-[22px] bg-[#225F6A] rounded-3xl"></div>
          <div className="absolute -left-9 top-1 rotate-[80deg] w-[100px] h-[22px] bg-[#225F6A] rounded-3xl"></div>
          <div className="absolute -left-9 top-1 rotate-6 w-[100px] h-[22px] bg-[#225F6A] rounded-3xl"></div>
        </>}


      <div className="absolute top-[60px] left-[80px] h-[199px] w-[60px] bg-[#367B87] rounded-xl -rotate-[28.18deg]"></div>
      <div className="absolute bottom-[40px] left-[70px] h-[199px] w-[60px] bg-[#367B87] rounded-xl -rotate-[68.45deg]"></div>
      <div className="absolute bottom-[90px] right-[90.81px] h-[199px] w-[60px] bg-[#367B87] rounded-xl -rotate-[108.72deg]"></div>
      <div className="absolute top-[165px] left-[124px] h-[199px] w-[60px] bg-[#367B87] rounded-xl -rotate-[171.58deg]"></div>


      <div className={`absolute -right-11 top-1 rotate-[22deg] w-[${nameWidth}] h-[60px] bg-[#5D7D3B] rounded-2xl flex justify-center items-center`}
      style={{width: nameWidth}}>
        <p className="text-xl text-white font-extralight">{name}</p>
      </div>
    </>
  )
}