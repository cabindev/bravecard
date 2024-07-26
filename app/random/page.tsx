'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { register } from 'swiper/element/bundle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FaArrowLeft } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import cardData from '../data/cardData'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import BraveLoading from '@/components/BraveLoading'


register();

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        init?: string;
      };
      'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

type Card = {
  id: number
  imageName: string
  title: string
  message: string
}

export default function RandomPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  const swiperElRef = useRef<HTMLElement | null>(null);

  const shuffleArray = (array: Card[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const shuffledCards = shuffleArray([...cardData]);
    setCards(shuffledCards);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (swiperElRef.current && cards.length > 0) {
      // @ts-ignore
      Object.assign(swiperElRef.current, {
        slidesPerView: 'auto',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 24,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        mousewheel: true,
        loop: true,
        pagination: false,
        breakpoints: {
          0: {
            slidesPerView: 3,
            spaceBetween: 10,
            coverflowEffect: {
              rotate: 10,
              stretch: 0,
              depth: 50,
              modifier: 1,
            },
          },
          640: { 
            slidesPerView: 3, 
            spaceBetween: 20,
            coverflowEffect: {
              rotate: 15,
              stretch: 0,
              depth: 75,
              modifier: 1,
            },
          },
          768: { 
            slidesPerView: 4, 
            spaceBetween: 30 
          },
          1024: { 
            slidesPerView: 5, 
            spaceBetween: 100 
          },
        },
      });
      // @ts-ignore
      swiperElRef.current.initialize();
    }
  }, [cards]);

  const handleSelectCard = (cardId: number) => {
    const selectedCard = cards.find(card => card.id === cardId);
    if (selectedCard) {
      localStorage.setItem('selectedCard', JSON.stringify(selectedCard));
      setIsExiting(true);
      setTimeout(() => {
        router.push(`/braveLoading?card=${cardId}`);
      }, 500);
    }
  };

  const handleGoBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  if (isLoading) return <BraveLoading />;

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key="random-page"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="w-full min-h-screen bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100"
        >
          <div className="w-full font-serif px-4 py-8 md:py-12">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-pink-700 text-4xl md:text-5xl mb-4 md:mb-6 font-bold text-center"
            >
              อธิษฐาน
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-700 text-base sm:text-xl lg:text-2xl mb-6 md:mb-8 text-center"
            >
              หายใจอย่างอ่อนโยน แล้วเลือกไพ่รุ้งมา 1 ใบ
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <swiper-container
                ref={swiperElRef}
                init="false"
                className="w-full py-3 max-w-4xl mx-auto"
              >
                {cards.map((card) => (
                  <swiper-slide key={card.id} className="swiper-slide">
                    <div
                      className="bg-white border-white border-4 sm:border-8 lg:border-12 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-48 sm:h-64 md:h-80 w-full max-w-[180px] sm:max-w-xs mx-auto relative overflow-hidden"
                      onClick={() => handleSelectCard(card.id)}
                    >
                      <Image
                        src="/brave.png"
                        layout="fill"
                        objectFit="cover"
                        alt="Card back"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 hover:opacity-100 bg-black bg-opacity-50">
                        <div className="text-center">
                          <div className="bg-black bg-opacity-70 text-white py-2 px-4 rounded-full flex items-center space-x-2 mb-2">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-xl"
                            />
                            <span className="text-lg font-bold">
                              เลือกใบนี้
                            </span>
                          </div>
                          <div className="w-24 h-2 bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 rounded-full mx-auto mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </swiper-slide>
                ))}
              </swiper-container>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 md:mt-12 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                 inline-flex items-center justify-center
                  bg-gradient-to-r from-orange-400 to-pink-400 
                  text-white w-48 h-14 rounded-full 
                  text-xl shadow-lg 
                  hover:from-orange-500 hover:to-pink-500 
                  transition duration-300
  "
                onClick={handleGoBack}
              >
                <FaArrowLeft className="mr-2 text-lg" />
                <span>กลับหน้าแรก</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}