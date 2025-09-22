import Header from "@/components/header/Header";
import "./globals.scss"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <div id="wrapper">
        <Header></Header>
        <main>
        {children}
        </main>
        <footer></footer>
      </div>
      </body>
    </html>
  );
}
