import { Select } from "@/components/select";
import { Wrapper } from "@/styles/global";
import { Col, Row } from "antd";
import { status } from "./constants";
import { CustomTable } from "@/components/table";
import { useList } from "./useList";
import { Pagination } from "@/components/pagination";

const WholesaleCustomers = () => {
  const { form, params, columns, setParams, rows, contextHolder } = useList();

  return (
    <Wrapper>
      {contextHolder}
      <Row style={{ marginBottom: 20 }}>
        <Col span={12} lg={6}>
          <Select
            control={form.control}
            options={status}
            name="status"
            placeholder="Status"
          />
        </Col>
      </Row>
      <CustomTable columns={columns} data={rows} loading={false} />
      <Pagination total={10} params={params} setParams={setParams} />
    </Wrapper>
  );
};

export default WholesaleCustomers;
