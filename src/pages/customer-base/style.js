import styled from "styled-components";

export const FilterBtn = styled("div")`
  display: flex;
  gap: 20px;
  .msg {
    font-size: 14px;
    color: #888;
    font-weight: 500;
    height: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
  }
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    /* background-color: #ea580c; */
    color: black;
  }
  .active {
    background-color: #ea580c;
    color: white;
  }
`;
