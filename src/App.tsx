import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import {Button} from "antd";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button type="primary">Button</Button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit by jasontianxie-sub<code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
