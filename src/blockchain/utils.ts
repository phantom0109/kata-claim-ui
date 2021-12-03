import Web3 from 'web3';
import { addresses, defaultChainId, rpcUrls, tokenInfos } from './constants';
import Presale from './contracts/Presale';
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

export const NumToBn = (value, decimal = 18) => {
  return new BigNumber(value).shiftedBy(decimal);
}

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

export const getTargetTime = (salesData) => {
  if (!salesData) return {};

  if (salesData.status === 2 || salesData.status === 3)
    return { targetTime: null, timerTitle: "Presale Ended" };
  else if (salesData.status === 1)
    return { targetTime: salesData.endTime, timerTitle: "Presale is Live" };
  else if (salesData.status === 0)
    return { targetTime: salesData.startTime, timerTitle: "Presale starts soon" };
  
  return {};
}

export const getPercent = (salesData) => {
  if (!salesData) return 0;
  return toFixed(salesData.ethRaised / salesData.totalGoal * 100, 1);
}

export const getPresaleData = async () => {
  const presale = new Presale(getDefaultContractOptions(), addresses.Presale[defaultChainId]);

  const minInvestFund = await presale.call("minETHAmount");
  const maxInvestFund = await presale.call("maxETHAmount");

  const startTime = Number(await presale.call("startTime"));
  const endTime = Number(await presale.call("endTime"));    
  const tgeTime = Number(await presale.call("tgeTime"));

  const tokenPrice = await presale.call("price");
  const ethRaised = await presale.call("ethRaised");
  const totalGoal = await presale.call("fundingGoal");

  let currentTime = moment().unix();
  let status = 0;
  if (currentTime < startTime)
    status = 0;
  else if (currentTime < endTime)
    status = 1;
  else if (currentTime < tgeTime)
    status = 2;
  else
    status = 3;
  
  return {
    minInvestFund: BntoNum(minInvestFund, tokenInfos.ETH.decimals),
    maxInvestFund: BntoNum(maxInvestFund, tokenInfos.ETH.decimals),
    tokenPrice: Number(tokenPrice),
    ethRaised: BntoNum(ethRaised, tokenInfos.ETH.decimals),
    status,
    startTime,
    endTime,
    tgeTime,
    totalGoal: BntoNum(totalGoal, tokenInfos.ETH.decimals)
  };
}
