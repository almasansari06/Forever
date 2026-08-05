import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT '} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Us" />
        
        <div className='flex flex-col justify-center items-start gap-6'>
          {/* Updated Heading to Corporate Head Office */}
          <p className='font-semibold text-xl text-gray-700 uppercase tracking-wide'>Corporate Head Office</p>
          
          <p className='text-gray-500 leading-relaxed'>
            Mindspace Building 12D, IT Park, Madhapur, <br /> 
            Hyderabad, Telangana 500081, India
          </p>
          
          <div className='text-gray-500 leading-relaxed space-y-1'>
            <p><span className='font-medium text-gray-700'>Tel:</span> +91 999915299</p>
            <p><span className='font-medium text-gray-700'>Tel:</span> +976 50-523-4444</p>
            <p><span className='font-medium text-gray-700'>Email:</span> forevernew@forever.com</p>
          </div>

          <p className='font-semibold text-xl text-gray-700 uppercase tracking-wide mt-2'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer active:scale-95'>
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
