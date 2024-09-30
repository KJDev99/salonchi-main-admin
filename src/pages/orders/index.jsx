import { CustomTable } from '@/components/table';
import { Header, Title, Wrapper } from '@/styles/global';
import { useList } from './hooks/useList';
import { Filter } from './style';
import { Select } from '@/components/select';
import { status } from '@/constants/status';
import { Col, Row } from 'antd';
import { DoubleRangePicker } from '@/components/double-datepicker';
import { Pagination } from '@/components/pagination';
import { FormProvider } from 'react-hook-form';
import { CancelModal } from './components/cancel-modal';
import { CancelFromCourier } from './components/cancel-from-courier-modal';
import { ReCallModal } from './components/re-call-modal';

const Orders = () => {
  const {
    columns,
    data,
    isLoading,
    form,
    isModalOpen,
    params,
    setParams,
    handleOk,
    handleCancel,
    contextHolder,
    count,
    isFetching,
    isnotDeliveryOpen,
    handleDeliveryOk,
    handleDeliveryCancel,
    isreCallOpen,
    handleReCallOk,
    handleReCallCancel,
  } = useList();

  return (
    <>
      <Wrapper>
        {contextHolder}
        <FormProvider {...form}>
          <Header className="order-header">
            <Title>Buyurtmalar</Title>
          </Header>
          <Filter>
            <Row gutter={[16, 16]}>
              <Col span={24} lg={8}>
                <Select
                  name="status"
                  control={form.control}
                  options={status}
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
          </Filter>
          <CustomTable
            columns={columns}
            data={data}
            loading={isLoading || isFetching}
          />
          <CancelModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
          <CancelFromCourier
            isnotDeliveryOpen={isnotDeliveryOpen}
            handleDeliveryOk={handleDeliveryOk}
            handleDeliveryCancel={handleDeliveryCancel}
          />
          <ReCallModal
            isreCallOpen={isreCallOpen}
            handleReCallOk={handleReCallOk}
            handleReCallCancel={handleReCallCancel}
          />
        </FormProvider>
      </Wrapper>
      <Pagination total={count} params={params} setParams={setParams} />
    </>
  );
};

export default Orders;
