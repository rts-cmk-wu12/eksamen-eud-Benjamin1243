
import Link from "next/link";
import "./header.scss"

import logout from "@/actions/logout";
import { cookies } from "next/headers";

export default async function Header(){
 const cookieStore = await cookies()
 const userId = cookieStore.has("user_id")
  const pathname = ""
  
  

    console.log(pathname)
    return(
      <header className="header">
        <nav className="header__nav">
        <ul className="header__list"> 
        <li className="header__listItem">
        <Link className={  "header__link" } href="/"><img className="header__logo" src="/mainLogo.png" alt="" /></Link>
        </li>
        <li className="header__listItem"><Link href={"/"} className={ pathname == "/" ?  "header__link--active header__link": "header__link"  }>Listings</Link></li>
        <li className="header__listItem">{!userId ?<Link href={"/"} className="header__link">Community</Link>:<Link href={"/profile/items"} className={pathname == "/profile/items" ?  "header__link--active header__link": "header__link"}>Your Listings</Link> }</li>
        <li className="header__listItem"><Link href={"/contact"} className={ pathname == "/contact" ?  "header__link--active header__link": "header__link"  }>Contact</Link></li>
        <li className={ pathname == "/login" || pathname == "/profile" ?  "header__listItem header__listItem--buttonLook header__listItem--buttonLook--active": "header__listItem header__listItem--buttonLook"  } >{ !userId? <Link href={"/login"} className="header__link">Sign in</Link>:<Link href={"/profile"} className="header__link">Profile</Link> }</li>
        <li className="header__listItem header__listItem--buttonLookBlack">{!userId ?<Link href={"/register"} className="header__link">Register</Link>: <Link href={"/logout"} className="header__link">log ud</Link>}</li>



        </ul>
        </nav>
        </header>
    )
}