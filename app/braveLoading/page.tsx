'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import BraveLoading from '@/components/BraveLoading'

export default function LoadingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cardId = searchParams.get('card')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardId) {
        router.push(`/cards/${cardId}`)
      } else {
        router.push('/')
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [router, cardId])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 flex items-center justify-center"
    >
      <BraveLoading />
    </motion.div>
  )
}