
import Contract from './Contract';
import abi from '../abis/ERC20.json';

class ERC20 extends Contract {
  constructor(options, address) {
    super(options, "ERC20" + address, abi, address);
  }
}

export default ERC20;