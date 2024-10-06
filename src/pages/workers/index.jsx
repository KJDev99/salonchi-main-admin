import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./useList";
import { Pagination } from "@/components/pagination";

const WorkersTable = () => {
  const { columns, data, isLoading, contextHolder, count, params, setParams } =
    useList();

  return (
    <>
      <Wrapper>
        <Header>
          <Title>Ishchilar ro`yxati</Title>
        </Header>
        <CustomTable columns={columns} data={data} loading={isLoading} />
        {contextHolder}
      </Wrapper>
      <Pagination total={count} params={params} setParams={setParams} />
    </>
  );
};

export default WorkersTable;
