import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import "./footerComponent.scss"
import MainIcon from "../mainIcon/MainIcon";
export default function FooterComponent(){
    return(
        <footer className="footer">

            <div className="footer__list footer__list--div">
                <MainIcon></MainIcon>
                <div className="footer__iconFlex">
                    <FaXTwitter className="footer__socialIcon" />
                    <FaInstagram className="footer__socialIcon" />
                    <FaYoutube  className="footer__socialIcon" />
                    <FaLinkedin  className="footer__socialIcon" />





                </div>
            </div>
            <ul className="footer__list">
            <li className="footer__listItem"><h2 className="footer__listHeading">About SwapHub</h2></li>
            <li className="footer__listItem"><Link href={"/"} className="footer__link">How it works</Link></li>
            <li className="footer__listItem"><Link  href={"/"}className="footer__link">Community guidelines</Link></li>
            <li className="footer__listItem"><Link  href={"/"}className="footer__link">Our mission</Link></li>
            <li className="footer__listItem"><Link href={"/"} className="footer__link">Contact us</Link></li>
            </ul>

             <ul className="footer__list">
            <li className="footer__listItem"><h2 className="footer__listHeading">Discover</h2></li>
            <li className="footer__listItem"><Link  href={"/"} className="footer__link">Browse categories</Link></li>
            <li className="footer__listItem"><Link href={"/"} className="footer__link">Popular Swaps</Link></li>
            <li className="footer__listItem"><Link href={"/"} className="footer__link">Successful stories</Link></li>
            <li className="footer__listItem"><Link href={"/"} className="footer__link">Upcoming events</Link></li>
            </ul>
              <ul className="footer__list">
            <li className="footer__listItem"><h2 className="footer__listHeading">Support</h2></li>
            <li className="footer__listItem"><Link href={"/"} className="footer__link">Help Center</Link></li>
            <li className="footer__listItem"><Link href={"/"} className="footer__link">FAQs</Link></li>
            <li className="footer__listItem"><Link href={"/"} className="footer__link">Safety tips</Link></li>
            <li className="footer__listItem"><Link  href={"/"}className="footer__link">Report an issue</Link></li>
            </ul>

        </footer>
    )
}