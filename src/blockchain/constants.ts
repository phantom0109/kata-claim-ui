export const defaultChainId = 1;

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
  seedsaleVesting: {
    5: '0x20B877887AC9c63fdb0aF476EBB3FD53e2288000',
    1: '0x9e9cb57C0A779e7f80571b2334D96645D491de62'
  },
  privatesaleVesting: {
    5: '0xF9A75E8881af1BE80aE80050616185f0b924A03e',
    1: '0x0A0d164a2e7E0423f5F61533DCCFAb1B6eFd6b4B'
  },
  teamVesting: {
    5: '0x6d36B081D1211A1604cf352e8e309Cf220f746f9',
    1: '0xEbd700F0890F07504704F7Baddc3CAA7D6918A77'
  },
  airdropVesting: {
    5: '0xc1287017dddAD48eC92AeE1586518811ffABa419',
    1: '0x0C0091CCE295C4544225cbd1821b0DDAd03B4514'
  },
  treasuryVesting: {
    5: '0xBC9a5Be88ECCC2Bd2d8b791509708c254343fF97',
    1: '0x8001b55090614Fa52abff3898DC10B0a26BcD18B'
  },
  developmentVesting: {
    5: '0x9933fD980C65d3Ba08d67Eae8c1cD74c0DA408ea',
    1: '0x609CB370A28B4a53f4250BD1257B1a497583926f'
  },
  marketingVesting: {
    5: '0x8Ac0420DA6702744351C1e67d93A5767a576f0A4',
    1: '0x24db77F8911CC9983aC79a2Bf775c671C723d566'
  },
  presaleclaimVesting: {
    1: '0xC5c84c5b07e927178C001B87F3Cdf7ca1B36Ea68'
  },
  Presale: {
    1:'0x3D0A17185610a095873Dada98D52242933923F91'
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