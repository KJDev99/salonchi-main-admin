import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./useList";
import { Pagination } from "@/components/pagination";

const RecordsTable = () => {
  const { records, columns, isLoading, count, params, setParams } = useList();
  return (
    <Wrapper>
      <Header>
        <Title>Qo&lsquo;ng&apos;iroqlar</Title>
      </Header>
      <CustomTable columns={columns} data={records?.data} loading={isLoading} />
      <Pagination total={count} params={params} setParams={setParams} />
    </Wrapper>
  );
};

export default RecordsTable;
