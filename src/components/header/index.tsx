import React, { useEffect, useState } from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import { connect } from "react-redux";
import { Dropdown, Menu } from "antd";
import Login from "@/components/login";

interface IHeaderprops {
  userData: {
    name: string,
    email: string
  },
  showLogin: () => void,
  logout: () => void
}

const Header: React.FC<IHeaderprops> =  ({userData, showLogin, logout}) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => logout()}>{intl.get("components.header.logout")}</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div styleName="header">
      {
        userData ? (
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <span>{userData.name || userData.email}</span>
          </Dropdown>
        ) :  (
          <span>
            <span styleName="btn" onClick={() => showLogin()}>{intl.get("components.header.signin")}</span> |
            <span styleName="btn" > {intl.get("components.header.signup")}</span>
          </span>
        )
      }
      <Login/>
    </div>
  )
}


function mapStateToProps(state: any) {
  return {
    userData: state.users.data,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    showLogin: () => dispatch({type: "SHOW_LOGIN"}),
    logout: () => {console.log('logout')}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
// export default Header