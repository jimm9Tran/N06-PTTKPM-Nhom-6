import React from 'react';
import Slider from "react-slick";
import Button from '../Shared/Button';

import Image1 from "../../assets/hero/air-jordan-1-low-paris-removebg-preview.png";
import Image2 from "../../assets/hero/Travis-Scott-Air-Jordan-1-Low-OG-1-600x247-removebg-preview.png";

const HeroData = [
  {
    id: 1,
    img: Image2,
    subtitle: "Giày Nike Jordan 1 Low OG SP x Travis Scott ‘Medium Olive’ DM7866-200",
    title: "Air Jordan 1 Low",
    title2: "Travis Scott",
  },
  {
    id: 2,
    img: Image1,
    subtitle: "Giày Nike Air Jordan 1 Low ‘Paris’ CV3043-100",
    title: "Nike Air Jordan 1",
    title2: "SNEAKER",
  },
];

const Hero = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,           
    autoplaySpeed: 4000,       
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className='container'>
      <div className='overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center'>
        <div className='container pb-8 sm:pb-0'>
          {/* Hero section */}
          <Slider {...settings}>
            {HeroData.map((data) => (
              <div key={data.id}>
                <div className='grid grid-cols-1 sm:grid-cols-2 items-center px-4 py-12 sm:py-0 gap-6'>
                  {/* Text content section */}
                  <div className='order-1 sm:order-1 flex flex-col gap-2 sm:gap-4 text-center sm:text-left'>
                    <h3 
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className='text-gray-500 text-xl sm:text-2xl font-semibold'
                    >
                      {data.subtitle}
                    </h3>
                    <h1 
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className='text-4xl sm:text-5xl lg:text-6xl font-bold'
                    >
                      {data.title}
                    </h1>
                    <h1 
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className='whitespace-nowrap text-[50px] sm:text-[80px] md:text-[100px] dark:text-white/5 xl:text-[150px] font-bold text-gray-300 uppercase leading-none'
                    >
                      {data.title2}
                    </h1>
                    <div 
                      data-aos="fade-up"
                      data-aos-offset="0"
                      data-aos-duration="500"
                      data-aos-delay="300"
                      className='mt-4'
                    >
                      <Button text="Mua ngay" bgColor="bg-primary" textColor="text-white" />
                    </div>
                  </div>

                  {/* Image section */}
                  <div className='order-2 sm:order-2 flex justify-center items-center'>
                    <div 
                      data-aos="zoom-in"
                      data-aos-once="true"
                      className='relative z-10'
                    >
                      <img
                        src={data.img}
                        alt={data.subtitle}
                        className='w-[600px] sm:w-[500px] lg:w-[600px] object-contain drop-shadow-2xl'
                        style={{ transform: "rotate(-20deg) scaleX(-1)" }}
                     />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
