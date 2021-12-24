import { useContext, useCallback, useEffect } from 'react';
import { Container, Button } from "react-bootstrap";
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
import PrivatesaleBox from 'components/PrivatesaleBox';
import PresaleClaimBox from 'components/PresaleClaimBox';
import AdvisorBox from 'components/AdvisorBox';

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
      {!claimData || !accountData ?(
        <Container className="landing">
            <div className='page-loading text-center mt-5'>
              {/* <LoaderSpinner
                type="ThreeDots"
                color="#429B2B"
                height={100}
                width={100}
              /> */}
              <h1 className='connect-wallet-span'>Please connect your Wallet</h1>
            </div>
          </Container>
          ):(
          <div className="landing">
            <div className="text-center">
                <h1 className="mt-5 mb-5 upper-text">
                  Katana Inu Claim
                </h1>
            </div>
            <div className="text-center grid">

                { !accountData ? (
                  <LoaderSpinner
                    type="ThreeDots"
                    color="#429B2B"
                    height={30}
                    width={30}
                  />
                ) : (
                  !accountData.seedsalekataBalance ? null
                    : (
                            <div className="katana">
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
                     </div>
                 )
                )
                }


                { !accountData ? (
                  <LoaderSpinner
                    type="ThreeDots"
                    color="#429B2B"
                    height={30}
                    width={30}
                   />
                ) : (
                  !accountData.privatesalekataBalance ? null : (
                        <div className="katana">
                    <div className="pt-2 px-2">
                  <div className="text-white box pt-2 pe-4 ps-4">
                    <div className="mt-1">
                      <div className="mt-3"><h2>Privatesale Claim</h2></div>
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
                              <h2 className="font-weight-bold">Purchased: {toFixed(accountData.privatesalekataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                              <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                              <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                            </div>
                          }
                          {
                            claimData.status === 1 &&
                              <PrivatesaleBox claimData={claimData}/>
                          }
                        </>
                      )
                    }
                  </div>
                </div>
                      </div>
                  )
                )
                }



                { !accountData ? (
                  <LoaderSpinner
                    type="ThreeDots"
                    color="#429B2B"
                    height={30}
                    width={30}
                  />
                ) : (
                  !accountData.presaleclaimkataBalance ? null : (
                        <div className="katana">
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
                                <h2 className="font-weight-bold">Purchased: {toFixed(accountData.presaleclaimkataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                                <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                                <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                              </div>
                            }
                            {
                              claimData.status === 1 &&
                                <PresaleClaimBox claimData={claimData}/>
                            }
                          </>
                        )
                      }
                    </div>
                  </div>
                    </div>
                  )
                )

                }




                {!accountData ? (
                  <LoaderSpinner
                    type="ThreeDots"
                    color="#429B2B"
                    height={30}
                    width={30}
                  />
                ) : (
                  !accountData.airdropkataBalance ? null : (
                      <div className="katana">
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
                  </div>
                  )
                )
                }


                { !accountData ? (
                  <LoaderSpinner
                    type="ThreeDots"
                    color="#429B2B"
                    height={30}
                    width={30}
                  />
                ) : (
                  !accountData.treasurykataBalance ? null: (
                      <div className="katana">
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
                  </div>
                  )
                )
                }


                { !accountData ? (
                  <LoaderSpinner
                    type="ThreeDots"
                    color="#429B2B"
                    height={30}
                    width={30}
                  />
                ) : (
                  !accountData.developmentkataBalance ? null : (
                      <div className="katana">
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
                    </div>
                  )
                )
                }

                { !accountData ? (
                  <LoaderSpinner
                    type="ThreeDots"
                    color="#429B2B"
                    height={30}
                    width={30}
                  />
                ) : (
                  !accountData.advisorkataBalance ? null : (
                      <div className="katana">
                    <div className="pt-2 px-2">
                  <div className="text-white box pt-2 pe-4 ps-4">
                    <div className="mt-1">
                      <div className="mt-3"><h2>Advisor Claim</h2></div>
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
                              <h2 className="font-weight-bold">Purchased: {toFixed(accountData.advisorkataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                              <h3 className="no-claim-start">$KATA starts being unlocked from</h3>
                              <h3 className="no-claim-start">{getDateStr(claimData.tgeTime)}</h3>
                            </div>
                          }
                          {
                            claimData.status === 1 &&
                              <AdvisorBox claimData={claimData}/>
                          }
                        </>
                      )
                    }
                  </div>
                </div>
                    </div>
                  )
                )
                }   


              { !accountData ? (
                <LoaderSpinner
                  type="ThreeDots"
                  color="#429B2B"
                  height={30}
                  width={30}
                />
              ) : (
                !accountData.marketingkataBalance ? null : (
                  <div className="katana">
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
                  </div>
                )
              )
              }


                { !accountData ? (
                  <LoaderSpinner
                    type="ThreeDots"
                    color="#429B2B"
                    height={30}
                    width={30}
                  />
                ) : (
                  !accountData.teamkataBalance ? null : (
                    <div className="katana">
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
                    </div>
                  )
                )

                }

            </div>
        </div>
         )
      }
    </>
  )
}

export default Landing;
