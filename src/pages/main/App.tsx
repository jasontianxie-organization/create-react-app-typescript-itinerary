import React from "react";
import "./App.module.scss";
import {Carousel} from "antd";

const App: React.FC = () => {
  return (
    <div styleName="app">
      <header styleName="app-header">
        <Carousel autoplay>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
      </header>
    </div>
  );
};

export default App;
