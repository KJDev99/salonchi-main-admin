import { Button } from "@/components/button";
import { Footer, Header, Title, Wrapper } from "@/styles/global";
import { useConfirm } from "../hooks/useConfirm";
import { Input } from "@/components/input";
import { Col, Row, Segmented } from "antd";
import { InputPassword } from "@/components/input-password";
import { roles } from "@/constants/roles";
import { Spinner } from "@/components/spinner";
import { PhoneInput } from "@/components/phone-input";
import { useNavigate, useParams } from "react-router-dom";

const StaffCrud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { form, confirm, value, setValue, isLoading, contextHolder } =
    useConfirm();
  return (
    <Wrapper>
      <Header>
        <Title>Hodim yaratish </Title>
        <Button name="Orqaga" onClick={() => navigate("/admin/staff")} />
      </Header>
      <form onSubmit={form.handleSubmit(confirm)}>
        {contextHolder}
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12}>
            <Input
              control={form.control}
              name="firstname"
              label="Ism va familiya"
              placeholder="Ism va familiya"
            />
          </Col>
          <Col span={24} lg={12}>
            <PhoneInput
              control={form.control}
              name="phone"
              label="Telefon raqam"
              placeholder="Telefon raqam"
            />
          </Col>
          <Col span={24} lg={12}>
            <InputPassword
              control={form.control}
              name="password"
              label="Parol"
              placeholder="Parol"
            />
          </Col>
          <Col span={24} lg={12}>
            <InputPassword
              control={form.control}
              name="password2"
              label="Parolni takrorlang"
              placeholder="Parol takrorlang"
            />
          </Col>
          {value === "Ishchi" && (
            <Col span={24} lg={12}>
              <Input
                control={form.control}
                name={"salary"}
                label="Har bir sotuv uchun to'lov"
                placeholder="Maxsulot miqdori"
                type="number"
              />
            </Col>
          )}
          <Col span={24} lg={12}>
            <p style={{ marginBottom: "8px", padding: "0" }}>
              Lavozimni tanlang
            </p>
            <Segmented options={roles} value={value} onChange={setValue} />
          </Col>
        </Row>
        <Footer>
          <Button
            name={id ?"Hodim taxrirlash": "Hodim yaratish"}
            className="category-btn"
            type="submit"
          />
        </Footer>
      </form>
      {isLoading && <Spinner />}
    </Wrapper>
  );
};

export default StaffCrud;
