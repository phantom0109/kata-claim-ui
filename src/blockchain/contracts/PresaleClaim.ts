
import Contract from './Contract';
import abi from '../abis/PresaleClaim.json';

class PresaleClaim extends Contract {
  constructor(options, address) {
    super(options, "PresaleClaim", abi, address);
  }
}

export default PresaleClaim;