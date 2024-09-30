import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Footer, Header, Title, Wrapper } from "@/styles/global";
import { Col, Row } from "antd";
import { useConfirm } from "../hooks/useConfirm";
import Upload from "@/components/upload";
import { Spinner } from "@/components/spinner";
import { Select } from "@/components/select";
import { useNavigate, useParams } from "react-router-dom";
import { useReset } from "../hooks/useReset";

const CreateCategory = () => {
  const navigate = useNavigate();
  const { confirm, form, fileList, setFileList, isLoading, categoryList } =
    useConfirm();
  const { id } = useParams();
  const { isLoading: detailLoading } = useReset({
    form,
    fileList,
    setFileList,
  });

  console.log("categoryList",categoryList)

  return (
    <Wrapper>
      <Header>
        <Title>{id ? "Kategoriyani yangilash" : "Kategoriya yaratish"} </Title>
        <Button
          name="Orqaga"
          onClick={() => navigate("/admin/categories")}
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
                name="name_uz"
                label="Name uz"
                placeholder="Name uz"
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                control={form.control}
                name="name_ru"
                label="Name ru"
                placeholder="Name ru"
              />
            </Col>
            <Col span={24} lg={12}>
              <Select
                control={form.control}
                name="parent"
                label="Parent"
                placeholder="Parent"
                options={categoryList}
              />
            </Col>
          </Row>
          <Footer>
            <Button
              name={id ? "Yangilash" : "Kategoriya yaratish"}
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

export default CreateCategory;
