import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "AbleSpace Task Manager",
  description: "Generated for AbleSpace Technical Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <StoreProvider>
              <div className="flex flex-1 flex-row">
                <Sidebar />
                <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto">{children}</main>
                </div>
              </div>
            </StoreProvider>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
