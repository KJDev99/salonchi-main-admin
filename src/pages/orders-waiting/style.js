import styled from 'styled-components';

export const Badge = styled('div')`
  background-color: ${(props) => props?.getstatus?.backgroundColor};
  border-radius: 12px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  padding: 2px;
  max-width: 150px;
  min-width: 100px;
  font-weight: 400;
  font-family: 'Rubik', sans-serif;
`;
