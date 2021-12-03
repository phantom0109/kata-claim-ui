import "./style.scss";

import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useCallback } from "react";
import { ellipseAddress } from "utils/blockchain";
import { Web3ModalContext } from "contexts/Web3ModalProvider";

import Logo from "assets/katana-logo.png";
// import Search from "assets/search.png";

const Header = () => {

  const { connect, disconnect, account } = useContext(Web3ModalContext);

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <div className="kata-header d-flex justify-content-between">
      <div>
        <div>
          <img src={Logo} className="kata-header__logo" alt="Logo" />
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center">
        <div className='d-none d-sm-block '>
        <Link className="text-decoration-none" to={{ pathname: "https://katanainu.com/#gaming" }} target="_blank" >
          <span className="kata-header__link">GAMING</span>
        </Link>
        <Link className="text-decoration-none" to={{ pathname: "https://katanainu.com/#tokenomics" }} target="_blank" >
          <span className="kata-header__link">TOKENOMICS</span>
        </Link>
        <Link className="text-decoration-none" to={{ pathname: "https://katanainu.com/#why" }} target="_blank" >
          <span className="kata-header__link">WHY KATANA INU</span>
        </Link>
        <Link className="text-decoration-none" to={{ pathname: "https://katanainu.com/#roadmap" }} target="_blank" >
          <span className="kata-header__link">ROADMAP</span>
        </Link>
        <Link className="text-decoration-none" to={{ pathname: "https://katanainu.com/#contact" }} target="_blank" >
          <span className="kata-header__link">CONTACT</span>
        </Link>
        <Link className="text-decoration-none" to={{ pathname: "https://katanainu.com/faq" }} target="_blank" >
          <span className="kata-header__link">FAQ</span>
        </Link>
        </div>
      </div>
      <div className="d-flex pe-4">
          {!account ? (
            <Button className="kata-header__connect-wallet-btn mx-3 my-3" onClick={handleConnectWallet}>
              CONNECT WALLECT
            </Button>
          ) : (
            <Dropdown className="align-self-center">
              <Dropdown.Toggle className="kata-header__connect-wallet-btn">
                {ellipseAddress(account)}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDisconnectWallet}>Disconnect</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
    </div>
  )
}

export default Header;
