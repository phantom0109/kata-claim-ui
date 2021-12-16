import Web3 from 'web3';
import { addresses, defaultChainId, rpcUrls } from './constants';
import Seedsale from './contracts/Seedsale';
import { BigNumber } from "bignumber.js";
import moment from "moment";

export const createWeb3 = (provider) => {

  var realProvider;

  if (typeof provider === 'string') {
    if (provider.includes('wss')) {
      realProvider = new Web3.providers.WebsocketProvider(
        provider
      );
    } else {
      realProvider = new Web3.providers.HttpProvider(
        provider
      );
    }
  } else {
    realProvider = provider;
  }

  return new Web3(realProvider);
}

export const getDefaultWeb3 = () => {
  return createWeb3(rpcUrls[defaultChainId]);
}

export const getDefaultContractOptions = () => {
  const web3 = getDefaultWeb3();
  return { 
    web3, 
    chainId: defaultChainId, 
    account: null 
  };
}

export const BntoNum = (value, decimal = 18) => {
  return new BigNumber(value).shiftedBy(-decimal).toNumber();
}

// export const NumToBn = (value, decimal = 18) => {
//   return new BigNumber(value).shiftedBy(decimal);
// }

export const toFixed = (num, digit) => {
  if (isNaN(num)) return 0;
  var fixed_num = Number(num).toFixed(digit)
  return Number(fixed_num.toString());
}

export const getDateStr = (tiemstamp) => {
  const dateObj = new Date(tiemstamp * 1000);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const output = month  + ' ' + day  + ', ' + year;
  return output;
}

// export const getTargetTime = (salesData) => {
//   if (!salesData) return {};

//   if (salesData.status === 2 || salesData.status === 3)
//     return { targetTime: null, timerTitle: "Seedsale Ended" };
//   else if (salesData.status === 1)
//     return { targetTime: salesData.endTime, timerTitle: "Seedsale is Live" };
//   else if (salesData.status === 0)
//     return { targetTime: salesData.startTime, timerTitle: "Seedsale starts soon" };
  
//   return {};
// }


export const getSeedsaleData = async () => {
  const seedsale = new Seedsale(getDefaultContractOptions(), addresses.Seedsale[defaultChainId]);

  const tgeTime = Number(await seedsale.call("tgeTime"));

  const tokenPrice = await seedsale.call("price");


  let currentTime = moment().unix();
  let status = 0;

  if (currentTime > tgeTime)
    status = 1;
  else
    status = 0;

  return {

    tokenPrice: Number(tokenPrice),
    status,
    tgeTime,

  };
}
