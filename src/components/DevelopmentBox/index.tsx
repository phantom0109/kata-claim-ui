import { Button } from "react-bootstrap";
import useAccountData from 'hooks/useAccountData';
import LoaderSpinner from "react-loader-spinner";
import { toFixed } from 'blockchain/utils';
import { tokenInfos } from 'blockchain/constants';
import { useState, useCallback, useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import {Web3WrapperContext} from "contexts/Web3WrapperProvider";

const DevelopmentBox = (props) => {

  const accountData = useAccountData();
  const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);
  const [claimRequested, setClaimReqeusted] = useState<boolean>(false);
  
  const handleClaim = useCallback(async () => {
    if (!wrapper) return;
    if (isNaN(Number(accountData?.developmentclaimable)) || Number(accountData?.developmentclaimable) <= 0) {
      NotificationManager.error("If you still have remaining tokens to claim, please wait until the next unlock.", "Nothing to claim!");
      return;
    }
    setClaimReqeusted(true);
    const txHash = await wrapper.teamclaim();
    setClaimReqeusted(false);
    if (!txHash) {
      NotificationManager.error('Claim Transaction Error');
      return;
    }
    
    NotificationManager.success(`${accountData?.developmentclaimable} ${tokenInfos.KATA.symbol} claimed`, 'Claim Success');

  }, [accountData, wrapper])
  
  const getClaimText = useCallback(() => {
    if (!accountData || !accountData.developmentclaimable) return "Nothing to Claim";
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
          accountData.developmentkataBalance? (
              <div className='mt-3 '>
                <div className="d-flex justify-content-between px-1 mb-1">
                  <h5 className="claim-info">Purchased:</h5>
                  <h3 className="font-weight-bold claim-color">{toFixed(accountData.developmentkataBalance,2)} $KATA</h3>
                </div>
                <div className="d-flex justify-content-between px-1 mb-1">
                    <h5 className="claim-info">Claimed: </h5>
                    <h3 className="font-weight-bold text-right claim-color"> {toFixed(accountData.developmentclaimed, 2)} $KATA</h3>
                </div>
                <div className="d-flex justify-content-between px-1 mb-1">
                    <h5>Now Claim: </h5>
                    <h3 className="font-weight-bold text-right claim-now-color"> {toFixed(accountData.developmentclaimable, 2)} $KATA</h3>
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
          <h3 className="font-weight-bold no-kata-purchased">This account can't claim.</h3>
      )
      }
    </>
  )
}

export default DevelopmentBox;
