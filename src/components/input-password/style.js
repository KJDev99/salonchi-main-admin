import styled from 'styled-components';
import { Input } from 'antd';

export const PasswordInput = styled(Input.Password)`
  width: 100%;
  height: 35px;
  margin-top: 8px !important;
  background: transparent;
  border: 1px solid var(--secondary);
  font-size: 14px;
  font-family: 'Rubik', sans-serif;
  box-sizing: border-box;
  border-radius: 4px;
  outline: none;
  margin: 4px 0px !important;
  padding-left: 12px !important;
  padding-right: 12px !important;
  text-indent: 12px !important;
  transition: all 0.3s ease;
  &.input-error {
    border: 1px solid var(--red);
  }
  input {
    font-family: 'Rubik', sans-serif;
    color: var(--text-color);
  }
  input::placeholder {
    font-size: 12px !important;
    color: var(--secondary-text);
    font-family: 'Rubik', sans-serif;
  }
  &:disabled {
    background: var(--secondary);
  }
`;
