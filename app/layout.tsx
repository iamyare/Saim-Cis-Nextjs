import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@/components/theme-provider";
import PrelineScript from "@/components/PrelineScript";

export const metadata: Metadata = {
  title: "Saim Cis",
  description: "Saim Cis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
        <PrelineScript />
      </html>
    </>
  );
}
