import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster, toast } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import ChatAssistant from "@/components/ai/ChatAssistant";
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MediStore — Your Trusted Online Pharmacy",
    template: "%s | MediStore",
  },
  description:
    "Get genuine medicines delivered to your doorstep. Browse 500+ verified medicines from trusted pharmacies with fast delivery and 24/7 support.",
  keywords: ["pharmacy", "medicine", "healthcare", "online medicine", "medistore"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster/>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ChatAssistant />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
