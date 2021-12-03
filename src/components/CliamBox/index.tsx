import { Button } from "react-bootstrap";
import useAccountData from 'hooks/useAccountData';
import LoaderSpinner from "react-loader-spinner";
import { toFixed, getDateStr } from 'blockchain/utils';
import { tokenInfos } from 'blockchain/constants';
import { useState, useCallback, useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import {Web3WrapperContext} from "contexts/Web3WrapperProvider";

const CliamBox = (props) => {

  const accountData = useAccountData();
  const { salesData } = props;
  const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);
  const [claimRequested, setClaimReqeusted] = useState<boolean>(false);
  
  const handleClaim = useCallback(async () => {
    if (!wrapper) return;
    if (isNaN(Number(accountData?.tokensAvailable)) || Number(accountData?.tokensAvailable) <= 0) {
      NotificationManager.error("If you still have remaining tokens to claim, please wait until the next unlock.", "Nothing to claim!");
      return;
    }
    setClaimReqeusted(true);
    const txHash = await wrapper.claim();
    setClaimReqeusted(false);
    if (!txHash) {
      NotificationManager.error('Claim Transaction Error');
      return;
    }
    
    NotificationManager.success(`${accountData?.tokensAvailable} ${tokenInfos.KATA.symbol} claimed`, 'Claim Success');

  }, [accountData, wrapper])
  
  const getClaimText = useCallback(() => {
    if (!accountData || !accountData.tokensAvailable) return "Nothing to Claim";
    return "Claim";
  }, [accountData])

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
          accountData.kataBalance? (
            salesData.status === 2 ? (
              <div className="justify-content-between px-5 mb-1">
                <h2 className="font-weight-bold">Purchased: {toFixed(accountData.kataBalance, 2)} {tokenInfos.KATA.symbol}</h2>
                <h3 className="no-cliam-start">$KATA starts being unlocked from</h3>
                <h3 className="no-cliam-start">{getDateStr(salesData.tgeTime)}</h3>
              </div>
            ):(
              <div className='mt-3 '>
                <div className="d-flex justify-content-between px-1 mb-1">
                  <h5 className="cliam-info">Purchased:</h5>
                  <h3 className="font-weight-bold cliam-color">{toFixed(accountData.kataBalance, 2)} {tokenInfos.KATA.symbol}</h3>
                </div>
                <div className="d-flex justify-content-between px-1 mb-1">
                    <h5 className="cliam-info">Claimed: </h5>
                    <h3 className="font-weight-bold text-right cliam-color"> {toFixed(accountData.claimed, 2)} $KATA</h3>
                </div>
                <div className="d-flex justify-content-between px-1 mb-1">
                    <h5>Now Claim: </h5>
                    <h3 className="font-weight-bold text-right cliam-now-color"> {toFixed(accountData.tokensAvailable, 2)} $KATA</h3>
                </div>

                <div className="py-4">
                <Button 
                    className="btn-primary skew-btn px-2 py-2"
                    onClick={handleClaim}
                    disabled={claimRequested}
                >
                    {claimRequested?"Claiming...":`${getClaimText()}`}
                </Button>
                </div>
              </div>
            )
          )
          :
          <h3 className="font-weight-bold no-kata-purchased">No $KATA you purchased</h3>
      )}
    </>
  )
}

export default CliamBox;
