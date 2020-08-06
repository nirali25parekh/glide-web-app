import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import React from 'react';
import '../App.css';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MyFooter(){
    return(<Footer style={{ textAlign: 'center', marginTop: 100, }}>Glide - Created by Nirali</Footer>)
}

export default MyFooter