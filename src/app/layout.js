import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedNavbar from "@/components/Navbar/AnimatedNavbar";
import AnimatedFooter from "@/components/Footer/AnimatedFooter";
import AppProviders from "@/components/providers/AppProviders";
import DynamicTitle from "@/components/layout/DynamicTitle";
import ThemeScript from "@/components/layout/ThemeScript";
import PageTransition from "@/components/motion/PageTransition";

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col">
        <AppProviders>
          <DynamicTitle />
          <AnimatedNavbar />
          <PageTransition>{children}</PageTransition>
          <AnimatedFooter />
        </AppProviders>
      </body>
    </html>
  );
}
