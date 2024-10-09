import { Button } from "@/components/button";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./hooks/useList";
import { CustomTable } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "@/constants/router";
import { Pagination } from "@/components/pagination";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ButtonElement } from "@/components/button/style";

const SubCategories = () => {
  const { columns, data, isLoading, contextHolder, count, params, setParams } =
    useList();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <ButtonElement
        style={{
          width: "auto",
          color: "black",
          padding: "5px 10px",
          backgroundColor: "transparent",
          fontSize: "24px",
        }}
        onClick={() => navigate("/admin/categories")}
      >
        <ArrowLeftOutlined />
      </ButtonElement>
      <Header>
        <Title>Sub Kategoriyalar</Title>
        <Button
          name="Sub Kategoriya yaratish"
          onClick={() => navigate(ROUTER.CREATE)}
        />
      </Header>
      <CustomTable
        // style={{ height: "100px" }}
        columns={columns}
        data={data}
        loading={isLoading}
      />
      <Pagination params={params} setParams={setParams} total={count} />
      {contextHolder}
    </Wrapper>
  );
};

export default SubCategories;
