import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  font-family: "Rubik", sans-serif;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 12px 15px;
  text-align: left;

  &:first-child {
    width: 50px;
    text-align: center;
  }

  &:last-child {
    text-align: center;
  }
`;

export const Badge = styled.div`
  background-color: ${(props) => props?.getstatus?.backgroundColor};
  border-radius: 12px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  padding: 5px 10px;
  max-width: 150px;
  font-weight: 400;
`;

export const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;
