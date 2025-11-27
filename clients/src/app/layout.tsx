import "../styles/globals.css";
import Navbar from "@/components/Navbar";

import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})

export const metadata = {
  title: "Gallery Post",
  description: "Photo upload and gallery app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen transition-colors">
        <Navbar />
        <div className="pt-4">{children}</div>
      </body>
    </html>
  );
}