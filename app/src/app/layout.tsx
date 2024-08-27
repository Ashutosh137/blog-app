import type { Metadata } from "next";
import { Stardos_Stencil } from "next/font/google";
import "./globals.css";
import { UseReduxprovider } from "@/Redux/store";
import Navbar from "@/Layout/UI/Navbar";
import Footer from "@/Layout/UI/footer";

const inter = Stardos_Stencil({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "blog app",
  description: "Generated by create next app",
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
          <Footer/>
        </UseReduxprovider>
      </body>
    </html>
  );
}
