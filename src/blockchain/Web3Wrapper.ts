import Web3 from 'web3';
import { addresses, tokenInfos } from './constants';
import  Seedsale from "./contracts/Seedsale";
import ERC20 from "./contracts/ERC20";
import { BntoNum, NumToBn } from './utils';

export default class Web3Wrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;

    kataToken: ERC20;
    Seedsale: Seedsale;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account,
            ...options
        }

        this.kataToken = new ERC20(this.wrapperOptions, tokenInfos.KATA.address[this.chainId]);
        this.Seedsale = new Seedsale(this.wrapperOptions, addresses.Seedsale[this.chainId]);
    } 
    async getAccountData() {

        const kataBalance = await this.Seedsale.call("buyTokens", this.account);
        const ethBalacne = await this.web3.eth.getBalance(this.account);
        const tokensAvailable = await this.Seedsale.call("getClaimable");
        const claimed = await this.Seedsale.call("claimedTokens", this.account);

        return {
            kataBalance: BntoNum(kataBalance, tokenInfos.KATA.decimals),
            ethBalance: BntoNum(ethBalacne, tokenInfos.ETH.decimals),
            tokensAvailable: BntoNum(tokensAvailable, tokenInfos.KATA.decimals),
            claimed: BntoNum(claimed, tokenInfos.KATA.decimals)
        }
    }    

    async claim() {
        try {
            const tx = await this.Seedsale.send("claim", null);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}