import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;

export const Select = styled.select`
  width: 220px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ffffff;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    width: 180px;
    font-size: 14px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  background-color: ${(props) => (props.disabled ? "#e9ecef" : "#fff")};
  color: ${(props) => (props.disabled ? "#6c757d" : "#000")};

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    height: 120px;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;
