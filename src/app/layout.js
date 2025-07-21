import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/Context";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quick Blog",
  description: "Quick blog by Prashant Timilsina",
  icons: {
    icon: "/blogicon4.png",
  },
  other: {
    "color-scheme": "light",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 `}
      >
        {" "}
        <UserProvider>
          <Navbar />
          {children}
          <Footer />

          <ToastContainer />
        </UserProvider>
      </body>
    </html>
  );
}
