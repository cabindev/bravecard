'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '@/components/PageTransition'

type Card = {
  id: number;
  imageName: string;
  title: string;
  message: string;
};

export default function AllCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get('/api/cards');
        const data = res.data;

        if (Array.isArray(data)) {
          setCards(data);
        } else {
          console.error('Invalid cards data:', data);
          setCards([]);
        }
      } catch (error) {
        console.error('Failed to fetch cards', error);
        setError('Failed to fetch cards');
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500 text-2xl">Error: {error}</div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-pink-700 text-3xl md:text-4xl font-bold mb-4 md:mb-0">ไพ่รุ้งทั้งหมด</h1>
          <Link href="/" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-pink-700 bg-white hover:bg-gray-50 hover:text-pink-800 transition p-2 px-4 rounded-full shadow-md flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              กลับหน้าแรก
            </motion.button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Image 
                  src={`/braveCards/${card.imageName}`} 
                  alt={`ไพ่รุ้ง - ${card.title}`} 
                  width={300} 
                  height={450} 
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 text-pink-700">{card.title}</h2>
                  <p className="text-gray-600 text-sm">{card.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageTransition>
  );
}