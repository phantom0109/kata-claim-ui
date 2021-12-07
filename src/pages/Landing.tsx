import { useContext, useCallback, useEffect} from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import katanabg from "assets/katana-bg.png"
import { toFixed, getPercent, getTargetTime } from 'blockchain/utils';
import BuyBox from "components/BuyBox";
import CliamBox from "components/CliamBox";
import TimeCounter from "components/TimeCounter";
import useSalesData from "hooks/useSalesData";
import { Web3ModalContext } from "contexts/Web3ModalProvider";
import LoaderSpinner from "react-loader-spinner";
import { NotificationManager } from 'react-notifications';
import { defaultChainId, networkNames } from "blockchain/constants";

const Landing = () => {

  const { connect, account } = useContext(Web3ModalContext);
  const salesData = useSalesData();
  const percent = getPercent(salesData);
  const { targetTime, timerTitle} = getTargetTime(salesData);
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
                color="#FEA604"
                height={100}
                width={100}
              />
            </div>
          </Container> 
          ):(
          <Container className="landing">
            <Row className="text-center body-bg">
              <Col md={12} lg={6} className="pt-5 px-5">
                <h1 className="upper-text">
                  Katana Inu&nbsp;
                  <span>NTF-Gaming</span>
                  &nbsp;PreSale
                </h1>
                <div className="pt-4 px-2">
                  <div className="text-center upper-text"><h3>{timerTitle}</h3></div>
                  <TimeCounter timeTillDate={targetTime} />
                  <div className="mt-5 text-white">
                    <div>
                      <div className="progress-bar p-1">
                        <div className="bar" style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                    <div className="mt-1">
                      <h4 className="mt-3 font-weight-bold contribution-span">Progress: {percent}%</h4>
                      <h3 className="font-weight-bold BNB-span">{toFixed(salesData.ethRaised, 2)} ETH / {toFixed(salesData.totalGoal,2)}</h3>
                      <div className="mt-3">Current Price</div>
                      <h3 className="mt-2 font-weight-bold">1ETH = {toFixed(salesData.tokenPrice, 2)}$KATA</h3>
                      <div className="invest-range my-3 d-flex justify-content-between">
                        <div className="d-inline float-left"><h6>min: {salesData.minInvestFund} ETH</h6></div>
                        <div className="d-inline float-right"><h6>max: {salesData.maxInvestFund} ETH</h6></div>
                      </div>
                    </div>
                    <hr/>
                    {
                      !account ?
                      (
                        <div>
                            <div className="live-notice mt-3">
                              Connect Wallet To Access Presale!
                            </div>
                            <Button className="btn-primary skew-btn px-2 py-2 my-3 mx-3" onClick={handleConnectWallet}>
                              CONNECT WALLECT
                            </Button>
                        </div>
                      ):(
                        <>
                          {
                            salesData.status === 0 &&
                            <div>
                              <h3 className="no-presale-start">Presale not started yet</h3>
                            </div>
                          }
                          {
                            salesData.status === 1 && 
                              <BuyBox salesData={salesData}/>
                          }
                          {
                            (salesData.status === 2 || salesData.status === 3) && 
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

