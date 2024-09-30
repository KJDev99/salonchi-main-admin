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
  height: 100vh;
  & .go-back {
    max-width: 250px;
    height: 50px;
    font-family: 'Rubik', sans-serif;
    cursor: pointer;
  }
`;

export const Box = styled('div')``;

export const Title = styled('h2')`
  font-size: 24px;
  margin-top: 34px;
  font-weight: 600;
  line-height: 100%;
  text-align: center;
  color: black;
  font-family: 'Rubik', sans-serif;
`;

export const Text = styled('h3')`
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  text-align: center;
  margin: 16px 0 34px;
  color: #000;
  font-family: 'Rubik', sans-serif;
`;
