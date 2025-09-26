
import Header from "@/components/header/Header";
import "./globals.scss"
import FooterComponent from "@/components/footerComponent/FooterComponent";
import { cookies } from "next/headers";



export const metadata = {
  title: {
    template: '%s | SwapHub',
    default: 'SwapHub', // a default is required when creating a template
  },
}
 

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()

  
 console.log(children)

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
