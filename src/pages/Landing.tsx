import { useContext, useCallback, useEffect } from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import { toFixed, getDateStr } from 'blockchain/utils';
import useClaimData from "hooks/useClaimData";
import { Web3ModalContext } from "contexts/Web3ModalProvider";
import LoaderSpinner from "react-loader-spinner";
import { NotificationManager } from 'react-notifications';
import { defaultChainId, networkNames } from "blockchain/constants";
import { tokenInfos } from 'blockchain/constants';
import useAccountData from 'hooks/useAccountData';
import SeedsaleBox from "components/SeedsaleBox";
import TeamBox from "components/TeamBox";
import AirdropBox from 'components/AirdopBox';
import TreasuryBox from 'components/TreasuryBox';
import DevelopmentBox from 'components/DevelopmentBox';
import MarketingBox from 'components/MarketingBox';
import PresaleBox from 'components/PresaleBox';

const Landing = () => {

  const accountData = useAccountData();
  const { connect, account } = useContext(Web3ModalContext);
  const claimData = useClaimData();
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
      {!claimData?(         
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
            <Row className="text-center">
                <h1 className="mt-5 mb-5 upper-text">
                  Katana Inu
                  &nbsp;Claim
                </h1>
            </Row>
            <Row className="text-center body-bg mt-2">
              <Col md={6} lg={4} className="katana">
                {!accountData.seedsalekataBalance ? (
                  claimData.status === 1 ? null :
                  (
                    <div className="justify-content-between px-5 mb-1">
                      <h2 className="font-weight-bold">Purchased: {toFixed(accountData.seedsalekataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                      <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                      <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                    </div>
                  )
                ) : (
                  <div className="pt-2 px-2">
                  <div className="text-white box pt-2 pe-4 ps-4">
                    <div className="mt-1">
                      <div className="mt-3"><h2>Seedsale Claim</h2></div>
                    </div>
                    <hr/>
                    {
                      !account ?
                      (
                        <div>
                            <div className="live-notice mt-3 mb-2">
                              <h1>Connect Wallet To Access Claim!</h1>
                            </div>
                            <Button className="btn-primary skew-btn px-2 py-2 my-3 mx-3" onClick={handleConnectWallet}>
                              CONNECT WALLET
                            </Button>
                        </div>
                      ):(
                        <>
                          {
                            claimData.status === 0 &&
                            <div className="justify-content-between px-5 mb-1">
                              <h2 className="font-weight-bold">Purchased: {toFixed(accountData.seedsalekataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                              <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                              <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                            </div>
                          }
                          {
                            claimData.status === 1 && 
                              <SeedsaleBox claimData={claimData}/>
                          }
                        </>
                      )
                    }
                  </div>
                </div>
                )
                }
              </Col>
              <Col md={6} lg={4} className="katana">
                {
                  !accountData.presalekataBalance ? (
                    claimData.status === 1 ? null : (
                      <div className="justify-content-between px-5 mb-1">
                        <h2 className="font-weight-bold">Purchased: {toFixed(accountData.presalekataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                        <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                        <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                      </div>
                    )
                  ) : (
                    <div className="pt-2 px-2">
                  <div className="text-white box pt-2 pe-4 ps-4">
                    <div className="mt-1">
                      <div className="mt-3"><h2>Presale Claim</h2></div>
                    </div>
                    <hr/>
                    {
                      !account ?
                      (
                        <div>
                            <div className="live-notice mt-3 mb-2">
                              <h1>Connect Wallet To Access Claim!</h1>
                            </div>
                            <Button className="btn-primary skew-btn px-2 py-2 my-3 mx-3" onClick={handleConnectWallet}>
                              CONNECT WALLET
                            </Button>
                        </div>
                      ):(
                        <>
                          {
                            claimData.status === 0 &&
                            <div className="justify-content-between px-5 mb-1">
                              <h2 className="font-weight-bold">Purchased: {toFixed(accountData.presalekataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                              <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                              <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                            </div>
                          }
                          {
                            claimData.status === 1 && 
                              <PresaleBox claimData={claimData}/>
                          }
                        </>
                      )
                    }
                  </div>
                </div>
                  )
                }
                
              </Col>
              <Col md={6} lg={4} className="katana">
                { !accountData.teamkataBalance ? (
                  claimData.status === 1 ? null : (
                    <div className="justify-content-between px-5 mb-1">
                      <h2 className="font-weight-bold">Purchased: {toFixed(accountData.teamkataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                      <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                      <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                    </div>
                  )
                ) : (
                  <div className="pt-2 px-2">
                  <div className="text-white box pt-2 pe-4 ps-4">
                    <div className="mt-1">
                      <div className="mt-3"><h2>Team Claim</h2></div>
                    </div>
                    <hr/>
                    {
                      !account ?
                      (
                        <div>
                            <div className="live-notice mt-3 mb-2">
                              <h1>Connect Wallet To Access Claim!</h1>
                            </div>
                            <Button className="btn-primary skew-btn px-2 py-2 my-3 mx-3" onClick={handleConnectWallet}>
                              CONNECT WALLET
                            </Button>
                        </div>
                      ):(
                        <>
                          {
                            claimData.status === 0 &&
                            <div className="justify-content-between px-5 mb-1">
                              <h2 className="font-weight-bold">Purchased: {toFixed(accountData.teamkataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                              <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                              <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                            </div>
                          }
                          {
                            claimData.status === 1 && 
                              <TeamBox claimData={claimData}/>
                          }
                        </>
                      )
                    }
                  </div>
                </div>
                )
                }       
              </Col>
            </Row>
            <Row className="text-center body-bg mt-5 mb-5">
              <Col md={6} lg={4} className="katana">
                { !accountData.airdropkataBalance ? (
                  claimData.status === 1 ? null : (
                    <div className="justify-content-between px-5 mb-1">
                      <h2 className="font-weight-bold">Purchased: {toFixed(accountData.airdropkataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                      <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                      <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                    </div>
                  )
                ) : (
                  <div className="pt-2 px-2">
                  <div className="text-white box pt-2 pe-4 ps-4">
                    <div className="mt-1">
                      <div className="mt-3"><h2>Airdrop Claim</h2></div>
                    </div>
                    <hr/>
                    {
                      !account ?
                      (
                        <div>
                            <div className="live-notice mt-3 mb-2">
                              <h1>Connect Wallet To Access Claim!</h1>
                            </div>
                            <Button className="btn-primary skew-btn px-2 py-2 my-3 mx-3" onClick={handleConnectWallet}>
                              CONNECT WALLET
                            </Button>
                        </div>
                      ):(
                        <>
                          {
                            claimData.status === 0 &&
                            <div className="justify-content-between px-5 mb-1">
                              <h2 className="font-weight-bold">Purchased: {toFixed(accountData.airdropkataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                              <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                              <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                            </div>
                          }
                          {
                            claimData.status === 1 && 
                              <AirdropBox claimData={claimData}/>
                          }
                        </>
                      )
                    }
                  </div>
                </div>
                )
                }  
              </Col>
              <Col md={6} lg={4} className="katana">
                {
                  !accountData.treasurykataBalance ? (
                    claimData.status === 1 ? null : (
                      <div className="justify-content-between px-5 mb-1">
                        <h2 className="font-weight-bold">Purchased: {toFixed(accountData.treasurykataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                        <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                      <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                    </div> )
                  ) : (
                    <div className="pt-2 px-2">
                  <div className="text-white box pt-2 pe-4 ps-4">
                    <div className="mt-1">
                      <div className="mt-3"><h2>Treasury Claim</h2></div>
                    </div>
                    <hr/>
                    {
                      !account ?
                      (
                        <div>
                            <div className="live-notice mt-3 mb-2">
                              <h1>Connect Wallet To Access Claim!</h1>
                            </div>
                            <Button className="btn-primary skew-btn px-2 py-2 my-3 mx-3" onClick={handleConnectWallet}>
                              CONNECT WALLET
                            </Button>
                        </div>
                      ):(
                        <>
                          {
                            claimData.status === 0 &&
                            <div className="justify-content-between px-5 mb-1">
                              <h2 className="font-weight-bold">Purchased: {toFixed(accountData.treasurykataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                              <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                              <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                            </div>
                          }
                          {
                            claimData.status === 1 && 
                              <TreasuryBox claimData={claimData}/>
                          }
                        </>
                      )
                    }
                  </div>
                </div>
                  )
                }
              </Col>
              <Col md={6} lg={4} className="katana">
                {
                  !accountData.developmentkataBalance ? (
                    claimData.status === 1 ? null : (
                      <div className="justify-content-between px-5 mb-1">
                        <h2 className="font-weight-bold">Purchased: {toFixed(accountData.developmentkataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                        <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                        <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                      </div>
                    )
                  ) : (
                    <div className="pt-2 px-2">
                  <div className="text-white box pt-2 pe-4 ps-4">
                    <div className="mt-1">
                      <div className="mt-3"><h2>Development Claim</h2></div>
                    </div>
                    <hr/>
                    {
                      !account ?
                      (
                        <div>
                            <div className="live-notice mt-3 mb-2">
                              <h1>Connect Wallet To Access Claim!</h1>
                            </div>
                            <Button className="btn-primary skew-btn px-2 py-2 my-3 mx-3" onClick={handleConnectWallet}>
                              CONNECT WALLET
                            </Button>
                        </div>
                      ):(
                        <>
                          {
                            claimData.status === 0 &&
                            <div className="justify-content-between px-5 mb-1">
                              <h2 className="font-weight-bold">Purchased: {toFixed(accountData.developmentkataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                              <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                              <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                            </div>
                          }
                          {
                            claimData.status === 1 && 
                              <DevelopmentBox claimData={claimData}/>
                          }
                        </>
                      )
                    }
                  </div>
                </div>
                  )
                }
              </Col>
            </Row>
            <Row className="text-center body-bg mb-5">
             <Col md={6} lg={4} className="katana">
              {
                !accountData.marketingkataBalance ? (
                  
                    claimData.status === 1 ? null :
                    <div className="justify-content-between px-5 mb-1">
                      <h2 className="font-weight-bold">Purchased: {toFixed(accountData.marketingkataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                      <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                      <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                    </div>
                  
                ) : (
                  <div className="pt-2 px-2">
                  <div className="text-white box pt-2 pe-4 ps-4">
                    <div className="mt-1">
                      <div className="mt-3"><h2>Marketing Claim</h2></div>
                    </div>
                    <hr/>
                    {
                      !account ?
                      (
                        <div>
                            <div className="live-notice mt-3 mb-2">
                              <h1>Connect Wallet To Access Claim!</h1>
                            </div>
                            <Button className="btn-primary skew-btn px-2 py-2 my-3 mx-3" onClick={handleConnectWallet}>
                              CONNECT WALLET
                            </Button>
                        </div>
                      ):(
                        <>
                          {
                            claimData.status === 0 &&
                            <div className="justify-content-between px-5 mb-1">
                              <h2 className="font-weight-bold">Purchased: {toFixed(accountData.marketingkataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                              <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                              <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                            </div>
                          }
                          {
                            claimData.status === 1 && 
                              <MarketingBox claimData={claimData}/>
                          }
                        </>
                      )
                    }
                  </div>
                </div>
                )
              }
              </Col>
            </Row>
        </Container>
         )
      }
    </>
  )
}

export default Landing;

