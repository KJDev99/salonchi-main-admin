import { Col, Row } from "antd";
import { Container } from "@/styles/global";
import IconLogo from "@/assets/logo.svg";
import { ImageWrap, RegisterWrapper } from "./style";
import { Button } from "@/components/button";
import { useLogin } from "./useLogin";
import { InputPassword } from "@/components/input-password";
import { Spinner } from "@/components/spinner";
import { PhoneInput } from "@/components/phone-input";

const Auth = () => {
  const { form, onSubmit, isLoading, contextHolder } = useLogin();

  return (
    <RegisterWrapper>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {contextHolder}
        <Container>
          <div className="content">
            <ImageWrap>
              <img className="icon-logo" src={IconLogo} alt="icon" />
            </ImageWrap>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <h1>Xush kelibsiz!</h1>
                <h2>Tizimga kirish</h2>
              </Col>
              <Col span={24}>
                <PhoneInput
                  control={form.control}
                  name="phone"
                  label="Telefon raqam"
                  placeholder="Telefon raqam"
                />
              </Col>
              <Col span={24}>
                <InputPassword
                  control={form.control}
                  name="password"
                  label="Parol"
                  placeholder="Parol"
                />
              </Col>
              <Col span={24} style={{ marginTop: "10px" }}>
                <Button type="submit" name="Tizimga kirish" />
              </Col>
            </Row>
          </div>
        </Container>
      </form>
      {isLoading && <Spinner />}
    </RegisterWrapper>
  );
};

export default Auth;
