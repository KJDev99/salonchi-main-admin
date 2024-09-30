/* eslint-disable react/no-unescaped-entities */
import Upload from "@/components/upload";
import { Footer, Header, Title, Wrapper } from "@/styles/global";
import { Col, Row } from "antd";
import { useSettings } from "./useSettings";
import { Input } from "@/components/input";
import { PhoneInput } from "@/components/phone-input";
import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/button";
import { getUser } from "@/utils/user";
import { CheckboxStyle } from "./style";
import { Spinner } from "@/components/spinner";

const Settings = () => {
  const user = getUser();
  const {
    form1,
    form2,
    fileList,
    isLoading,
    setFileList,
    onSubmitInfo,
    changeChacked,
    setChangeChacked,
    onSubmitPassword,
    contextHolder,
  } = useSettings();

  return (
    <Wrapper>
      <Header>
        <Title>Sozlamalar</Title>
      </Header>
      <form onSubmit={form1.handleSubmit(onSubmitInfo)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Upload
              fileList={fileList}
              setFileList={setFileList}
              maxCount={1}
              multiple={false}
            />
          </Col>
          <Col span={24} lg={12}>
            <Input
              control={form1.control}
              name="firstname"
              label="Ism sharifingiz"
              placeholder="Ism sharifingiz"
            />
          </Col>
          {user?.is_worker || user?.is_stock ? null : (
            <>
              <Col span={24} lg={12}>
                <PhoneInput
                  control={form1.control}
                  name="phone"
                  label="Telefon raqamingiz"
                  placeholder="Telefon raqamingiz"
                  disabled={true}
                />
              </Col>
              {/* <Col span={24} lg={24}>
                <CheckboxStyle
                  checked={changeChacked}
                  onChange={() => setChangeChacked(!changeChacked)}
                >
                  Parolni o'zgartirish
                </CheckboxStyle>
              </Col>
              <Col span={24} lg={12}>
                <InputPassword
                  control={form.control}
                  name="old_password"
                  required={false}
                  label="Hozirgi parol"
                  placeholder="Parol"
                  disabled={!changeChacked}
                />
              </Col>
              <Col span={24} lg={12}>
                <InputPassword
                  control={form.control}
                  name="new_password"
                  label="Yangi parol"
                  placeholder="Parol"
                  disabled={!changeChacked}
                />
              </Col>

              <Col span={24} lg={12}>
                <InputPassword
                  control={form.control}
                  name="confirm_password"
                  label="Yangi parolni tasdiqlash"
                  placeholder="Parolni tasdiqlash"
                  disabled={!changeChacked}
                />
              </Col> */}
            </>
          )}

          <Footer>
            <Button name="Saqlash" className="category-btn" type="submit" />
          </Footer>
        </Row>
      </form>
      <form onSubmit={form2.handleSubmit(onSubmitPassword)}>
        <Row gutter={[16, 16]}>
          {user?.is_worker || user?.is_stock ? null : (
            <>
              <Col span={24} lg={24}>
                <CheckboxStyle
                  checked={changeChacked}
                  onChange={() => setChangeChacked(!changeChacked)}
                >
                  Parolni o'zgartirish
                </CheckboxStyle>
              </Col>
              <Col span={24} lg={12}>
                <InputPassword
                  control={form2.control}
                  name="old_password"
                  required={false}
                  label="Hozirgi parol"
                  placeholder="Parol"
                  disabled={!changeChacked}
                />
              </Col>
              <Col span={24} lg={12}>
                <InputPassword
                  control={form2.control}
                  name="new_password"
                  label="Yangi parol"
                  placeholder="Parol"
                  disabled={!changeChacked}
                />
              </Col>

              <Col span={24} lg={12}>
                <InputPassword
                  control={form2.control}
                  name="confirm_password"
                  label="Yangi parolni tasdiqlash"
                  placeholder="Parolni tasdiqlash"
                  disabled={!changeChacked}
                />
              </Col>
              <Footer>
                <Button
                  disabled={!changeChacked}
                  name="Saqlash"
                  className="category-btn"
                  type="submit"
                />
              </Footer>
            </>
          )}
        </Row>
      </form>
      {isLoading && <Spinner />}
      {contextHolder}
    </Wrapper>
  );
};

export default Settings;
