/*
 * Main entry point of a React application
 * version of Truffle "React" box adapted to use "hooks" instead of classes, starting from React v16
 * work in progress: this git branch 'userInput' gets value from a user input
 */
import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
    // initialize the state variables of the application
    const [storageValue, setStorageValue] = useState(5);
    const [updatedValue, setUpdatedValue] = useState(undefined);
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [contract, setContract] = useState(undefined);

    // equivalent to the componentDidMount function of older React frameworks
    // connect to blockchain, get the accounts from MetaMask, connect to contract
    useEffect( () => {
        const init = async () => {
            try {
                // Get network provider (typically MetaMask) and web3 instance
                const web3 = await getWeb3();

                // Use web3 to get the user's accounts from the provider (MetaMask)
                const accounts = await web3.eth.getAccounts();

                // Get the contract instance
                const networkId = await web3.eth.net.getId();
                console.log('Connecting to blockchain');
                console.log('networkId', networkId, ', SimpleStorageContract', SimpleStorageContract);
                const deployedNetwork = SimpleStorageContract.networks[networkId];
                console.log('deployedNetwork', deployedNetwork);
                const instance = new web3.eth.Contract(
                    SimpleStorageContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                // Set web3, accounts, contract to the state
                setWeb3(web3);
                setContract(instance);
                setAccounts(accounts);
                console.log('Blockchain connected');
            } catch (error) {
                // Catch any errors for any of the above operations
                alert(
                    `Failed to load web3, accounts, or contract. Did you migrate the contract or install MetaMask? Check console for details.`,
                );
                console.error(error);
            }
        };
        init();
    }, []);

    // is called whenever there was any change in the state variables web3, accounts, contract
    useEffect( () => {
        const refreshDisplay = () => {
            console.log('refreshDisplay');
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
                Try changing the value in the form below.
                </p>
                <form onSubmit={runExample}>
                    <input
                        type='text' size='4'
                        onChange={myChangeHandler}
                    />
                    <input
                        type='submit' value='Change the value stored in blockchain'
                    />
                </form>
                <div>The stored value is: <strong>{(storageValue)? storageValue: 'not set yet'}</strong></div>
                </div>
            );    
        }
        if(typeof(web3) != 'undefined'
            && typeof(accounts) != 'undefined'
            && typeof(contract) != 'undefined'){
            refreshDisplay();
        }
    }, [web3, accounts, contract]);

    const runExample = async (event) => {
        event.preventDefault();     // let React use runExample instead of default form handler

        // Alert if input is not a number
        if (isNaN(/*this.state.*/updatedValue)) {alert ("Input '" + /*this.state.*/updatedValue+ "' is not a number")}
        // example of interaction with the smart contract
        else try{
            // Stores the input value
            console.log('updatedValue', updatedValue);
            await contract.methods.set(updatedValue).send({ from: accounts[0] });

            // Get the value from the contract to prove it worked
            const response = await contract.methods.get().call();

            // Update state with the result
            setStorageValue (response);
        }
        catch{
            alert('No contract deployed or account error; please check that MetaMask is on the correct network, reset the account and reload page');
        }
    }

    const myChangeHandler = async (event) => {
        setUpdatedValue(event.target.value);
        // console.log('-- App: updatedValue=', updatedValue);
    }

    // if (typeof(web3) === 'undefined') {
    //     return <div className="App">Loading Web3, accounts, and contract...</div>;
    // } test

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
          Try changing the value in the form below.
        </p>
        <form onSubmit={runExample}>
            <input
                type='text' size='4'
                onChange={myChangeHandler}
            />
            <input
                type='submit' value='Change the value stored in blockchain'
            />
        </form>
        <div>The stored value is: <strong>{(storageValue)? storageValue: 'not set yet'}</strong></div>
        </div>
    );

}

export default App;
