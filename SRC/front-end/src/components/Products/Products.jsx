import React from 'react';
import Heading from '../Shared/Heading';
import ProductCard from './ProductCard';

import Image1 from '../../assets/hero/air-jordan-1-low-paris-removebg-preview.png';

const ProductsData = [
  {
    id: 1,
    img: Image1,
    title: "Nike Air 1",
    price: "120",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Image1,
    title: "Nike Air 1",
    price: "120",
    aosDelay: "0",
  },
  {
    id: 3,
    img: Image1,
    title: "Nike Air 1",
    price: "120",
    aosDelay: "0",
  },
  {
    id: 4,
    img: Image1,
    title: "Nike Air 1",
    price: "120",
    aosDelay: "0",
  },
  {
    id: 5,
    img: Image1,
    title: "Nike Air 1",
    price: "120",
    aosDelay: "0",
  },  {
    id: 6,
    img: Image1,
    title: "Nike Air 1",
    price: "120",
    aosDelay: "0",
  },
  {
    id: 7,
    img: Image1,
    title: "Nike Air 1",
    price: "120",
    aosDelay: "0",
  }, 
  {
    id: 8,
    img: Image1,
    title: "Nike Air 1",
    price: "120",
    aosDelay: "0",
  }
];


function Products() {
  return (
    <div>
      <div className="container">
        {/* Header section */}
        <Heading title="Our Products" subtitle={"Explore Our Products"}/>

        {/* Body section */}
        <ProductCard data={ProductsData}/>
      </div>
    </div>
  )
}

export default Products;