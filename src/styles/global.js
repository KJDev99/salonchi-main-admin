import { styled } from "styled-components";

export const Wrapper = styled("div")`
  .btn-group {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 24px 0;
    button {
      width: 120px;
      height: 40px;
    }
    .btn-success {
      background-color: #52c41a !important;
      border: none;
      color: #fff !important;
    }
  }
  .filter {
    display: flex;
    width: 90%;
    justify-content: space-between;
  }
`;

export const Header = styled("div")`
  display: flex;
  /* align-items: center; */
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 0 32px;
  width: 100%;
  .header-top {
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-top-left {
    align-items: center;
    display: flex;
    gap: 16px;
  }
  .header-top-right {
    display: flex;
    gap: 10px;
  }
  &.expenses-header {
    margin: 0 0 12px;
  }
  &.order-header {
    margin: 0;
  }
  button {
    max-width: 240px;
    font-weight: 400;
    font-size: 16px;
  }
`;

export const Footer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 32px 0;
  button {
    max-width: 277px;
  }
`;

export const Title = styled("h2")`
  font-size: 18px;
  color: #000000;
  text-transform: uppercase;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
`;

export const Container = styled("div")`
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  a {
    margin: 0;
    padding: 0;
  }
`;

export const Input = styled("input")`
  width: 100%;
  height: 35px;
  background: transparent;
  border: 1px solid var(--secondary);
  font-size: 14px;
  font-family: "Rubik", sans-serif;
  box-sizing: border-box;
  border-radius: 4px;
  outline: none;
  margin: 4px 0px;
  text-indent: 12px;
  transition: all 0.3s ease;
  color: var(--text-color);
  &.input-error {
    border: 1px solid var(--main-red);
  }
  &:focus {
    border: 1px solid var(--green);
  }
  &::placeholder {
    font-size: 12px;
    color: var(--secondary-text);
    font-family: "Rubik", sans-serif;
  }
  &:disabled {
    background: var(--secondary);
  }
`;
export const FormGroupProvider = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .ant-picker-focused,
  .ant-picker:hover {
    border-color: var(--green);
  }
  .ant-picker-focused {
    box-shadow: 0 0 0 2px rgba(44, 71, 62, 0.2);
  }
  .ant-select-selector {
    height: 35px !important;
    border-radius: 4px !important;
    margin: 4px 0;
  }
  .ant-select-selection-placeholder {
    font-size: 12px !important;
  }
`;

export const Error = styled("p")`
  color: var(--main-red);
  font-family: "Rubik", sans-serif;
  font-size: 12px;
`;
export const Label = styled("label")`
  color: var(--text-color);
  font-size: 16px;
  width: 100%;
  font-family: "Rubik", sans-serif;
`;

export const Text = styled("p")`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-decoration: none;
  &.accept-text {
    color: #52c41a;
  }
  &.cancelled-text {
    color: #ff4d4f;
  }
`;

export const NotifyText = styled("div")`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #08979c;
  &.canceled_by_deliver {
    color: #ff4d4e;
  }
`;
