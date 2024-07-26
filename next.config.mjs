/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['swiper', 'ssr-window', 'dom7'],
    images: {
      domains: ['localhost'], // เพิ่มโดเมนที่คุณใช้สำหรับรูปภาพ
    },
  };
  
  export default nextConfig;