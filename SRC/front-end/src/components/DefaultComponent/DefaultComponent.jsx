import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
// import { CartProvider } from '../../context/CartContext';

const DefaultComponent = ({children}) => {
  return (
    <div>
      {/* <CartProvider> */}
        <Navbar />
          {children}
        <Footer />
      {/* </CartProvider> */}
    </div>
  )
}

export default DefaultComponent;