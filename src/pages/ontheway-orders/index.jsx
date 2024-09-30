import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./useList";
import { Pagination } from "@/components/pagination";
import { Col, Modal, Row } from "antd";
import { CustomTextArea } from "@/components/textarea";
import { Select } from "@/components/select";
import { DoubleRangePicker } from "@/components/double-datepicker";
import { ontheway_status } from "@/constants/ontheway-status";

const OnTheWayOrders = () => {
  const {
    form,
    columns,
    data,
    isLoading,
    contextHolder,
    params,
    setParams,
    count,
    isModalOpen,
    handleCancel,
    handleOk,
    isFetching,
  } = useList();

  return (
    <>
      <Wrapper>
        <Header className="order-header">
          <Title>Kuryerga chiqarilgan buyurtmalar</Title>
        </Header>
        <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
          <Col span={24} lg={8}>
            <Select
              name="status"
              control={form.control}
              options={ontheway_status}
              label="Buyurtma holati"
              placeholder="Buyurtma statusini tanlang"
            />
          </Col>
          <Col span={24} lg={8}>
            <DoubleRangePicker
              name="date"
              control={form.control}
              label="Buyurtma sanasi"
              placeholde="Buyurtma sanasi"
            />
          </Col>
        </Row>
        <CustomTable
          columns={columns}
          data={data}
          loading={isLoading || isFetching}
        />
        {contextHolder}
        {isModalOpen && (
          <Modal
            title="Buyurtmani rad etish"
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
      </Wrapper>
      <Pagination total={count} params={params} setParams={setParams} />
    </>
  );
};

export default OnTheWayOrders;
