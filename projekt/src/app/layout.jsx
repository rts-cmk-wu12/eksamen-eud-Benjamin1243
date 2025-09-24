"use server"
import Header from "@/components/header/Header";
import "./globals.scss"
import FooterComponent from "@/components/footerComponent/FooterComponent";
import { cookies } from "next/headers";


export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  return (
    <html lang="en">
      <body>
      <div id="wrapper">
        <Header userId={cookieStore?.has("user_id")}></Header>
        <main>
        {children}
        </main>
        <FooterComponent></FooterComponent>
      </div>
      </body>
    </html>
  );
}
