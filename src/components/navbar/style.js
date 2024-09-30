import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  height: 64px;
`;
export const BellContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 64px;
  svg {
    cursor: pointer;
    font-size: 22px;
  }
  .new-message {
    position: absolute;
    top: 20%;
    right: -5px;
    width: 18px;
    height: 18px;
    border: 0.4px solid var(--white);
    border-radius: 50%;
    background-color: var(--red);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    color: var(--white);
    font-size: 8px;
  }
`;
export const OrdersCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  /* flex-wrap: wrap; */
  height: 64px;
  .order-count {
    color: var(--white);
    background: #39dd00;
    height: 20px;
    display: flex;
    align-items: center;
    padding: 0 4px;
  }
`;
export const AccountCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 64px;
  .user-name {
    font-size: 20px;
    font-weight: 400;
    font-family: 'Rubik', sans-serif;
    @media (max-width: 400px) {
      display: none;
    }
  }
  svg {
    font-size: 34px;
  }
`;
