import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer";
import "./globals.css";
import CategoryNavbar from "./components/CategoryNavbar";
import NavbarServerWrapper from "./components/NavbarServerWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Гали",
   description: "Gali tekstil – domaći brend posteljine, čaršava i peškira. Kvalitetna pamučna posteljina proizvedena u Srbiji.",
  keywords: ["posteljina", "gali tekstil", "čaršavi", "domaći tekstil", "peškiri", "gali posteljina", "posteljina beograd"],
    icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
   <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <NavbarServerWrapper />
        <CategoryNavbar />

        {/* Glavni sadržaj treba da raste i puni prostor */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
