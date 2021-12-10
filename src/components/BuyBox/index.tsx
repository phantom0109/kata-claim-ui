
import ETH from "assets/eth.svg";
import { Button, Form } from "react-bootstrap";
import useAccountData from '../../hooks/useAccountData';
import { toFixed } from '../../blockchain/utils';
import LoaderSpinner from "react-loader-spinner";
import { useState, useCallback, useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import {Web3WrapperContext} from "../../contexts/Web3WrapperProvider";
import { tokenInfos } from '../../blockchain/constants';

const BuyBox = (props) => {
  
  const accountData = useAccountData();
  const {salesData} = props;
  const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);
  const [ethAmount, setEthAmount] = useState<string>("0");
  const [buyRequested, setBuyReqeusted] = useState<boolean>(false);

  const handleChange = (e) => {
    setEthAmount(e.target.value);
  } 

  const handleMaxClick = useCallback(() => {
    if (!buyRequested && accountData)
      setEthAmount(accountData.ethBalance)
  }, [accountData, buyRequested])

  const calcTokenAmount = useCallback(() => {
    if (isNaN(Number(ethAmount))) return 0;
    return salesData.tokenPrice * Number(ethAmount);
  }, [ethAmount, salesData]);

  const handleBuy = useCallback(async () => {
    if (buyRequested || !accountData || !salesData) return;
    if (ethAmount === "" || isNaN(Number(ethAmount)) || Number(ethAmount) <= 0) {
      NotificationManager.error("Invalid ETH amount.");
      return;
    }
    if (Number(ethAmount) < Number(salesData.minInvestFund)) {
      NotificationManager.error(`Minimum investment fund is ${salesData.minInvestFund} ETH`);
      return;
    }
    if (Number(ethAmount) > Number(salesData.maxInvestFund)) {
      NotificationManager.error(`Maximum investment fund is ${salesData.maxInvestFund} ETH`);
      return;
    }
    if (Number(ethAmount) > Number(accountData.ethBalance)) {
      NotificationManager.error("Insufficient ETH balance.");
      return;
    }
    const left = (Number(salesData.totalGoal) - Number(salesData.ethRaised));
    if (Number(ethAmount) > left) {
      NotificationManager.error(`Your investment is over cap. ${toFixed(left, 4)} ETH left for this sales.`);
      return;
    }
    setBuyReqeusted(true);
    const txHash = await wrapper?.buy(ethAmount);
    setBuyReqeusted(false);
    if (!txHash) {
      NotificationManager.error('Buy Transaction Error');
      return;
    }
    
    NotificationManager.success(`${calcTokenAmount()} ${tokenInfos.KATA.symbol} purchased`, 'Purchase Success');
    setEthAmount("0");

  }, [ethAmount, wrapper, accountData, salesData, calcTokenAmount, buyRequested])

  return (
    <>
    {!accountData ? (
      
      <LoaderSpinner
          type="ThreeDots"
          color="#FEA604"
          height={30}
          width={30}
      />
     
    ):(
      <div className="mt-3">
        <div className="d-flex justify-content-between px-5 mb-1">
          <h4 className="font-weight-bold">Balance:</h4>
          <h4 className="font-weight-bold">{toFixed(accountData.kataBalance, 2)}</h4>
        </div>
        
        <div className=" d-flex justify-content-end px-5 mb-3">
          <div className="input_sec d-flex align-items-center">
            <img className="px-2" src={ETH} alt="" height="30px" />
            <h3 className="font-weight-bold pe-2 pt-1">ETH</h3>
          </div>
        </div>
  
        <div className="px-5 mb-3 text-right">
          <Form.Control 
            type="text" 
            onChange={handleChange}
            value={ethAmount}
            className="custom_input text-right"
            disabled={buyRequested}
          />
        </div>
  
        <div className=" d-flex justify-content-between px-5">
          <div><h6 className="tokenAmount">={calcTokenAmount()} $KATA</h6></div>
          <div>
            <h6 
              className="font_avertastd_regular font-weight-normal max-eth"
              onClick={handleMaxClick}
              style={{ cursor: buyRequested?"auto":"pointer" }}
            >
              MAX: {toFixed(accountData.ethBalance, 4)}
              </h6>
          </div>
        </div>
  
        <div className="py-4">
          <Button className="btn-primary skew-btn px-2 py-2"
            onClick={handleBuy}
            disabled={buyRequested}
          >
            { buyRequested?"PURCHASING...":"PURCHASE" }
          </Button>
        </div>
  
      </div>
    )
    }
    </>
  );
} 
export default BuyBox;
            