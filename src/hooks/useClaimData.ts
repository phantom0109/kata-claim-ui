import { useContext, useCallback, useEffect, useState } from 'react';
import * as utils from '../blockchain/utils';
import { Web3WrapperContext } from '../contexts/Web3WrapperProvider';

const useClaimData = () => {
  const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);

  const [claimData, setClaimData] = useState<any>(null);

  const fetchClaimData = useCallback(async () => {
    try {
      if (!wrapper) {
        setClaimData(null);
        return;
      }

      const data = await utils.getClaimData(wrapper?.chainId);
      setClaimData(data);
      if ((window as any).debugMode)
        console.log("Claim Data:", data);
    } catch (e) {
      console.log(e);
    }
  }, [wrapper]);

  useEffect(() => {
    fetchClaimData();
    let refreshInterval = setInterval(fetchClaimData, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchClaimData]);

  return claimData;
}

export default useClaimData;
