import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./useList";
import { Pagination } from "@/components/pagination";

const OnTheWayOrders = () => {
  const {
    data,
    count,
    params,
    columns,
    setParams,
    isLoading,
    isFetching,
    contextHolder,
  } = useList();

  return (
    <>
      <Wrapper>
        <Header>
          <Title>Kutilayotgan buyurtmalar</Title>
        </Header>
        <CustomTable
          columns={columns}
          data={data}
          loading={isLoading || isFetching}
        />
        {contextHolder}
      </Wrapper>
      <Pagination total={count} params={params} setParams={setParams} />
    </>
  );
};

export default OnTheWayOrders;
