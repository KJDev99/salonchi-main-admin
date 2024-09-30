import { Header, Title, Wrapper } from "@/styles/global";
import { Button } from "@/components/button";
import { CustomTable } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "@/constants/router";
import { Pagination } from "@/components/pagination";
import { useList } from "./hooks/useList";

const Slider = () => {
  const navigate = useNavigate();
  const { columns, data, params, setParams, count, isLoading, contextHolder } = useList();
  return (
    <Wrapper>
      <Header>
        <Title>Bannerlar</Title>
        <Button
          name="Banner qo'shish"
          onClick={() => navigate(ROUTER.CREATE)}
        />
      </Header>
      <CustomTable columns={columns} data={data} loading={isLoading} />
      <Pagination params={params} setParams={setParams} total={count} />
      {contextHolder}
    </Wrapper>
  );
};

export default Slider;
