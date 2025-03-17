import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ data }) => {
  return (
    <div className="mb-10 section_product">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
        {data.map((item) => (
          <div
            key={item.id}
            data-aos="fade-up"
            data-aos-delay={item.aosDelay}
            className="leading-7"
          >
            <div className="
              box-image
              h-[300px]  p-5
              flex justify-center items-center
              border border-[#f0eeee]
              rounded-[12px]
              relative overflow-hidden
              transition duration-300
              group
            ">
              <Link to={`/products/detail/${item.slug}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="object-contain h-auto transition-transform duration-300 transform group-hover:scale-105"
                  style={{ margin: 0 }}
                />
              </Link>

            </div>

            <Link to={`/products/${item.product_category_id.slug}`}>
              <h2 className="font-thin mt-2">{item.product_category_id.title}</h2>
            </Link>
            <Link to={`/products/detail/${item.slug}`}>
              <h2 className="font-normal">{item.title}</h2>
            </Link>   
            <h2 className="font-bold text-lg mt-2">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.price)}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;