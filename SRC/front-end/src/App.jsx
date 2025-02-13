import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer/Footer'
import Products from './components/Products/Products'
import Banner from './components/Banner/Banner'
import Blogs from './components/Blogs/Blogs'

import Image1 from './assets/hero/air-jordan-1-low-paris-removebg-preview.png';
import Image2 from './assets/hero/headphone.png';
import Popup from './components/Popup/Popup'
import Servies from './components/Services/Servies'
import Partners from './components/Partners/Partners'

const BannerData={
  discount: "30%",
  title: "Giày Nike Air Jordan 1 Low ‘Paris’ CV3043-100",
  date: "2024",
  img: Image1,
  title2: "Air Jordan 1 Low",
  title3: "Nike",
  title4: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem possimus debitis voluptates voluptas repudiandae voluptatem.",
  bgColor: "#f42c37",
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden'>
      <Navbar />
      <Hero />
      <Servies />
      <Banner data={BannerData}/>
      <Products/>
      <Banner data={BannerData}/>
      <Blogs />
      {/* <hr /> */}
      <Popup />
      <Partners />
      <Footer />
    </div>
  )
}

export default App
