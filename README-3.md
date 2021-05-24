# Bonuses - Getting Started with Truffle and React

## Bonus 1: Run Automated Tests on the demo
The demo contains an automated test in JavaScript and another automated test in Solidity. Test Driven Development (TDD) is strongly recommended when you develop blockchain applications because once deployed in production, a smart contract is immutable.
* The test script in JavaScript runs tests on smart contracts that are already deployed. To execute this, you need to have the `truffle develop` network running and the smart contracts migrated.
* The test script in Solidity tests smart contracts within the Solidity context. This is useful when you test blockchain protocols that have no frontend. The automated test has the code to deploy the smart contracts and interacts directly with them.

To run the tests inside `truffle develop`, simply type `test`. All test scripts in the folder `test` are run.

To run the tests from the command line, run a local blockchain network in another console and type `truffle test`. All test scripts in the folder `test` are run.
```shell
truffle(develop)> test
    Using network 'develop'.
    Compiling your contracts...
    ===========================
    > Compiling ./test/TestSimpleStorage.sol
    > Artifacts written to /var/folders/9t/2kphmw596g5dvkfrp3vzc5_m0000gn/T/test--98262-AO5EsZwhCQdx
    > Compiled successfully using:
    - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

    TestSimpleStorage
        ✓ testItStoresAValue (85ms)

    Contract: SimpleStorage
        ✓ ...should store the value 89. (97ms)

    2 passing (6s)
```
## Bonus 2: `build` and `serve` a standalone web app
While React is run in development, it includes many tools that are not needed in production, for example the tool to reload the web app every time we save a change in the code.

In production, these additions are not needed anymore. React has a script that makes a `build` folder that contains a compacted standalone web app, ready to be served by a hosting service. Assuming that `serve` has been installed globally (as shown in the [development setup](./README-2.md#install-serve)), it can be used to run locally the output in the folder `build`. All we need to do is to type
``` shell
$ cd client
$ npm run build
    > truffle-react-hooks@0.1.0 build /Users/kvutien/development/truffle-react-hooks/client
    > react-scripts build
    Creating an optimized production build...
    Compiled successfully.
    File sizes after gzip:
    393.72 KB  build/static/js/2.625c2e57.chunk.js
    3.82 KB    build/static/js/main.9d77c800.chunk.js
    1.64 KB    build/static/js/3.e458a574.chunk.js
    1.18 KB    build/static/js/runtime-main.289e6a85.js
    473 B      build/static/css/main.d34a2dca.chunk.css

    The project was built assuming it is hosted at /.
    You can control this with the homepage field in your package.json.

    The build folder is ready to be deployed.
    You may serve it with a static server:
    serve -s build
$ serve -s build
    ┌────────────────────────────────────────────────────┐
    │                                                    │
    │   Serving!                                         │
    │                                                    │
    │   - Local:            http://localhost:5000        │
    │   - On Your Network:  http://192.168.178.20:5000   │
    │                                                    │
    │   Copied local address to clipboard!               │
    │                                                    │
    └────────────────────────────────────────────────────┘
```
Open a web page at `localhost:5000` to see the standalone app that is served.
### Potential bug/error
When serving the build, you may see the dApp displays an alert of unsuccessful transaction. Reload the page and check the account that MetaMask is using in the confirmation dialog. Most probably it is using the first MetaMask account because of the instruction at line 56 of `App.js`
```javascript
    await contract.methods.set(5).send({ from: accounts[0] });
```
What is the position of the imported truffle `develop` account in your MetaMask?
If for example the imported account is the 4th account in your MetaMask, replace the `account[0]` by `account[3]`
```javascript
    await contract.methods.set(5).send({ from: accounts[3] });
```
Rebuild the dApp and serve again.

