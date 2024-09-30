import { Select } from "@/components/select";
import { Wrapper } from "@/styles/global";
import { Col, Row } from "antd";
import { status2 } from "./constants";
import { CustomTable } from "@/components/table";
import { useList } from "./useList";
import { Pagination } from "@/components/pagination";

const SellerAdmins = () => {
  const { form, params, columns, setParams, rows, contextHolder,count } = useList();

  return (
    <Wrapper>
      {contextHolder}
      <Row style={{ marginBottom: 20 }}>
        <Col span={12} lg={6}>
          <Select
            control={form.control}
            options={status2}
            name="has_amount"
            placeholder="Status"
            onChange={(value) =>  {
              console.log("value",value);
              setParams({...params, has_amount: value })
            }}
          />
        </Col>
      </Row>
      <CustomTable columns={columns} data={rows} loading={false} />
      <Pagination total={count} params={params} setParams={setParams} />
    </Wrapper>
  );
};

export default SellerAdmins;
