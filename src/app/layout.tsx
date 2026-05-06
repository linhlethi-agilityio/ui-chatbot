import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import {
  APP_METADATA_DESCRIPTION,
  APP_METADATA_TITLE,
} from "@/constants/app";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_METADATA_TITLE,
  description: APP_METADATA_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Background blobs */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
            <div className="blob -left-28 -top-24 bg-violet-500/14 blur-[78px]" />
            <div className="blob -bottom-24 -left-16 bg-indigo-600/16 blur-[78px]" />
            <div className="blob -right-24 top-1/4 bg-cyan-500/12 blur-[82px]" />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
