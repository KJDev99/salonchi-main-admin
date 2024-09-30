import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./useList";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Col, Row } from "antd";
import { Pagination } from "@/components/pagination";
import { Spinner } from "@/components/spinner";
import { HStack, Text } from "./style";
import { DoubleRangePicker } from "@/components/double-datepicker";
import { NumberFormat } from "@/components/number-format";

const Expenses = () => {
  const {
    form,
    data,
    count,
    params,
    columns,
    onCreate,
    isLoading,
    setParams,
    contextHolder,
    deleteLoading,
    createIsLoading,
  } = useList();

  console.log(data, "data");
  return (
    <Wrapper>
      {contextHolder}
      <Header className="expenses-header">
        <Title>Harajatlar</Title>
      </Header>
      <form
        onSubmit={form.handleSubmit(onCreate)}
        style={{ padding: "0 0 32px 0" }}
      >
        <Row gutter={[16, 16]} align="bottom">
          <Col span={12} lg={10}>
            <Input
              control={form.control}
              name="reason"
              placeholder="Harajat matni"
              label="Harajat matni"
            />
          </Col>
          <Col span={12} lg={4}>
            <Input
              control={form.control}
              name="amount"
              placeholder="Harajat summasi"
              label="Harajat summasi"
              type="number"
            />
          </Col>
          <Col span={12} lg={4} />
          <Col
            span={12}
            lg={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              name="Kiritish"
              style={{ width: 120, height: 35 }}
              type="submit"
              disabled={
                form.watch("amount") === null || form.watch("reason") === ""
              }
            />
          </Col>
        </Row>
        <HStack>
          <DoubleRangePicker
            control={form.control}
            name="filter"
            label="Sanani tanlang"
          />
          <Text>
            Jami harajat:{" "}
            <NumberFormat
              value={data?.reduce((prev, next) => prev + next?.amount, 0)}
            />{" "}
            so`m
          </Text>
        </HStack>
      </form>
      <CustomTable columns={columns} data={data} loading={isLoading} />
      <Pagination params={params} setParams={setParams} total={count} />
      {createIsLoading || (deleteLoading && <Spinner />)}
    </Wrapper>
  );
};

export default Expenses;
