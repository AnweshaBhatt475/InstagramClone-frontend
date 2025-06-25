import React from 'react'
import img1 from '../../assets/lg-sg-1.jpg.jpeg' 
import img2 from '../../assets/lg-sg-2.jpg.jpeg' 

const Creative = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <p className="text-xl font-semibold text-gray-700 mb-8">Create your memories</p>
      
      <div className="flex flex-col gap-6 w-full items-center">
        <img src={img1} alt="img1" className="w-[300px] h-[200px] object-cover rounded-lg shadow-md" />
        <img src={img2} alt="img2" className="w-[300px] h-[200px] object-cover rounded-lg shadow-md" />
      </div>
    </div>
  )
}

export default Creative