import type { Metadata } from "next";
import { Inter ,Pridi} from "next/font/google";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
const pridi = Pridi({ 
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
});
export const metadata: Metadata = {
  title: 'ไพ่กล้า',
  description: 'แอพจับไพ่กล้าเพื่อรับกำลังใจและคำแนะนำ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${inter.className} ${pridi.className} bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}