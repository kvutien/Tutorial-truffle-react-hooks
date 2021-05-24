# Install dev environment and start from scratch (Part 2: Solidity code)
In the README of this repository, we have seen how to clone, install and run an existing dApp. Now, as said the Chinese proverb "_Give a man a bowl of rice, you feed him for one meal. Teach a man how to grow rice, you feed him for his lifetime_".

Let's take advantage of the simplicity of this dApp to see how to develop starting from scratch and reach the same result. This process can be generalized to all your future developments.

* In [Part 1](./devTuto-1.md) we presented the scaffolding of the dApp and the dependencies,
* In this Part 2 we code the Solidity frontend,
* In Part 3 we code the JavaScript React backend,
* In [Part 4](./devTuto-4.md) we publish our work on Github.

## Modify `truffle-config.js`
Truffle stores by default the compilation artefacts, that contain the ABI (Application Binary Interface) of the smart contracts, in the folder `build` in the root folder of the project. But the React frontend cannot reach outside the root folder of the React project (here it is the folder `client`). To solve this, we specify in `truffle-config.js` the path where truffle should store the artefacts: 
```javascript
const path = require("path");
module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
```

## Create smart contract code
In our console, we type the following steps to create our smart contract:
* move into folder
```javascript
truffle-react-new $ cd contracts
```
* create a boilerplate Solidity contract
```javascript
client $ truffle create contract SimpleStorage: 
```

It generates a file `SimpleStorage.sol` with the following code
```javascript
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract SimpleStorage {
  constructor() public {
  }
}
```
Remove the constructor and add the following code.
```javascript
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;

contract SimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
```
## Add a migration file for SimpleStorage
In folder `migrations` add a file `2_deploy_contracts.js` to drive the migration of SimpleStorage.
```solidity
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
```

## Compile & migrate smart contract in local network
Reminder: The command `truffle develop` of Truffle 5.1 is not compatible with `node 14.17.0`. Remember to downgrade to `node 12.18.4`.
```javascript
    truffle-react-new $ truffle develop 
    ^C%  (no reaction; local blockchain not deployed)
    truffle-react-new $ nvm use 12.18.4
    Now using node v12.18.4 (npm v6.14.6)
    truffle-react-new $ truffle develop
    Truffle Develop started at http://127.0.0.1:9545/

    Accounts:
    (0) 0x4d79c0d414e7e70b6323904d3a9085b86d8f82ff
    (1) 0xaebfe6f06361842eacd140646374e8d0110b0cc1
    (2) 0x49b56ee1f07a6fc72d808ed905f16a4c94869bbc
    (3) 0x71f165ead2cfca9221b53a6f5daae21682bd1055
    (4) 0x9b7a12cc33f8700f04f012836a3b6ba9583c2416
    (5) 0xcd81fd73490bba8b7030d9489e4475bcfe24e638
    (6) 0xbaf0bb7bc5cb3f542c7c46b7df9c26d894ce93e7
    (7) 0x2897aa7685e510a83a247927d780183a0dc2ad92
    (8) 0xa207ab0d24a16c604dc456f0e3974988c56c87d2
    (9) 0x129d24f41c27689ce13c2af546fc842f6ba30c81

    Private Keys:
    (0) 33f9646f72ff23f963d69889d45039602da387600fa7da4b41056890dd623f53
    (1) 54cf9b9e9caf2d328fab05a545d33403a992bea38ce1d2fd7277ce0b587ed7d3
    (2) 60ab4a3965b10a47a5880fafb1da7cd98153b297a8f69bc92bcdffb38272976e
    (3) b44ea1b784c84107237679782eabedce0565d028a075ec76552f8d04e080d79d
    (4) 34f2579734e55eade04420976e143fa2c814dfc8fcd4fc42263f19e95f4200cc
    (5) 1e139532c9e0eb2b441417f2f12501f52e55be6f127a6599e298e69138af009a
    (6) 31d4b5c4b095af854699aaa4eff1e3162d5a144e20cbf8d8cb2421955df29f8c
    (7) 8549d3ecaf12b8758216eeb5a662b7fe836a0478bc8542bb750376f1e3ce1cd8
    (8) 7564523a8e446c1081321cb0df81a7922a9ead7e1591d67b93da5f323de74a4e
    (9) 5bbdebd3941c7fc1584c290cb3f49d7995c1ff5910a5e3327e9f253f5560bc14

    Mnemonic: position wonder opera miss skirt stadium reject concert marble road cotton polar
    ⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
    Ensure you do not use it on production blockchains, or else you risk losing funds.

    truffle(develop)> migrate
    Compiling your contracts...
    ===========================
    > Everything is up to date, there is nothing to compile.

    Starting migrations...
    ======================
    > Network name:    'develop'
    > Network id:      5777
    > Block gas limit: 6721975 (0x6691b7)

    1_initial_migration.js
    ======================
    Deploying 'Migrations'
    ----------------------
    > transaction hash:    0xc23fff0daf23c6ad8d94dc5905f8c42ed194c13f410725ba223956dac03797d1
    > Blocks: 0            Seconds: 0
    > contract address:    0x597328E0Ca20b7A7FEfc399e5E36Ab4Da4A5E43A
    > block number:        1
    > block timestamp:     1621626321
    > account:             0x4d79c0d414E7E70B6323904d3A9085B86d8f82Ff
    > balance:             99.99616114
    > gas used:            191943 (0x2edc7)
    > gas price:           20 gwei
    > value sent:          0 ETH
    > total cost:          0.00383886 ETH

    > Saving migration to chain.
    > Saving artifacts
    -------------------------------------
    > Total cost:          0.00383886 ETH

    2_deploy_contracts.js
    =====================
    Deploying 'SimpleStorage'
    -------------------------
    > transaction hash:    0xdeb51bc391752c01b61d5e925b288c69a2e426694a95444fcfdb9d6ad302ba19
    > Blocks: 0            Seconds: 0
    > contract address:    0x58919E4c76330DB629FC1D79bee533Fc6Aa1c4c0
    > block number:        3
    > block timestamp:     1621626322
    > account:             0x4d79c0d414E7E70B6323904d3A9085B86d8f82Ff
    > balance:             99.9933906
    > gas used:            96189 (0x177bd)
    > gas price:           20 gwei
    > value sent:          0 ETH
    > total cost:          0.00192378 ETH

    > Saving migration to chain.
    > Saving artifacts
    -------------------------------------
    > Total cost:          0.00192378 ETH

    Summary
    =======
    > Total deployments:   2
    > Final cost:          0.00576264 ETH
```

Now we [code the frontend](./devTuto-3.md) that is in the folder `client/src`.
