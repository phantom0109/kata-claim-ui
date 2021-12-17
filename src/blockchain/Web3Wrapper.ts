import Web3 from 'web3';
import { addresses, tokenInfos } from './constants';
import  Claim from "./contracts/Claim";
import ERC20 from "./contracts/ERC20";
import { BntoNum } from './utils';

export default class Web3Wrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;

    kataToken: ERC20;
    Claim: Claim;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account,
            ...options
        }

        this.kataToken = new ERC20(this.wrapperOptions, tokenInfos.KATA.address[this.chainId]);
        this.Claim = new Claim(this.wrapperOptions, addresses.Claim[this.chainId]);
    } 
    async getAccountData() {

        const kataBalance = await this.Claim.call("buyTokens", this.account)
        const ethBalacne = await this.web3.eth.getBalance(this.account);
        const tokensAvailable = await this.Claim.call("getClaimable");
        const claimed = await this.Claim.call("claimedTokens", this.account);

        return {
            kataBalance: BntoNum(kataBalance, tokenInfos.KATA.decimals),
            ethBalance: BntoNum(ethBalacne, tokenInfos.ETH.decimals),
            tokensAvailable: BntoNum(tokensAvailable, tokenInfos.KATA.decimals),
            claimed: BntoNum(claimed, tokenInfos.KATA.decimals)
        }
    }    

    async claim() {
        try {
            const tx = await this.Claim.send("claim", null);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}