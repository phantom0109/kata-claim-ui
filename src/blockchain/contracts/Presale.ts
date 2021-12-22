
import Contract from './Contract';
import abi from '../abis/Presale.json';

class Presale extends Contract {
  constructor(options, address) {
    super(options, "Presale", abi, address);
  }
}

export default Presale;