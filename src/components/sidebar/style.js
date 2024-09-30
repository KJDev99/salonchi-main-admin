import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #f0f2f5;

  #components-layout-demo-custom-trigger .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
  .logo {
    /* height: 50px; */
    width: 150px;
    margin: 16px auto;
  }
  .icon-logo {
    width: 129px;
    /* height: 45px; */
  }

  .ant-layout-sider {
    background-color: #fff;
  }
  .ant-menu.ant-menu-light {
    background-color: #fff;
  }
  .ant-menu .ant-menu-item-selected {
    background-color: var(--fc-event-bg-color) !important;
    color: var(--green);
  }
  .ant-menu-light .ant-menu-submenu-selected > .ant-menu-submenu-title {
    color: var(--green);
    background-color: var(--fc-event-bg-color) !important;
  }
`;
