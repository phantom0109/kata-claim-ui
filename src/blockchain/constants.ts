export const defaultChainId = 42;

export const rpcUrls = {
  1337: 'http://localhost:8545',
  42: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/',
}

export const networkNames = {
  // 1: 'Ethereum Mainnet',
  1337: 'Localhost8545',
  42: 'Kovan Test Network',
  1: 'Ethereum Mainnet'
}

export const addresses = {
  Presale: {
    1337: '0x607DA9BCa16c2c20Fb17DAA70AC184B2B4Bbc79A',
    42: '0x20D21b2319c023c7467A3f19ad81f8d1DcEAdF56',
  },
}

export const tokenInfos = {

  ETH: {
    name: "Ethereum Coin",
    symbol: "ETH",
    decimals: 18
  },


  KATA: {
    name: 'KATA',
    symbol: '$KATA',
    address: {
      1337: '0x460017232eb6EFB550C4CF34009f8AAA6477c5255',
      42: '0x5958058Cbd8312E3EA04BA1B8ce82A775a48557D',
    },
    decimals: 18,
  },
}