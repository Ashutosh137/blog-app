import type { Metadata } from "next";
import { Actor } from "next/font/google";
import "./globals.css";
import { UseReduxprovider } from "@/lib/Redux/store";
import Navbar from "@/Layout/UI/Navbar";
import Footer from "@/Layout/UI/footer";

const inter = Actor({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "BlogUp : latest blogs on Technology",
  description: "A modern, responsive blogging platform designed for seamless content creation and sharing. Create, edit, and manage your blogs with an intuitive interface, rich text editor, and advanced features for an enhanced reading and writing experience. Perfect for bloggers, writers, and content creators.",
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
          <div className="bg-bgSecondary max-w-5xl mx-auto">
            {children}
          </div>
          <Footer />
        </UseReduxprovider>
      </body>
    </html>
  );
}
