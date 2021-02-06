import React, { useEffect, useState } from "react";
import "./index.module.scss";
import intl from "react-intl-universal";
import { connect } from "react-redux";
import { Dropdown, Menu } from "antd";
import { logout as gologout } from "@/redux/actions/users";
import { useHistory } from "react-router-dom";

interface IHeaderprops {
  userData: {
    name: string,
    email: string,
  };
  // showLogin: () => void;
  logout: () => void;
}

const Header: React.FC<IHeaderprops> =  ({userData, logout}) => {
  const history = useHistory();
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
            <span styleName="btn">{userData.name || userData.email}</span>
          </Dropdown>
        ) :  (
          <span>
            <span styleName="btn" onClick={() => history.push("/signin")}>{intl.get("components.header.signin")}</span> |
            <span styleName="btn" onClick={() => history.push("/signup")}> {intl.get("components.header.signup")}</span>
          </span>
        )
      }
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
    // showLogin: () => dispatch({type: "SHOW_LOGIN"}),
    logout: () => dispatch(gologout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
// export default Header
