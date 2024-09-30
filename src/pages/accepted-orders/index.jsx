import { CustomTable } from '@/components/table';
import { Header, Title, Wrapper } from '@/styles/global';
import { useList } from './useList';
import { Pagination } from '@/components/pagination';

const AcceptedOrders = () => {
  const { columns, data, isLoading, contextHolder, params, setParams, count } =
    useList();

  return (
    <>
      <Wrapper>
        <Header className="order-header" style={{ margin: '0 0 32px 0' }}>
          <Title>Qabul qilingan buyurtmalar</Title>
        </Header>
        <CustomTable columns={columns} data={data} loading={isLoading} />
        {contextHolder}
      </Wrapper>
      <Pagination total={count} params={params} setParams={setParams} />
    </>
  );
};

export default AcceptedOrders;
