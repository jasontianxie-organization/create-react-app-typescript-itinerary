import React from "react";
import "./App.module.scss";
import { Carousel, Button } from "antd";
import { CSSTransition } from "react-transition-group";
// import Navs from "@/components/navs";

// const NavsItem = Navs.Item;
// const App: React.FC = () => {
class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      inProps: false,
    };
  }
  public toggleSearch() {
    this.setState({inProps: !this.state.inProps});
  }
  public render() {
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
            <Button onClick={() => this.toggleSearch()}>看别人</Button>
            <Button>自己去</Button>
            <Button>写游记</Button>
          </div>
          <CSSTransition timeout={2000} in={this.state.inProps} classNames="search">
            <div styleName="search-detail">
              this is the animation test
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  }
}

export default App;
