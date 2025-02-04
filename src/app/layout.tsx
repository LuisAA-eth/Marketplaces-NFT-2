import type { Metadata } from "next";
import Navbar from "./components/web/Navbar";

export const metadata: Metadata = {
  title: "Conquer Marketplace",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
