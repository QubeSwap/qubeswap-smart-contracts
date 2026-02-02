#!/usr/bin/env zx
// import 'zx/globals'

const networks = {
  seiMainnet: 'seiMainnet',
  monadMainnet: 'monadMainnet',
  ticsMainnet: 'ticsMainnet',
  bscMainnet: 'bscMainnet',
  avaxMainnet: 'avaxMainnet',
  hardhat: 'hardhat',
}

let network = process.env.NETWORK
console.log(network, 'network')
if (!network || !networks[network]) {
  throw new Error(`env NETWORK: ${network}`)
}

//Example for verification do: NETWORK=avaxMainnet yarn zx v3-verify.mjs

await $`yarn workspace @qubeswap/stable-swap run hardhat verify --network ${network} 0x6BFC02F34d09846dfE2555eAEB61fe7c5dd700F6`

/* Contracts with args */
//await $`yarn workspace @qubeswap/stable-swap run hardhat verify --network ${network} 0x7eB627C4CCCd1279a749c15A7F7F30D83FABADC6, "0x","0x"`

console.log(chalk.blue('Done!'))
