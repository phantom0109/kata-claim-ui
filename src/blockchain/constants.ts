export const defaultChainId = 5;

export const rpcUrls = {
  42: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  5: 'https://goerli.infura.io/v3/453c03db4e284d4abbf11bf220b53bfe'
}

export const networkNames = {
  42: 'Kovan Test Network',
  1: 'Ethereum Mainnet',
  5: 'Goerli Test Network'
}

export const addresses = {
  Claim: {
    42: '0x9D2EF314A03E663aE7e35D030ed1723a5DdFc745',
  },
  seedsaleVesting: {
    5: '0x20B877887AC9c63fdb0aF476EBB3FD53e2288000'
  },
  presaleVesting: {
    5: '0xF9A75E8881af1BE80aE80050616185f0b924A03e'
  },
  teamVesting: {
    5: '0x6d36B081D1211A1604cf352e8e309Cf220f746f9'
  },
  airdropVesting: {
    5: '0xc1287017dddAD48eC92AeE1586518811ffABa419'
  },
  treasuryVesting: {
    5: '0xBC9a5Be88ECCC2Bd2d8b791509708c254343fF97'
  },
  developmentVesting: {
    5: '0x9933fD980C65d3Ba08d67Eae8c1cD74c0DA408ea'
  },
  marketingVesting: {
    5: '0x8Ac0420DA6702744351C1e67d93A5767a576f0A4'
  }
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
      42: '0x96fD8dBb76B3BAbCb0F1f4D970349F14dFF08426',
    },
    decimals: 18,
  },
}