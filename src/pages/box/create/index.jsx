import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Spinner } from '@/components/spinner';
import { Footer, Header, Title, Wrapper } from '@/styles/global';
import { Col, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreate } from '../hooks/useCreate';
import Upload from '@/components/upload';
import { useReset } from '../hooks/useReset';

const CreateBox = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { form, confirm, fileList, isLoading, setFileList, contextHolder } =
    useCreate();
  const { isLoading: detailLoading } = useReset({ form, setFileList });

  return (
    <Wrapper>
      {contextHolder}
      <Header>
        <Title>{id ? 'Boxni yangilash' : 'Box yaratish'} </Title>
        <Button
          name="Orqaga"
          onClick={() => navigate('/admin/categories')}
          className="go-back-btn"
        />
      </Header>
      {id && detailLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={form.handleSubmit(confirm)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Upload
                fileList={fileList}
                setFileList={setFileList}
                multiple={false}
                maxCount={1}
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                control={form.control}
                name="price"
                label="Narxi"
                placeholder="Narxi"
                type="number"
              />
            </Col>
          </Row>
          <Footer>
            <Button
              name={id ? 'Yangilash' : 'Kategoriya yaratish'}
              className="category-btn"
              type="submit"
            />
          </Footer>
        </form>
      )}
      {isLoading && <Spinner />}
    </Wrapper>
  );
};

export default CreateBox;
