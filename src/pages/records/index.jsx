import { DoubleRangePicker } from "@/components/double-datepicker";
import { Input } from "@/components/input";
import { Pagination } from "@/components/pagination";
import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./useList";

const Records = () => {
  const { form, records, columns, isLoading, count, params, setParams } =
    useList();

  return (
    <Wrapper>
      <Header style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}>
        <Title>Qo&lsquo;ng&apos;iroqlar</Title>
        <div className="filter">
          <div className="search">
            <Input
              control={form.control}
              name="search"
              placeholder="Qidirish"
              label="Qidirish"
            />
          </div>
          <div className="date">
            <DoubleRangePicker
              control={form.control}
              name="filter"
              label="Sanani tanlang"
            />
          </div>
        </div>
      </Header>
      <CustomTable columns={columns} data={records?.data} loading={isLoading} />
      <Pagination total={count} params={params} setParams={setParams} />
    </Wrapper>
  );
};

export default Records;
