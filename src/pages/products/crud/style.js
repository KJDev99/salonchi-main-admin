import { Row } from "antd";
import styled from "styled-components";

export const Box = styled(Row)`
  width: 100%;
  height: 220px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 16px;
  margin-top: 8px;
  align-items: center;
  .box-wrap {
    border: 1px solid #eee;
    border-radius: 4px;
    width: 100%;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      border: 1px solid var(--red);
    }
    img {
      width: 90%;
      object-fit: contain;
    }
    &.active {
      border: 1px solid var(--red);
    }
  }
`;

export const List = styled("ul")``;

export const ListItem = styled("li")`
  list-style: none;
  position: relative;
  .delete-btn {
    position: absolute;
    z-index: 999;
    right: -40px;
    bottom: 5px;
  }
`;
