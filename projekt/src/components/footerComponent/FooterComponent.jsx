import Link from "next/link";

export default function FooterComponent(){
    return(
        <footer className="footer">

            <div></div>
            <ul className="footer__list">
            <li className="footer__listItem"><h2 className="footer__listHeading">About SwapHub</h2></li>
            <li className="footer__listItem"><Link className="footer__link">How it works</Link></li>
            <li className="footer__listItem"><Link className="footer__link">Community guidelines</Link></li>
            <li className="footer__listItem"><Link className="footer__link">Our mission</Link></li>
            <li className="footer__listItem"><Link className="footer__link">Contact us</Link></li>
            </ul>

             <ul className="footer__list">
            <li className="footer__listItem"><h2 className="footer__listHeading">Discover</h2></li>
            <li className="footer__listItem"><Link className="footer__link">Browse categories</Link></li>
            <li className="footer__listItem"><Link className="footer__link">Popular Swaps</Link></li>
            <li className="footer__listItem"><Link className="footer__link">Successful stories</Link></li>
            <li className="footer__listItem"><Link className="footer__link">Upcoming events</Link></li>
            </ul>
              <ul className="footer__list">
            <li className="footer__listItem"><h2 className="footer__listHeading">Support</h2></li>
            <li className="footer__listItem"><Link className="footer__link">Help Center</Link></li>
            <li className="footer__listItem"><Link className="footer__link">FAQs</Link></li>
            <li className="footer__listItem"><Link className="footer__link">Safety tips</Link></li>
            <li className="footer__listItem"><Link className="footer__link">Report an issue</Link></li>
            </ul>

        </footer>
    )
}