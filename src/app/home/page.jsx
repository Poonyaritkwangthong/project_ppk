import React from 'react';
import ImageSlider from '../components/imagesslider';
import Content from '../components/content';
import Appbar from '../components/appbar';



export default function page() {
  return (
    <div>
          <Appbar />
      <div>
        <div className=''>
          <img className='w-[10rem] mx-auto mt-5' src='https://www.ppkhosp.go.th/images/logoppk.png' alt='' />
        </div>
        <div className='flex gap-3 text-4xl  justify-center text-[#20a68a]'>
          <h1>โรงพยาบาลพระปกเกล้า</h1>
          <h2>Phrapokklao Hospital</h2>
        </div>
        <div className='w-[100rem] mx-auto'>
          <p className='text-center text-gray-500 font-bold'>โทร: 0-39-319666 | Fax: 0-39-311511 | Mail: ppkhosp.go.th@gmail.com</p>
          <div className="bg-white border-t-2 border-[#20a68a] w-[80rem] h-full mx-auto ">
          <ImageSlider />
          <Content />
          </div>
        </div>
      </div>
    </div>
  )
}
