import { Button } from "@/components/button";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./hooks/useList";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "@/constants/router";
import { Pagination } from "@/components/pagination";
import { CustomCheckboxTable } from "@/components/checkbox-table";
import { CustomTable } from "@/components/table";
import { request } from "@/shared/api/request";

const Products = () => {
  const navigate = useNavigate();
  const {
    data,
    count,
    params,
    columns,
    setParams,
    isLoading,
    isFetching,
    isSuperUser,
    contextHolder,
    selectedRowKeys,
    setSelectedRowKeys,
  } = useList();

  const handleMerge = async () => {
    try {
      const res = await request.get("billz/integration/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Wrapper>
        <Header>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Title>Maxsulotlar</Title>
              <Button
                name="Maxsulot yaratish"
                onClick={() => navigate(ROUTER.CREATE)}
              />
            </div>
            <Button name="Birlashtirish" onClick={handleMerge} />
          </div>
        </Header>
        {isSuperUser ? (
          <CustomCheckboxTable
            columns={columns}
            data={data}
            loading={isLoading || isFetching}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
          />
        ) : (
          <CustomTable
            columns={columns}
            data={data}
            loading={isLoading || isFetching}
          />
        )}
      </Wrapper>
      <Pagination total={count} params={params} setParams={setParams} />
      {contextHolder}
    </>
  );
};

export default Products;
