import { Button } from '@/components/button';
import { Pagination } from '@/components/pagination';
import { CustomTable } from '@/components/table';
import { ROUTER } from '@/constants/router';
import { Header, Title, Wrapper } from '@/styles/global';
import { useNavigate } from 'react-router-dom';
import { useList } from './hooks/useList';

const Box = () => {
  const navigate = useNavigate();
  const { count, data, params, columns, setParams, isLoading, contextHolder } =
    useList();

  return (
    <Wrapper>
      <Header>
        <Title>Box</Title>
        <Button name="Box yaratish" onClick={() => navigate(ROUTER.CREATE)} />
      </Header>
      <CustomTable columns={columns} data={data} loading={isLoading} />
      <Pagination params={params} setParams={setParams} total={count} />
      {contextHolder}
    </Wrapper>
  );
};

export default Box;
