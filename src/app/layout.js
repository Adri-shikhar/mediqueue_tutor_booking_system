import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import ToastProvider from "@/components/Toast/ToastProvider";
import DynamicTitle from "@/components/layout/DynamicTitle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediQueue | Home",
  description: "Book tutors and manage learning sessions with MediQueue.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DynamicTitle />
        <Navbar />
        {children}
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
