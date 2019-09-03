import React from "react";
import "./App.module.scss";
import {Carousel, Button} from "antd";
// import Navs from "@/components/navs";

// const NavsItem = Navs.Item;
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
      <div styleName="content">
        <div styleName="nav">
          <Button>看别人</Button>
          <Button>自己去</Button>
          <Button>写游记</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
