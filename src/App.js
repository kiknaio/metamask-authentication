import { useState, useEffect } from 'react';
// import {}

import { getWeb3 } from './utils';

import logo from './logo.svg';
import './App.css';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);

  const signMessage = async () => {
    const result = await web3.eth.personal.sign("Hello world", accounts[0], "some random password");
    console.log(result);
  }

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      setWeb3(web3);
      setAccounts(accounts);
    }
    init();

    window.ethereum.on('accountsChanged', accounts => {
      setAccounts(accounts);
    });

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={signMessage}>Sign the message</button>
      </header>
    </div>
  );
}

export default App;
