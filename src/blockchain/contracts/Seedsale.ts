
import Contract from './Contract';
import abi from '../abis/Seedsale.json';

class Seedsale extends Contract {
  constructor(options, address) {
    super(options, "Seedsale", abi, address);
  }
}

export default Seedsale;