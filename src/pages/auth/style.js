import styled from "styled-components";

export const RegisterWrapper = styled.div`
  background-color: var(--main-login-bg);
  width: 100%;
  height: 100vh;
  .register-link {
    font-size: 16px;
    text-align: center;
    color: var(--text-color);
    border-top: 1px solid var(--fc-event-bg-color);
    padding-top: 8px;
    margin-top: 8px;
    a {
      color: var(--green);
      font-weight: 400;
      text-decoration: underline;
      transition: all 0.3s ease;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      text-decoration-color: transparent;
      &:hover {
        text-decoration-color: var(--green);
      }
    }
  }
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  form {
    &.sign-up {
      padding-top: 40px;
      padding-bottom: 40px;
    }
    padding: 0;
  }
  .content {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    padding: 20px 24px;
    border-radius: 24px;

    h1 {
      font-weight: 600;
      text-align: center;
      padding-top: 8px;
      font-family: "Rubik", sans-serif !important;
    }
    h2 {
      text-align: center;
      font-family: "Rubik", sans-serif !important;
      color: var(--text-color);
    }

    .image {
      padding-top: 20px;
      width: 90px;
      margin: 0 auto;
    }
  }
`;

export const ImageWrap = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  .icon-logo {
    width: 100px;
  }
`;
