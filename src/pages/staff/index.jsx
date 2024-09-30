import { Button } from '@/components/button';
import { CustomTable } from '@/components/table';
import { ROUTER } from '@/constants/router';
import { Header, Title, Wrapper } from '@/styles/global';
import { useNavigate } from 'react-router-dom';
import { useList } from './hooks/useList';
import { Pagination } from '@/components/pagination';

const Staff = () => {
  const navigate = useNavigate();
  const { staff, columns, isLoading, contextHolder, count, params, setParams } =
    useList();
  return (
    <Wrapper>
      {contextHolder}
      <Header>
        <Title>Hodimlar</Title>
        <Button name="Hodim yaratish" onClick={() => navigate(ROUTER.CREATE)} />
      </Header>
      <CustomTable columns={columns} data={staff?.data} loading={isLoading} />
      <Pagination total={count} params={params} setParams={setParams} />
    </Wrapper>
  );
};

export default Staff;
