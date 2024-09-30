import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./useList";
import { Pagination } from "@/components/pagination";
import { Col, Modal, Row } from "antd";
import { CustomTextArea } from "@/components/textarea";
import { DoubleRangePicker } from "@/components/double-datepicker";

const ReCall = () => {
  const {
    form,
    columns,
    data,
    count,
    isLoading,
    params,
    setParams,
    isModalOpen,
    handleOk,
    handleCancel,
    contextHolder,
    isFetching,
  } = useList();
  return (
    <>
      <Wrapper>
        <Header>
          <Title>Qayta aloqa</Title>
        </Header>
        <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
          <Col span={24} lg={8}>
            <DoubleRangePicker
              name="date"
              control={form.control}
              label="Buyurtma sanasi"
              placeholde="Buyurtma sanasi"
              // disabled
            />
          </Col>
        </Row>
        <CustomTable
          columns={columns}
          data={data}
          loading={isLoading || isFetching}
        />
      </Wrapper>
      <Pagination total={count} params={params} setParams={setParams} />
      {isModalOpen && (
        <Modal
          title="Rad etish"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="Bekor qilish"
          okText="Rad etish"
        >
          <CustomTextArea
            name="comment"
            placeholder="Izoh qoldiring..."
            control={form.control}
          />
        </Modal>
      )}
      {contextHolder}
    </>
  );
};

export default ReCall;
