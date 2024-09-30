import { CustomTable } from '@/components/table';
import { Header, Title, Wrapper } from '@/styles/global';
import { useList } from './useList';
import { Pagination } from '@/components/pagination';
import { Col, Row } from 'antd';
import { Select } from '@/components/select';
import { DoubleRangePicker } from '@/components/double-datepicker';
import { archive_status } from '@/constants/archive-status';

const Archive = () => {
  const { form, isLoading, data, columns, params, setParams, count } =
    useList();

  return (
    <>
      <Wrapper>
        <Header className="order-header">
          <Title>Arxiv</Title>
        </Header>

        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
          <Col span={24} lg={8}>
            <Select
              name="status"
              control={form.control}
              options={archive_status}
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
        <CustomTable key={1} columns={columns} data={data} loading={isLoading} />
      </Wrapper>
      <Pagination total={count} params={params} setParams={setParams} />
    </>
  );
};

export default Archive;
