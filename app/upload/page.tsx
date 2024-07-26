'use client'

import { useState } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'
import imageCompression from 'browser-image-compression'
import { Card } from '@/types/card'

const Upload = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadedCards, setUploadedCards] = useState<Card[]>([])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const file = fileInput.files?.[0] || null;
    if (file) {
      const fileName = file.name.toLowerCase();
      const allowedExtensions = ['.jpg', '.jpeg', '.webp', '.svg', '.png'];
  
      const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
  
      if (!isValidExtension) {
        alert("Only files with extensions .jpg, .jpeg, .webp, .svg, .png are allowed");
        fileInput.value = '';
        return;
      }
  
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          fileType: 'image/png', // กำหนดให้บีบอัดเป็น PNG
        };
        const compressedFile = await imageCompression(file, options);
  
        // สร้างชื่อไฟล์ใหม่เป็น .png
        const newFileName = file.name.split('.').slice(0, -1).join('.') + '.png';
        const pngFile = new File([compressedFile], newFileName, { type: 'image/png' });
  
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(pngFile);
  
        setImage(pngFile);
      } catch (error) {
        console.error('Error compressing image', error);
      }
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      alert('กรุณาเลือกรูปภาพ')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('message', message)
    formData.append('image', image)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Uploaded image URL:', result.imageUrl) // เพิ่ม log เพื่อตรวจสอบ URL ของภาพที่อัพโหลด
        setUploadedCards(prevCards => [...prevCards, {
          id: result.id, // Assuming the API returns the ID of the uploaded card
          imageName: result.imageUrl,
          title: title,
          message: message,
        }])
        alert('อัพโหลดไพ่สำเร็จ')
        // รีเซ็ตฟอร์ม
        setTitle('')
        setMessage('')
        setImage(null)
        setImagePreview(null)
      } else {
        alert('เกิดข้อผิดพลาดในการอัพโหลด')
      }
    } catch (error) {
      console.error('Error uploading card:', error)
      alert('เกิดข้อผิดพลาดในการอัพโหลด')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            อัพโหลดไพ่ใหม่
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only">
                ชื่อไพ่
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="ชื่อไพ่"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                ข้อความ
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="ข้อความ"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              รูปภาพ
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      width={100}
                      height={100}
                      className="mx-auto object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>
                      {imagePreview ? "เปลี่ยนรูปภาพ" : "อัพโหลดรูปภาพ"}
                    </span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                      required={!imagePreview}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FiUpload
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              อัพโหลดไพ่
            </button>
          </div>
        </form>

        {/* แสดงไพ่ที่อัพโหลดแล้ว */}
        {uploadedCards.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">
              ไพ่ที่อัพโหลดแล้ว
            </h3>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {uploadedCards.map((card, index) => (
                <div key={index} className="border rounded-md p-2">
                  <img
                    src={card.imageName}
                    alt={card.title}
                    width={50}
                    height={50}
                    className="mx-auto"
                  />
                  <p className="text-xs text-center mt-1">{card.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload
