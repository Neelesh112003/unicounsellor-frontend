import "./globals.css";
import Navbar from "./src/components/layout/Navbar";

export const metadata = {
  title: "UniCounsellor",
  description: "AI-powered university guidance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
