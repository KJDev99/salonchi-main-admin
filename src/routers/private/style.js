import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  overflow: hidden;
  background: var(--main-background);
  backdrop-filter: blur(20px);
`;

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: #f3f3f3;
`;

export const Content = styled.main`
  width: 100%;
  height: 100vh;
  flex-grow: 1;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 70px 24px;
  background: var(--main-background);
  &::-webkit-scrollbar {
    background-color: var(--main-background);
    border-radius: 8px;
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--module-card-footer-info);
    border-radius: 8px;
  }
`;
