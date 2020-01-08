
import React from "react";
import "./index.module.scss";
// import intl from "react-intl-universal";
import { Input, Dropdown, Menu } from "antd";

type OnChange = (val: {id?: number, name: string}) => any;

interface IMyselectProps {
  value?: any; // 设置默认值
  onChange: OnChange;
  dropDownData: any;
}

interface IMyselectStates {
  inputValue: string;
}

class MySelect extends React.Component<IMyselectProps, IMyselectStates> {
  public timer: any = null;
  public state = {
    inputValue: "",
  };
  public changeInput(e: any) {
    const val = e.target.value;
    this.setState({inputValue: val});
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.props.onChange(val);
    }, 500);
  }
  public dropDownClick(val: {id: number, name: string}) {
    this.setState({inputValue: val.name});
    this.props.onChange(val);
  }
  public render() {
    const menu = (
      <Menu>
        {this.props.dropDownData.map((item: {id: number, name: string}, index: number) => {
          return (<Menu.Item key={index}>
                    <div onClick={() => this.dropDownClick({id: item.id, name: item.name})}>{item.name}</div>
                  </Menu.Item>);
        })}
      </Menu>
    );
    return this.props.dropDownData.length ? (
      <Dropdown overlay={menu} trigger={["click"]}>
        <Input value={this.state.inputValue} onChange={(e) => this.changeInput(e)}/>
      </Dropdown>
    ) : <Input value={this.state.inputValue} onChange={(e) => this.changeInput(e)}/>;
  }
  }

export default MySelect;
