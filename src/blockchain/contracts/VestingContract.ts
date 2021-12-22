
import Contract from './Contract';
import abi from '../abis/VestingContract.json';
import { BigNumber } from "bignumber.js";

interface Member {
  account: string;
  totalAmount: BigNumber;
  claimedAmount: BigNumber;
  startTime: BigNumber;
  endTime: BigNumber;
}

class VestingContract extends Contract {
  constructor(options, address) {
    super(options, "VestingContract", abi, address);
  }
  
  getMember(addr) {
    return new Promise<Member>((resolve, reject) => {
      this.contract.methods["members"](addr).call({from: this.account})
        .then(resolve)
        .catch(reject)
    });
  }
}

export default VestingContract;