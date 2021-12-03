import { createContext, useEffect, useState, useContext } from 'react';
import Web3Wrapper from "../../blockchain/Web3Wrapper";
import { Web3ModalContext } from '../Web3ModalProvider';

interface IWeb3WrapperContext {
  web3Wrapper: Web3Wrapper | null;
}

export const Web3WrapperContext = createContext<IWeb3WrapperContext>({
  web3Wrapper: null
});

const Web3WrapperProvider = ({ children }) => {

  const { web3, chainId, account } = useContext(Web3ModalContext);
  const [web3Wrapper, setWeb3Wrapper] = useState<Web3Wrapper | null>(null);

  useEffect(() => {
    if (web3 && chainId && account) {
      try {
        const _web3Wrapper = new Web3Wrapper(web3, chainId, account);
        setWeb3Wrapper(_web3Wrapper);
      }
      catch(e) {
        console.log("Failed to create a Web3 Wrapper: ", e);
      }
    }
    else {
      setWeb3Wrapper(null);
    }
  }, [web3, chainId, account]);

  return (
    <Web3WrapperContext.Provider 
      value={{web3Wrapper}}>
      {children}
    </Web3WrapperContext.Provider>
  )
}

export default Web3WrapperProvider;