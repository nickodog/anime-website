import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import Scroll from "@/components/Scroll";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Scroll/>
      <body className={`bg-[#1E232A] ${inter.className} size-full`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
