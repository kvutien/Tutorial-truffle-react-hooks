/*
 * Main entry point of a React application
 * version of Truffle "React" box adapted to use "hooks" instead of classes, starting from React v16
 */
import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
    // initialize the state variables of the application
    const [storageValue, setStorageValue] = useState(undefined);
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [contract, setContract] = useState(undefined);

    // equivalent to the componentDidMount function of older React frameworks
    useEffect( () => {
        const init = async () => {
            try {
                // Get network provider (typically MetaMask) and web3 instance
                const web3 = await getWeb3();

                // Use web3 to get the user's accounts from the provider (MetaMask)
                const accounts = await web3.eth.getAccounts();

                // Get the contract instance
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = SimpleStorageContract.networks[networkId];
                const instance = new web3.eth.Contract(
                    SimpleStorageContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                // Set web3, accounts, contract to the state
                setWeb3(web3);
                setContract(instance);
                setAccounts(accounts);
            } catch (error) {
                // Catch any errors for any of the above operations
                alert(
                    `Failed to load web3, accounts, or contract. Did you migrate the contract or installed MetaMask? Check console for details.`,
                );
                console.error(error);
            }
        };
        init();
    }, []);

    // is called whenever there was any change in the state variables web3, accounts, contract
    useEffect( () => {
        const runExample = async () => {
            // example of interaction with the smart contract
            try{
                // Stores a given value, 5 by default
                await contract.methods.set(5).send({ from: accounts[0] });

                // Get the value from the contract to prove it worked
                const response = await contract.methods.get().call();

                // Update state with the result
                setStorageValue (response);
            }
            catch{
                alert('No contract deployed; please check that MetaMask is on the correct network and reload page');
            }
        }
        if(typeof(web3) != 'undefined'
            && typeof(accounts) != 'undefined'
            && typeof(contract) != 'undefined'){
            runExample();
        }
    }, [web3, accounts, contract]);

    if (typeof(web3) === 'undefined') {
        return <div>Loading Web3, accounts, and contract...</div>;
    }

    // equivalent to the render function of older React frameworks
    return (
        <div className="App">
        <h1 className="App-header">Good to Go!</h1>
        <p>Your Truffle-React Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
            If your contracts compiled and migrated successfully, below will show
            a stored value of 5 (initially set).
        </p>
        <p>
            Try changing the value stored on <strong>line 56</strong> of <code>App.js</code>.
        </p>
        <div>The stored value is: <strong>{(storageValue)? storageValue: 'not set yet'}</strong></div>
        </div>
    );

}

export default App;
