import React from 'react'
import Button from '../Shared/Button'

const ProductCard = ( {data} ) => {
  return (
    <div className='mb-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center'>
        {data.map((item) => (
          <div data-aos="fade-up" data-aos-delay={item.aosDelay} key={item.id} className='group'>
            <div className='relative'>
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className='h-[180px] w-[260px] object-contain rounded-md' 
              />
              <div className='hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200'>
                <Button text={"Add to cart"} bgColor={"bg-primary"} textColor={"text-white"} />
              </div>
            </div>
            <div className='leading-7'>
              <h2 className='font-semibold'>{item.title}</h2>
              <h2 className='font-bold'>${item.price}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCard