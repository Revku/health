import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/global.scss";
import ThemeProvider from "@/components/theme-provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health 2.0",
  description: "Aplikacja do zarządzania zdrowiem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex min-h-screen w-full items-start justify-center">
            <div id="contentWrapper" className="w-screen max-w-[1000px]">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
