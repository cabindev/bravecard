'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CloudLoading from '@/components/CloudLoading'

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
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 flex flex-col items-center justify-center">
      <CloudLoading />
      <div className="text-center mt-8">
        <div className="text-gray-700 loading-dots font-serif text-xl md:text-3xl">
          <p>ไพ่รุ้งของคุณคือ<span>...</span></p>
        </div>
      </div>
    </div>
  )
}