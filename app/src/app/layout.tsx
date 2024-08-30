import type { Metadata } from "next";
import { Actor } from "next/font/google";
import "./globals.css";
import { UseReduxprovider } from "@/lib/Redux/store";
import Navbar from "@/Layout/UI/Navbar";
import Footer from "@/Layout/UI/footer";

const inter = Actor({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "BlogUp : latest blogs on Technology",
  description: "Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UseReduxprovider>
          <Navbar />
          <div className="bg-bgSecondary">
            {children}
          </div>
          <Footer />
        </UseReduxprovider>
      </body>
    </html>
  );
}
