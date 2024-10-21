/* eslint-disable react/no-unescaped-entities */
// import Upload from "@/components/upload";
import {
  Footer,
  Header,
  Title,
  Wrapper,
  Input as CustomInput,
  Label,
} from "@/styles/global";
import { Col, notification, Row } from "antd";
import { useSettings } from "./useSettings";
// import { Input } from "@/components/input";
import { PhoneInput } from "@/components/phone-input";
import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/button";
import { getUser } from "@/utils/user";
import { CheckboxStyle } from "./style";
import { Spinner } from "@/components/spinner";
import { useEffect, useState } from "react";
import { CloudUploadOutlined, DeleteFilled } from "@ant-design/icons";
import styles from "./styles.module.css";
import { request } from "@/shared/api/request";
const Settings = () => {
  const user = getUser();
  const {
    form1,
    form2,
    isLoading,
    onSubmitInfo,
    changeChacked,
    setChangeChacked,
    onSubmitPassword,
  } = useSettings();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const getFileUrl = async (e) => {
    e.preventDefault();
    // console.log("e.target.files[0]", e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const response = await request.post("upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      setImage(response.data.file);
    }
  };
  useEffect(() => {
    const getCurrentValue = async () => {
      const res = await request.get("admin/worker/detail");
      if (res.status === 200) {
        const { firstname, photo } = res.data;
        setName(firstname);
        setImage(photo);
      }
      console.log(res);
    };
    getCurrentValue();
  }, []);
  // const getCurrentValue = async () => {};
  const onSubmit = async () => {
    const res = await request.patch("admin/worker/detail", {
      firstname: name,
      photo: image,
    });
    if (res.status === 200) {
      api["success"]({
        message: "Success",
        description: "Sozlamalar muvaffaqiyatli yangilandi.",
      });
    }
  };
  return (
    <Wrapper>
      <Header>
        <Title>Sozlamalar</Title>
      </Header>
      <form onSubmit={form1.handleSubmit(onSubmitInfo)}>
        <Row gutter={[16, 16]}>
          <Col span={4}>
            {!image ? (
              <>
                <label htmlFor="categoryLogo" className={styles.imageUploading}>
                  <CloudUploadOutlined />
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: "12px",
                    }}
                  >
                    Rasm yuklang
                  </div>
                </label>
                <input
                  type="file"
                  name="categoryLogo"
                  accept="image/*"
                  id="categoryLogo"
                  style={{ display: "none" }}
                  onChange={(e) => getFileUrl(e, 0)}
                />
              </>
            ) : (
              <>
                <div className={styles.imageItem}>
                  <p
                    className={styles.delete}
                    onClick={() => setImage(null)}
                    // style={{ backgroundColor: "white" }}
                  >
                    <DeleteFilled color="red" background="red" />
                  </p>
                  <img
                    className={styles.categoryLogo}
                    src={image}
                    alt="productImage"
                    width={80}
                    height={80}
                  />
                </div>
              </>
            )}
          </Col>
          <Col span={20}></Col>
          <Col span={24} lg={12}>
            <Label>Ism sharifingiz</Label>
            <CustomInput
              onChange={(e) => setName(e.target.value)}
              value={name}
              // className={errors[name] ? "input-error" : ""}
              // onBlur={onBlur}
            />
            {/* <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              control={form1.control}
              name="firstname"
              label="Ism sharifingiz"
              placeholder="Ism sharifingiz"
            /> */}
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
            <Button
              name="Saqlash"
              className="category-btn"
              onClick={onSubmit}
              // loading={isLoading}
              // type="submit"
            />
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
