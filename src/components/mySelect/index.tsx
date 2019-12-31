
import React from "react";
import "./index.module.scss";
// import intl from "react-intl-universal";
import { Input, Menu } from "antd";

  class MySelect extends React.Component<any, any> {
  public state = {
  };
  public render() {
      return (
        <>
          <Input/>
          <Menu>
            <Menu.Item key="0">
              
            </Menu.Item>
          </Menu>
        </>
      );
    }
  };

export default MySelect;
