import Link from 'next/link'
import { FaRegImages, FaArrowRight } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100">
      <div className="text-center p-8 rounded-xl">
        <h1 className="text-5xl font-bold text-pink-600 mb-4">การ์ดกล้า</h1>
        <p className="text-3xl text-gray-700 mb-6">เชื่อมโยงกับคุณภาพดีๆ จากไพ่กล้า</p>
        <div className="flex flex-col items-center space-y-4">
          <Link 
            href="/random" 
            className="
              inline-flex items-center justify-center
              bg-gradient-to-r from-orange-400 to-pink-400 
              text-white w-40 h-14 rounded-full 
              text-xl shadow-lg 
              hover:from-orange-500 hover:to-pink-500 
              transition duration-300
            "
          >
            ต่อไป
            <FaArrowRight className="ml-2" />
          </Link>
          <Link 
            href="/all-cards" 
            className="
              inline-flex items-center justify-center
              bg-white text-pink-500 
              px-6 py-3 rounded-full 
              text-xl shadow-lg 
              border border-pink-500 
              hover:bg-pink-100 
              transition duration-300
              w-48
            "
          >
            <FaRegImages className="mr-2" />
            ดูไพ่ทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  )
}