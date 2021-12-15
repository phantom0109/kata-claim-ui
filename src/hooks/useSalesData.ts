import { useCallback, useEffect, useState } from 'react';
import * as utils from '../blockchain/utils';

const useSalesData = () => {
 
  const [salesData, setSalesData] = useState<any>(null);

  const fetchSalesData = useCallback(async () => {
    try {
      const data = await utils.getSeedsaleData();
      setSalesData(data);
      if ((window as any).debugMode)
        console.log("Sales Data:", data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchSalesData();
    let refreshInterval = setInterval(fetchSalesData, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchSalesData]);

  return salesData;
}

export default useSalesData;
