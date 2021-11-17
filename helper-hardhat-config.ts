export interface networkConfigItem {
  id: string
  keyHash: string
  fee: string
  linkToken?: string
  vrfCoordinator?: string
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
  hardhat: {
    id: '31337',
    keyHash:
      '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
    fee: '1000000000000000000',
  },
  localhost: {
    id: '1337',
    keyHash:
      '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
    fee: '1000000000000000000',
  },
  kovan: {
    id: '42',
    linkToken: '0xa36085F69e2889c224210F603D836748e7dC0088',
    keyHash:
      '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
    vrfCoordinator: '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9',
    fee: '1000000000000000000',
  }
}

export const developmentChains = ['hardhat', 'localhost']
