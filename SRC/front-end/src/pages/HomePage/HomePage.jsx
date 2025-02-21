import React from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'
import Servies from '../../components/Services/Servies'
import Products from '../../components/Products/Products'
import Banner from '../../components/Banner/Banner'
import Blogs from '../../components/Blogs/Blogs'
import Partners from '../../components/Partners/Partners'
import Popup from '../../components/Popup/Popup'

import Image1 from '../../assets/hero/air-jordan-1-low-paris-removebg-preview.png';


const BannerData = {
  discount: "30% OFF",
  title: "Nike",
  date: "10 Jan to 28 Jan",
  img: Image1,
  title2: "Nike Air Jordan",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#f42c37",
};

const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "14 Jan to 28 Jan",
  img: Image1,
  title2: "Smart Solo",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#2dcc6f",
};

const HomePage = () => {
  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden'>
      {/* <Navbar /> */}
      <Hero />
      <Servies />
      <Banner data={BannerData}/>
      <Products/>
      <Banner data={BannerData2}/>
      <Blogs />
      {/* <hr /> */}
      <Popup />
      <Partners />
      {/* <Footer /> */}
    </div>
  )
}

export default HomePage