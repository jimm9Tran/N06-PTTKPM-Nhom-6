import React from 'react';
import Button from '../Shared/Button';
import { CiHeart } from "react-icons/ci";

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
              <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-10">
                <CiHeart className="h-5 w-5" />
              </button>

              <img
                src={item.thumbnail}
                alt={item.title}
                className="object-contain h-auto"
                style={{ margin: 0 }}
              />

              <div className="
                hidden group-hover:flex
                absolute inset-0
                text-center
                backdrop-blur-sm
                justify-center items-center
                duration-200
              ">
                <Button
                  text="Thêm vào giỏ hàng"
                  bgColor="bg-primary"
                  textColor="text-white"
                />
              </div>
            </div>

            <h2 className="font-thin mt-2">{item.product_category_id.title}</h2>
            <h2 className="font-normal">{item.title}</h2>
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