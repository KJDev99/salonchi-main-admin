import styled from "styled-components";

export const ButtonElement = styled.button`
  width: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  border: 1px solid transparent;
  background: var(--red);
  color: #fff;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: translateY(1px);
  }

  &.back {
    background-color: var(--fc-event-bg-color);
    color: var(--green);
  }
  &.go-back-btn {
    background-color: transparent;
    color: var(--red);
    border: 1px solid var(--red);
    height: 35px;
    width: 120px;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3
  }
`;
