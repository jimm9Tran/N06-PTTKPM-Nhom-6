import React from 'react';

import {
  FaCarSide,
  FaHeadphonesAlt,
  FaWallet,
  FaCheckCircle,
} from "react-icons/fa";

const ServiceData = [
  {
    id: 1,
    icon: <FaCarSide className='text-4xl md:text-5xl text-primary' />,
    title: "Giao hàng miễn phí",
    description: "Miễn phí giao hàng cho mọi đơn hàng",
  },
  {
    id: 2,
    icon: <FaCheckCircle className='text-4xl md:text-5xl text-primary' />,
    title: "An tâm mua sắm",
    description: "Hoàn tiền trong 15 ngày",
  },
  {
    id: 3,
    icon: <FaWallet className='text-4xl md:text-5xl text-primary' />,
    title: "Thanh toán an toàn",
    description: "Tất cả giao dịch được bảo mật",
  },
  {
    id: 4,
    icon: <FaHeadphonesAlt className='text-4xl md:text-5xl text-primary' />,
    title: "Hỗ trợ trực tuyến 24/7",
    description: "Hỗ trợ kỹ thuật 24/7",
  }
];


const Servies = () => {
  return (
    <div>
      <div className="container my-14 md:my-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
          {
            ServiceData.map((data) => (
              <div className='flex flex-col items-start sm:flex-row gap-4'>
                {data.icon}
                <div>
                  <h1 className='lg:text-xl font-bold'>{data.title}</h1>
                  <h1 className='text-gray-400 text-sm'>{data.description}</h1>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Servies