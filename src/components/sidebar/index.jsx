import React, { useState } from "react";
import {
  ExclamationCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useMenu } from "./useMenu";
import IconLogo from "@/assets/logo.svg";
import { Wrapper } from "./style";
import { clearStorage } from "@/utils/clearStorage";
import { Navbar } from "../navbar";

const { confirm } = Modal;
const { Header, Content, Footer, Sider } = Layout;

export const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLink, setSelectedLink] = useState(
    window.location.pathname.replace("/", "")
  );
  const { items } = useMenu();
  const { pathname } = useLocation();
  const navigation = useNavigate();

  return (
    <Wrapper>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          width={320}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          {collapsed ? (
            <div
              className="logo"
              style={{
                fontSize: 32,
                paddingLeft: 30,
                color: "var(--red)",
              }}
            >
              X
            </div>
          ) : (
            <div className="logo">
              <img className="icon-logo" src={IconLogo} alt="icon" />
            </div>
          )}

          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[pathname?.replace("/", "") ?? selectedLink]}
            items={items}
            onClick={({ key }) => {
              if (key === "logout") {
                confirm({
                  title: "Rostdan ham tizimdan chiqmoqchimisiz?",
                  icon: <ExclamationCircleOutlined />,
                  onOk() {
                    clearStorage();
                    navigation(`/`);
                  },
                  okText: "Ha",
                  cancelText: "Bekor qilish",
                  onCancel() {
                    console.log("Cancel");
                  },
                });
              } else {
                navigation(`/${key}`);
                setSelectedLink(key);
              }
            }}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: !collapsed ? 320 : 80,
          }}
        >
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              paddingLeft: 16,
              paddingRight: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Navbar />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 32,
              minHeight: "calc(100vh - 180px)",
              background:
                pathname !== "/admin/statistics" ? "#fff" : "transparent",
            }}
          >
            {children}
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Salonchi | Admin - @2024
          </Footer>
        </Layout>
      </Layout>
    </Wrapper>
  );
};

Sidebar.propTypes = {
  children: PropTypes.element.isRequired,
};
