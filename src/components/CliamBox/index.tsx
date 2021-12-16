import { Button } from "react-bootstrap";
import useAccountData from 'hooks/useAccountData';
import LoaderSpinner from "react-loader-spinner";
import { toFixed } from 'blockchain/utils';
import { tokenInfos } from 'blockchain/constants';
import { useState, useCallback, useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import {Web3WrapperContext} from "contexts/Web3WrapperProvider";

const CliamBox = (props) => {

  const accountData = useAccountData();
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
            color="#429B2B"
            height={30}
            width={30}
        />
        
      ):(
          accountData.kataBalance? (
              <div className='mt-3 '>
                <div className="d-flex justify-content-between px-1 mb-1">
                  <h5 className="cliam-info">Purchased:</h5>
                  <h3 className="font-weight-bold cliam-color">{toFixed(accountData.kataBalance ,2)}</h3>
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
          :
          <h3 className="font-weight-bold no-kata-purchased">This account is not whitelisted.</h3>
      )}
    </>
  )
}

export default CliamBox;
