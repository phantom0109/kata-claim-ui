import { useContext, useCallback, useEffect } from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import katanabg from "assets/katana-bg.png"
import { toFixed, getDateStr } from 'blockchain/utils';
import CliamBox from "components/CliamBox";
import useSalesData from "hooks/useSalesData";
import { Web3ModalContext } from "contexts/Web3ModalProvider";
import LoaderSpinner from "react-loader-spinner";
import { NotificationManager } from 'react-notifications';
import { defaultChainId, networkNames } from "blockchain/constants";
import { tokenInfos } from 'blockchain/constants';
import useAccountData from 'hooks/useAccountData';

const Landing = () => {

  const accountData = useAccountData();
  const { connect, account } = useContext(Web3ModalContext);
  const salesData = useSalesData();
  const { chainId } = useContext(Web3ModalContext);

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (chainId !== null && Number(chainId) !== Number(defaultChainId)) {
      NotificationManager.error(`Try on ${networkNames[defaultChainId]}`, "Wrong Network");
    }
  }, [chainId])

  return (
    <>
      {!salesData?(         
        <Container className="landing">
            <div className='page-loading'>
              <LoaderSpinner
                type="ThreeDots"
                color="#429B2B"
                height={100}
                width={100}
              />
            </div>
          </Container> 
          ):(
          <Container className="landing">
            <Row className="text-center body-bg">
              <Col md={12} lg={6} className="pt-5 px-5">
                <h1 className="mt-5 upper-text">
                  Katana Inu&nbsp;
                  <span>NFT-Gaming</span>
                  &nbsp;SeedSale
                </h1>
                <div className="pt-5 px-2">
                  <div className="mt-5 text-white">
                    <div className="mt-1">
                      <div className="mt-3 price"><h4>Current Price</h4></div>
                      <h3 className="mt-3 mb-5 font-weight-bold">1ETH = {toFixed(salesData.tokenPrice, 2)} $KATA</h3>
                    </div>
                    <hr/>
                    {
                      !account ?
                      (
                        <div>
                            <div className="live-notice mt-5 mb-2">
                              <h1>Connect Wallet To Access Seedsale!</h1>
                            </div>
                            <Button className="btn-primary skew-btn px-2 py-2 my-3 mx-3" onClick={handleConnectWallet}>
                              CONNECT WALLET
                            </Button>
                        </div>
                      ):(
                        <>
                          {
                            salesData.status === 0 &&
                            <div className="justify-content-between px-5 mb-1">
                              <h2 className="font-weight-bold">Purchased: {toFixed(accountData.kataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                              <h3 className="no-cliam-start">$KATA starts being unlocked from</h3>
                              <h3 className="no-cliam-start">{getDateStr(salesData.tgeTime)}</h3>
                            </div>
                          }
                          {
                            salesData.status === 1 && 
                              <CliamBox salesData={salesData}/>
                          }
                        </>
                      )
                    }
                  </div>
                </div>
              </Col>
              <Col md={12} lg={6} className="katana">
                <img src={katanabg} alt="" className="katana-img d-none d-sm-block" />

              </Col>
            </Row>
        </Container>
         )
      }
    </>
  )
}

export default Landing;

