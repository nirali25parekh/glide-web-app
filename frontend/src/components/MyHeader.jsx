import { Layout, Menu, Breadcrumb, Avatar } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import "../App.css";
import logo from '../images/logo-yellow.png'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MyHeader(props) {
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" , flexDirection:'row', display:'flex'}}>

      <div className="logo"  style={{height:70, width: 70,}}>
        <Avatar
        shape="square"
        size={50}
        src={logo}/>
        </div>


      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["5"]}>
        <Menu.Item key="0">
          <NavLink to="/home">Home</NavLink>
        </Menu.Item>

        {props.userData.userId || props.userData.token ? (
          <Menu.Item key="2">
            <NavLink to="/tweets">Tweets</NavLink>
          </Menu.Item>
        ) : (
          <React.Fragment />
        )}

        {props.userData.userId || props.userData.token ? (
          <Menu.Item key="3">
            <NavLink to="/reddit">Reddit</NavLink>
          </Menu.Item>
        ) : (
          <React.Fragment />
        )}

        {props.userData.userId || props.userData.token ? (
          <Menu.Item key="4">
            <NavLink to="/videoindexer">Video Indexer</NavLink>
          </Menu.Item>
        ) : (
          <React.Fragment />
        )}

        {props.userData.userId || props.userData.token ? (
          <React.Fragment />
        ) : (
          <Menu.Item key="5">
            <NavLink to="/register">Authenticate</NavLink>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps)(MyHeader);
