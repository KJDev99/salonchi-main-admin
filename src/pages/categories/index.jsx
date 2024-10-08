import { Button } from "@/components/button";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./hooks/useList";
import { CustomTable } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "@/constants/router";
import { Pagination } from "@/components/pagination";

const Categories = () => {
  const { columns, data, isLoading, contextHolder, count, params, setParams } =
    useList();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header>
        <Title>Kategoriyalar</Title>
        <Button
          name="Kategoriya yaratish"
          onClick={() => navigate(ROUTER.CREATE)}
        />
      </Header>
      <CustomTable
        style={{ cursor: "pointer" }}
        columns={columns}
        data={data}
        loading={isLoading}
        onRow={(record) => ({
          onClick: () => {
            navigate(`${record.id}/${ROUTER.SUBCATEGORIES}/`);
          },
        })}
      />
      <Pagination params={params} setParams={setParams} total={count} />
      {contextHolder}
    </Wrapper>
  );
};

export default Categories;
