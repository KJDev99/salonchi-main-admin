import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./useList";
import { Pagination } from "@/components/pagination";

const Customerbase = () => {
  const { count, data, columns, params, isLoading, setParams } = useList();

  return (
    <Wrapper>
      <Header>
        <Title>Mijozlar bazasi</Title>
      </Header>
      <CustomTable columns={columns} data={data} loading={isLoading} />
      <Pagination params={params} setParams={setParams} total={count} />
    </Wrapper>
  );
};

export default Customerbase;
