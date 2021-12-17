import { useCallback, useEffect, useState } from 'react';
import * as utils from '../blockchain/utils';

const useClaimData = () => {
 
  const [claimData, setClaimData] = useState<any>(null);

  const fetchClaimData = useCallback(async () => {
    try {
      const data = await utils.getClaimData();
      setClaimData(data);
      if ((window as any).debugMode)
        console.log("Claim Data:", data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchClaimData();
    let refreshInterval = setInterval(fetchClaimData, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchClaimData]);

  return claimData;
}

export default useClaimData;
