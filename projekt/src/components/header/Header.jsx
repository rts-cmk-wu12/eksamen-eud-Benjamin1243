'use client'
import Link from "next/link";
import "./header.scss"
import { usePathname } from "next/navigation";
export default function Header(){
    const pathname = usePathname()
    console.log(pathname)
    return(
      <header className="header">
        <nav className="header__nav">
        <ul className="header__list"> 
        <li className="header__listItem">
        <Link className={  "header__link" } href="/"><img className="header__logo" src="/mainLogo.png" alt="" /></Link>
        </li>
        <li className="header__listItem"><Link href={"/"} className={ pathname == "/" ?  "header__link--active header__link": "header__link"  }>Listings</Link></li>
        <li className="header__listItem"><Link href={"/"} className="header__link">Community</Link></li>
        <li className="header__listItem"><Link href={"/"} className="header__link">Contact</Link></li>
        <li className="header__listItem header__listItem--buttonLook"><Link href={"/"} className="header__link">Sign in</Link></li>
        <li className="header__listItem header__listItem--buttonLookBlack"><Link href={"/"} className="header__link">Register</Link></li>



        </ul>
        </nav>
        </header>
    )
}