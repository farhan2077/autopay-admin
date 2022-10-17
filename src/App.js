import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DollarOutlined, UserOutlined, CarOutlined } from "@ant-design/icons";

import styles from "./App.module.css";
// eslint-disable-next-line no-unused-vars
import fixedStyles from "./fixantdstyle.css";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Vehicles from "./pages/Vehicles";

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Header>
          {/* <div className="logo" /> */}
          <p className={styles.headerText}>AutoPay</p>
        </Header>
        <Layout>
          <Sider>
            <Menu
              className={styles.menuSpacing}
              mode="inline"
              defaultSelectedKeys="Transactions"
            >
              <Menu.Item key="Transactions" icon={<DollarOutlined />}>
                <Link to="/">Transactions</Link>
              </Menu.Item>
              <Menu.Item key="Users" icon={<UserOutlined />}>
                <Link to="/users">Users</Link>
              </Menu.Item>
              <Menu.Item key="Vehicles" icon={<CarOutlined />}>
                <Link to="/vehicles">Vehilces</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <Routes>
              <Route path="/" element={<Transactions />} />
              <Route path="/users" element={<Users />} />
              <Route path="/vehicles" element={<Vehicles />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
