import Header from "@/components/header/Header";
import "./globals.scss"
import FooterComponent from "@/components/footerComponent/FooterComponent";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <div id="wrapper">
        <Header></Header>
        <main>
        {children}
        </main>
        <FooterComponent></FooterComponent>
      </div>
      </body>
    </html>
  );
}
