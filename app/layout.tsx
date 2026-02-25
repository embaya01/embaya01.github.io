import type { Metadata, Viewport } from "next"
import { Open_Sans, Raleway, Poppins } from "next/font/google"
import "./globals.css"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Elisee Mbaya | Portfolio",
  description:
    "Personal portfolio of Elisee Mbaya - AI Engineer.",
}

export const viewport: Viewport = {
  themeColor: "#040404",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${openSans.variable} ${raleway.variable} ${poppins.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
