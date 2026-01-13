import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PortAwards - Developer Portfolio Ranking & Discovery",
    template: "%s | PortAwards",
  },
  description:
    "Showcase your developer portfolio, get ranked, and discover top talent. The premier platform for developer portfolio ranking and discovery.",
  keywords: [
    "developer portfolio",
    "portfolio ranking",
    "developer showcase",
    "tech talent",
    "hire developers",
  ],
  authors: [{ name: "PortAwards Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PortAwards",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${nunitoSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
