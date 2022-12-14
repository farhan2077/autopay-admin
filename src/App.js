import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DollarOutlined, UserOutlined, CarOutlined } from "@ant-design/icons";

import styles from "./App.module.css";
// eslint-disable-next-line no-unused-vars
import fixedStyles from "./fixantdstyle.css";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Vehicles from "./pages/vehicles/Vehicles";

const { Header, Sider, Content } = Layout;

function App() {
  const location = useLocation();
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
              defaultSelectedKeys={`${location.pathname.substring(1)}`}
            >
              <Menu.Item key="transactions" icon={<DollarOutlined />}>
                <Link to="/transactions">Transactions</Link>
              </Menu.Item>
              <Menu.Item key="users" icon={<UserOutlined />}>
                <Link to="/users">Users</Link>
              </Menu.Item>
              <Menu.Item key="vehicles" icon={<CarOutlined />}>
                <Link to="/vehicles">Vehilces</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className={styles.contentSpacing}>
            <Routes>
              <Route path="/transactions" element={<Transactions />} />
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
