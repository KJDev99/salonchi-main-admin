import styled from "styled-components";

export const Titles = styled.h2`
  text-align: center;
  margin-top: 30px;
  font-size: 16px;
  font-family: "Rubik", sans-serif;
`;
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
  text-align: center;
  cursor: pointer;

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

export const Select = styled.select`
  padding: 5px;
  margin-left: 20px;
  font-size: 14px;
  border-radius: 4px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  position: relative;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  text-align: center;
  select {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 95%;
    height: 40px;
    border-radius: 5px;
    padding: 10px;
  }
`;
export const Textarea = styled.textarea`
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;
export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0px;
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StatusFilter = styled(Select)`
  padding: 5px;
  margin-left: 20px;
  font-size: 14px;
`;

export const StatusFilterButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#007bff" : "#e0e0e0")};
  color: ${(props) => (props.isActive ? "#fff" : "#333")};

  &:hover {
    background-color: ${(props) => (props.isActive ? "#0056b3" : "#ccc")};
  }
`;
