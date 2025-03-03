import React from 'react'
import Heading from '../Shared/Heading'

import Image1 from '../../assets/blogs/Ban-sao-6603b745ee58e573dace868cd0efb98373b6fa4d-1070x760-1-600x328.png';

const BlogData = [
    {
        title: "Sẵn sàng bùng nổ: Bộ sưu tập adidas x Deadpool & Wolverine chính thức ra mắt 1",
        subtitle: 'Sự kết hợp bất ngờ giữa siêu anh hùng và thể thao',
        published: "2025",
        image: Image1,
    }, 
    {
        title: "Sẵn sàng bùng nổ: Bộ sưu tập adidas x Deadpool & Wolverine chính thức ra mắt 2",
        subtitle: 'Sự kết hợp bất ngờ giữa siêu anh hùng và thể thao',
        published: "2025",
        image: Image1,
    },
    {
        title: "Sẵn sàng bùng nổ: Bộ sưu tập adidas x Deadpool & Wolverine chính thức ra mắt 3",
        subtitle: 'Sự kết hợp bất ngờ giữa siêu anh hùng và thể thao',
        published: "2025",
        image: Image1,
    },
    
]

const Blogs = () => {
  return (
    <div className='py-12'>
        <div className="container">
            {/* Header section */}
            <Heading title="Recent News" subtitle={"Explore Our Blogs"} />

            {/* Body section */}
            <div className='grid grid-cop-ls-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md-ga7'>
                {/* Blog card */}
                {
                    BlogData.map((data) => (
                        <div key={data.title} className='bg-white dark:bg-gray-900'>
                            {/* image section */}
                            <div className='overflow-hidden rounded-2xl mb-2' >
                                <img src={data.image} alt="" className='w-full h-[220px] object-cover rounded-2xl hover:2xl hover:scale-105 duration-500' />
                            </div>

                            {/* content section */}
                            <div className='space-y-2'>
                                <p className='text-xs text-gray-500 '>{data.published}</p>
                                <p className='font-bold line-clamp-1'>{data.title}</p>
                                <p className='line-clamp-2 text-sm text-gray-600 dark:text-gray-400'>{data.subtitle}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default Blogs