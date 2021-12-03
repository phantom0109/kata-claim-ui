import "./style.scss";

import {Link} from "react-router-dom";
import face from "../../assets/face.png";  
import Twitter from "../../assets/twitter.png";
// import linkedin from "../../assets/linkedin.png";
import Exclude from "../../assets/Exclude.png";

const Footer = () => {
    return (
        <div className="kata-footer pb-2">
            <div className = "d-flex align-items-center justify-content-center">
                <Link to={{ pathname: "hhttps://www.facebook.com/Katanainu-104918325117822" }} target="_blank" ><img src={face} alt="" className="kata-footer__icon" /></Link>
                <Link to={{ pathname: "http://www.twitter.com/katanainu" }} target="_blank" ><img src={Twitter} alt="" className="kata-footer__icon" /></Link>
                {/* <Link to={{ pathname: "https://www.w3schools.com/" }} target="_blank" ><img src={linkedin} alt="" className="kata-footer__icon" /></Link> */}
                <Link to={{ pathname: "http://www.instagram.com/katanainu" }} target="_blank" ><img src={Exclude} alt="" className="kata-footer__icon" /></Link>
            </div>
            <div className="kata-footer__text">
                ©2021 Quack Squad. All Rights Reserved	
            </div>
        </div>
    )
}

export default Footer;