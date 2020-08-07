import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

export class Home extends Component {
  render() {
    return (
      <Content className="site-layout" 
            style={{ padding: '0 50px', paddingTop: 64, minHeight: 400}}>
          <h1> home</h1>
      </Content>
    );
  }
}

export default Home;