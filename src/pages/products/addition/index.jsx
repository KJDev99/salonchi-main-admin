/* eslint-disable react/prop-types */
import { CheckboxCustom } from "@/components/checkbox";
import { Input } from "@/components/input";
import { RadioCustom } from "@/components/radio";
import { Col, Row } from "antd";
import { useFormContext } from "react-hook-form";

export default function AdditionCrud() {
  const form = useFormContext();

  return (
    <>
      <Row>
        <Col span={24}>
          <h4
            style={{
              color: "#212121",
              fontFamily: "Rubik",
              fontSize: "18px",
              fontWeight: 400,
              margin: "30px 0 20px 0",
            }}
          >
            Mahsulot joylanadigan bo’lim
          </h4>
        </Col>
        <Col span={24} md={6} lg={6}>
          <CheckboxCustom
            control={form.control}
            name="is_recommend"
            label="Tavsiya etilganlar"
          />
        </Col>
        <Col span={24} md={6} lg={6}>
          <CheckboxCustom
            control={form.control}
            name="is_new"
            label="Yangiliklar"
          />
        </Col>
        <Col span={24} md={6} lg={6}>
          <CheckboxCustom
            control={form.control}
            name="is_cheap"
            label="Arzon narxlar"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <h4
            style={{
              color: "#212121",
              fontFamily: "Rubik",
              fontSize: "18px",
              fontWeight: 400,
              margin: "30px 0 20px 0",
            }}
          >
            Oqim yaratish imkoni
          </h4>
        </Col>

        <Col span={24} lg={12}>
          <RadioCustom
            control={form.control}
            name="is_flow"
            options={[
              { label: "Ha", value: "yes" },
              { label: "Yo'q", value: "no" },
            ]}
          />
        </Col>
        {form.watch("is_flow") === "yes" ? (
          <Col span={24} lg={12}>
            <Input
              control={form.control}
              name={"flow_price"}
              label={"Oqim uchun to’lanadigan summa"}
              placeholder={"Summasi"}
              type="number"
            />
          </Col>
        ) : (
          <Col span={24} lg={12} />
        )}

        <Col span={24} lg={12} style={{ marginTop: 24 }}>
          <Input
            control={form.control}
            name={"wholesale_price"}
            label={"Optom narxi"}
            placeholder={"Optom narxi"}
            type="number"
          />
        </Col>
      </Row>
    </>
  );
}
