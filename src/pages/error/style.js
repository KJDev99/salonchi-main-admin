import styled from 'styled-components';

export const Container = styled('div')`
  width: 100%;
  flex-grow: 1;
  display: flex;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column;
`;

export const Wrapper = styled('div')`
  flex-grow: 1;
  display: flex;
  padding: 24px;
  border-radius: 5px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: var(--main-white);
  .error-btn {
    max-width: 250px;
    height: 50px;
  }
`;

export const Title = styled('h2')`
  margin: 34px 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 100%;
  text-align: center;
`;
