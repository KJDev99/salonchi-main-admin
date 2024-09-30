import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./useList";
import { Pagination } from "@/components/pagination";

const Ikpu = () => {
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
      {contextHolder}
      <Wrapper>
        <Header>
          <Title>Ikpu</Title>
        </Header>
        <CustomTable
          columns={columns}
          data={data}
          loading={isLoading || isFetching}
        />
      </Wrapper>
      <Pagination total={count} params={params} setParams={setParams} />
    </>
  );
};

export default Ikpu;
