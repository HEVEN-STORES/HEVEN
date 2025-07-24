import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewLetterBox from '../components/NewLetterBox'

const Contact = () => {
  function btnClick() {
        window.open("https://forms.gle/QaCkUCL1Wz42REKXA");
    }
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'> 
        <Title text1={'CONTACT'} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>

        <img src={assets.contact_img} className='w-full md:max-w-[480px]  ' alt="" />

        <div className='flex flex-col justify-center items-start gap-6 '>

          <p className='font-semibold text-xl text-gray-600 '> Our Store</p>
          <p className='text-gray-500 '>Near Dhullapally <br />Kompally Road, Secunderabad , Telangana</p>
          <p className='text-gray-500'>Tel: (+91) 6281874010 <br />Email: heven.storess@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Heven</p>
          <p className='text-gray-500 '>Learn more about our Teams And job Openings</p>

          <button onClick={btnClick} className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500  '>EXPLORE JOBS </button>
          <p></p>

        </div>

      </div>
      <NewLetterBox/>
    </div>
  )
}

export default Contact

