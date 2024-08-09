import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LogoutButton } from "./profile/components/LogoutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Level System",
  description: "A simple level system made using Next.js and Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "flex flex-col min-h-screen p-12 bg-purple-700"}>
        <nav className="flex flex-row justify-between space-x-16 space-y-4 mb-16">
          <h3 className="text-4xl text-white">Gleetchy</h3>
          <div className="flex flex-row space-x-8">
            <Link href="/offers" className="hover:text-transparent transition duration-150">Offers</Link>
            <Link href="/stats" className="hover:text-transparent transition duration-150">Stats</Link>  
            <Link href="/profile" className="hover:text-transparent transition duration-150">Profile</Link>  
          <LogoutButton/>
          </div>
        </nav>
        {children}
        </body>
    </html>
  );
}
