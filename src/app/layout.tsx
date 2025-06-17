import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/global.scss";
import ThemeProvider from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health | Zadbaj o swoje zdrowie!",
  description:
    "Health oferuje Ci zestaw przydatnych narzędzi, które pomogą Tobie w codziennym kontrolowaniu swojego stanu zdrowia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="shortcut icon" href="logo-icon.svg" type="image/x-icon" />
      </head>
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex min-h-screen w-full items-start justify-center px-[30px]">
            <div id="contentWrapper" className="contentGrid grid w-screen max-w-[700px]">
              <Navigation />
              <div>{children}</div>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
