
import Contract from './Contract';
import abi from '../abis/Claim.json';

class Claim extends Contract {
  constructor(options, address) {
    super(options, "Claim", abi, address);
  }
}

export default Claim;