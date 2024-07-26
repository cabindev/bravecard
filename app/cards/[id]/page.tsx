'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleDown, faInfoCircle, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import cardData from '@/app/data/cardData'
import { motion, AnimatePresence } from 'framer-motion'
import BraveLoading from '@/components/BraveLoading'

type Card = {
  id: number
  imageName: string
  title: string
  message: string
}

export default function CardPage({ params }: { params: { id: string } }) {
  const [card, setCard] = useState<Card | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [cardTitle, setCardTitle] = useState<string>('');
  const router = useRouter()

  useEffect(() => {
    const cardId = parseInt(params.id)
    const selectedCard = cardData.find(c => c.id === cardId)
    if (selectedCard) {
      setCard(selectedCard)
      setIsLoading(false)
      setTimeout(() => {
        setIsRevealed(true)
        setCardTitle(selectedCard.title)
      }, 1000)
    } else {
      setError('ไม่พบไพ่ที่เลือก')
      setIsLoading(false)
    }
  }, [params.id])
  
  const handleDownload = () => {
    if (card) {
      const link = document.createElement('a')
      link.href = `/braveCards/${card.imageName}`
      link.download = `ไพ่รุ้ง-${cardTitle}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 180 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      rotateY: -180, 
      transition: { duration: 0.5, ease: "easeIn" } 
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  if (isLoading) return <BraveLoading />

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center py-10 text-red-500">
          <h2 className="text-2xl font-bold mb-4">เกิดข้อผิดพลาด</h2>
          <p>{error}</p>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            onClick={() => router.push('/random')}
          >
            กลับไปเลือกไพ่ใหม่
          </motion.button>
        </div>
      </div>
    )
  }

  if (!card) return null

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-pink-700 text-3xl sm:text-4xl md:text-5xl mb-8 font-bold text-center"
        >
          ไพ่กล้าของคุณ
        </motion.h1>
        <AnimatePresence mode="wait">
          <motion.div 
            key={card.id}
            className="card-container w-64 h-96 sm:w-72 sm:h-108 md:w-80 md:h-120 mb-8"
            variants={cardVariants}
            initial="hidden"
            animate={isRevealed ? "visible" : "hidden"}
            exit="exit"
          >
            <Image
              src={`/braveCards/${card.imageName}`}
              alt={`ไพ่รุ้ง - ${card.title}`}
              layout="fill"
              objectFit="cover"
              className="rounded-3xl shadow-lg"
            />
          </motion.div>
        </AnimatePresence>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-xl sm:text-2xl text-gray-700 mb-6"
        >
          คุณได้ไพ่ "
          <span className="font-bold text-pink-600">{cardTitle}</span>"
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 xl:mt-8 mx-auto max-w-xl">
          <div className="mb-4 sm:mb-0 sm:mr-4">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleDownload}
              className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 px-4 text-sm shadow-md hover:from-pink-600 hover:to-orange-600 transition duration-300 rounded-full flex items-center"
            >
              <FontAwesomeIcon
                icon={faArrowCircleDown}
                className="mr-2"
                width="16"
                height="16"
              />
              <span>ดาวน์โหลด</span>
            </motion.button>
          </div>
          <div className="flex">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => router.push("/about")}
              className="bg-white hover:bg-gray-50 transition py-3 px-4 text-pink-700 hover:text-pink-800 text-sm shadow-md rounded-l-full flex items-center"
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="mr-2"
                width="16"
                height="16"
              />
              <span className="whitespace-nowrap">เกี่ยวกับไพ่รุ้ง</span>
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => router.push("/random")}
              className="bg-white hover:bg-gray-50 transition py-3 px-4 text-pink-700 hover:text-pink-800 text-sm shadow-md rounded-r-full flex items-center border-l border-gray-200"
            >
              <FontAwesomeIcon
                icon={faRedoAlt}
                className="mr-2"
                width="16"
                height="16"
              />
              <span className="whitespace-nowrap">จับไพ่ใหม่</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}