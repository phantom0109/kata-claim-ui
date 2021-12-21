import Web3 from 'web3';
import { addresses, tokenInfos } from './constants';
import ERC20 from "./contracts/ERC20";
import VestingContract from './contracts/VestingContract';
import { BntoNum } from './utils';
import moment from "moment";

export default class Web3Wrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;

    kataToken: ERC20;
    seedsaleVesting: VestingContract;
    TeamVesting: VestingContract;
    AirdropVesting: VestingContract;
    TreasuryVesting: VestingContract;
    DevelopmentVesting: VestingContract;
    MarketingVesting: VestingContract;
    PresaleVesting: VestingContract;

    constructor(web3, chainId, account, options = {}) {

        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account,
            ...options
        }

        this.kataToken = new ERC20(this.wrapperOptions, tokenInfos.KATA.address[this.chainId]);
       
        this.seedsaleVesting = new VestingContract(this.wrapperOptions, addresses.seedsaleVesting[this.chainId]);
        this.TeamVesting = new VestingContract(this.wrapperOptions, addresses.teamVesting[this.chainId]);
        this.AirdropVesting = new VestingContract(this.wrapperOptions, addresses.airdropVesting[this.chainId]);
        this.TreasuryVesting = new VestingContract(this.wrapperOptions, addresses.treasuryVesting[this.chainId]);
        this.DevelopmentVesting = new VestingContract(this.wrapperOptions, addresses.developmentVesting[this.chainId]);
        this.MarketingVesting = new VestingContract(this.wrapperOptions, addresses.marketingVesting[this.chainId]);
        this.PresaleVesting = new VestingContract(this.wrapperOptions,addresses.presaleVesting[this.chainId]);
    } 
    async getAccountData() {

        let currentTime = moment().unix();

        const seedsaleMember = await this.seedsaleVesting.getMember(this.account);
        const seedsalekataBalance = seedsaleMember.totalAmount;
        const seedsaleclaimed = seedsaleMember.claimedAmount;
        const seedsaleclaimable = await this.seedsaleVesting.call("claimableAmount",this.account,currentTime);

        const teamMember = await this.TeamVesting.getMember(this.account);
        const teamkataBalance = teamMember.totalAmount;
        const teamclaimed = teamMember.claimedAmount;
        const teamclaimable = await this.TeamVesting.call("claimableAmount",this.account,currentTime);
        
        const airdropMember = await this.AirdropVesting.getMember(this.account);
        const airdropkataBalance = airdropMember.totalAmount;
        const airdropclaimed = airdropMember.claimedAmount;
        const airdropclaimable = await this.AirdropVesting.call("claimableAmount",this.account,currentTime);

        const treasuryMember = await this.TreasuryVesting.getMember(this.account);
        const treasurykataBalance = treasuryMember.totalAmount;
        const treasuryclaimed = treasuryMember.claimedAmount;
        const treasuryclaimable = await this.TreasuryVesting.call("claimableAmount",this.account,currentTime);

        const developmentMember = await this.DevelopmentVesting.getMember(this.account);
        const developmentkataBalance = developmentMember.totalAmount;
        const developmentclaimed = developmentMember.claimedAmount;
        const developmentclaimable = await this.DevelopmentVesting.call("claimableAmount",this.account,currentTime);

        const marketingMember = await this.MarketingVesting.getMember(this.account);
        const marketingkataBalance = marketingMember.totalAmount;
        const marketingclaimed = marketingMember.claimedAmount;
        const marketingclaimable = await this.MarketingVesting.call("claimableAmount",this.account,currentTime);

        const presaleMember = await this.PresaleVesting.getMember(this.account);
        const presalekataBalance = presaleMember.totalAmount;
        const presaleclaimed = presaleMember.claimedAmount;
        const presaleclaimable = await this.PresaleVesting.call("claimableAmount",this.account,currentTime);
        return {

            seedsaleclaimed:BntoNum(seedsaleclaimed,tokenInfos.KATA.decimals),
            seedsalekataBalance:BntoNum(seedsalekataBalance,tokenInfos.KATA.decimals),
            seedsaleclaimable:BntoNum(seedsaleclaimable,tokenInfos.KATA.decimals),

            teamclaimed:BntoNum(teamclaimed,tokenInfos.KATA.decimals),
            teamkataBalance:BntoNum(teamkataBalance,tokenInfos.KATA.decimals),
            teamclaimable:BntoNum(teamclaimable,tokenInfos.KATA.decimals),

            airdropclaimed:BntoNum(airdropclaimed,tokenInfos.KATA.decimals),
            airdropkataBalance:BntoNum(airdropkataBalance,tokenInfos.KATA.decimals),
            airdropclaimable:BntoNum(airdropclaimable,tokenInfos.KATA.decimals),

            treasuryclaimed:BntoNum(treasuryclaimed,tokenInfos.KATA.decimals),
            treasurykataBalance:BntoNum(treasurykataBalance,tokenInfos.KATA.decimals),
            treasuryclaimable:BntoNum(treasuryclaimable,tokenInfos.KATA.decimals),

            developmentclaimed:BntoNum(developmentclaimed,tokenInfos.KATA.decimals),
            developmentkataBalance:BntoNum(developmentkataBalance,tokenInfos.KATA.decimals),
            developmentclaimable:BntoNum(developmentclaimable,tokenInfos.KATA.decimals),

            marketingclaimed:BntoNum(marketingclaimed,tokenInfos.KATA.decimals),
            marketingkataBalance:BntoNum(marketingkataBalance,tokenInfos.KATA.decimals),
            marketingclaimable:BntoNum(marketingclaimable,tokenInfos.KATA.decimals),

            presaleclaimed:BntoNum(presaleclaimed,tokenInfos.KATA.decimals),
            presalekataBalance:BntoNum(presalekataBalance,tokenInfos.KATA.decimals),
            presaleclaimable:BntoNum(presaleclaimable,tokenInfos.KATA.decimals),
        }
    }    

    async seedsaleclaim() {
        try {
            const tx = await this.seedsaleVesting.send("claim", null);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async teamclaim() {
        try {
            const tx = await this.TeamVesting.send("claim", null);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async airdropclaim() {
        try {
            const tx = await this.AirdropVesting.send("claim", null);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async treasuryclaim() {
        try {
            const tx = await this.TreasuryVesting.send("claim", null);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async developmentclaim() {
        try {
            const tx = await this.DevelopmentVesting.send("claim", null);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async marketingclaim() {
        try {
            const tx = await this.MarketingVesting.send("claim", null);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async presaleclaim() {
        try {
            const tx = await this.PresaleVesting.send("claim", null);
            return tx;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}