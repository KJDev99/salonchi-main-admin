import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  label {
    color: var(--text-color);
    font-size: 16px;
    width: 100%;
    font-family: 'Rubik', sans-serif;
  }
  input {
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
    transition: all 0.3s ease;
    color: var(--text-color);
    &::placeholder {
      font-size: 12px !important;
      color: var(--secondary-text);
      font-family: 'Rubik', sans-serif;
    }
    &.error {
      border: 1px solid var(--red);
      &::placeholder {
        font-size: 12px !important;
        color: var(--secondary-text);
        font-family: 'Rubik', sans-serif;
      }
    }
  }
  @media (max-width: 576px) {
    margin: 8px 0;
    input {
      height: 44px;
      font-size: 12px;
      &::placeholder {
        font-size: 12px;
      }
    }
    label {
      font-size: 12px;
    }
  }
`;
