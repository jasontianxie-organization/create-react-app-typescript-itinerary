import React from "react";
import logo from "./logo.svg";
import "./App.module.scss";
import {Button} from "antd";

const App: React.FC = () => {
  return (
    <div styleName="App">
      <header styleName="App-header">
        <Button type="primary">Button</Button>
        <img src={logo} styleName="App-logo" alt="logo" />
        <p>
          Edit by jasontianxie-sub<code>src/App.tsx</code> and save to reload.
        </p>
        <a
          styleName="App-link"
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
