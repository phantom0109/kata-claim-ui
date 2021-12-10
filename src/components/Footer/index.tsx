import "./style.scss";

import {Link} from "react-router-dom";
import face from "../../assets/face.png";  
import Twitter from "../../assets/twitter.png";
import Exclude from "../../assets/Exclude.png";
import Telegram from "assets/telegram.png";
const Footer = () => {
    return (
        <div className="kata-footer pb-2">
            <div className = "d-flex align-items-center justify-content-center">
                <Link to={{ pathname: "https://www.facebook.com/katanainu.game" }} target="_blank" ><img src={face} alt="" className="kata-footer__icon" /></Link>
                <Link to={{ pathname: "http://www.twitter.com/katanainu" }} target="_blank" ><img src={Twitter} alt="" className="kata-footer__icon" /></Link>
                <Link to={{ pathname: "http://www.instagram.com/katanainu" }} target="_blank" ><img src={Exclude} alt="" className="kata-footer__icon" /></Link>
                <Link to={{ pathname: "http://www.t.me/katanainu" }} target="_blank" ><img src={Telegram} alt="" className="kata-footer__icon" /></Link>
            </div>
            <div className="kata-footer__text">
                ©2021 Quack Squad. All Rights Reserved	
            </div>
        </div>
    )
}

export default Footer;