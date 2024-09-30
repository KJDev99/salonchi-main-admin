import { Button } from "@/components/button";
import { Input } from "@/components/input";
import {
  Footer,
  FormGroupProvider,
  Header,
  Label,
  Title,
  Wrapper,
} from "@/styles/global";
import { Col, Row, Radio } from "antd";
import { useConfirm } from "../hooks/useConfirm";
import Upload from "@/components/upload";
import { Spinner } from "@/components/spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useReset } from "../hooks/useReset";

const CreateBanner = () => {
  const navigate = useNavigate();
  const {
    confirm,
    form,
    fileListuz,
    setFileListuz,
    fileListru,
    setFileListru,
    mfileListuz,
    setMFileListuz,
    mfileListru,
    setMFileListru,
    isLoading,
    onChange,
    value,
    setValue,
    contextHolder,
  } = useConfirm();

  const { id } = useParams();
  const { isLoading: detailLoading } = useReset({
    form,
    fileListuz,
    setFileListuz,
    fileListru,
    setFileListru,
    setMFileListuz,
    setMFileListru,
    setValue,
    value,
  });
  return (
    <Wrapper>
      {contextHolder}
      <Header>
        <Title>{id ? "Bannerni yangilash" : "Banner qo'shish"} </Title>
        <Button
          name="Orqaga"
          onClick={() => navigate("/admin/slider")}
          className="go-back-btn"
        />
      </Header>
      {id && detailLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={form.handleSubmit(confirm)}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={12}>
              <FormGroupProvider>
                <Label>Banner uchun rasm uz*</Label>
                <Upload
                  fileList={fileListuz}
                  setFileList={setFileListuz}
                  multiple={false}
                  maxCount={1}
                />
              </FormGroupProvider>
            </Col>
            <Col span={24} lg={12}>
              <FormGroupProvider>
                <Label>Banner uchun rasm ru*</Label>
                <Upload
                  fileList={fileListru}
                  setFileList={setFileListru}
                  multiple={false}
                  maxCount={1}
                />
              </FormGroupProvider>
            </Col>
            <Col span={24} lg={12}>
              <FormGroupProvider>
                <Label>Mobile Banner uchun rasm uz*</Label>
                <Upload
                  fileList={mfileListuz}
                  setFileList={setMFileListuz}
                  multiple={false}
                  maxCount={1}
                />
              </FormGroupProvider>
            </Col>
            <Col span={24} lg={12}>
              <FormGroupProvider>
                <Label>Mobile Banner uchun rasm ru*</Label>
                <Upload
                  fileList={mfileListru}
                  setFileList={setMFileListru}
                  multiple={false}
                  maxCount={1}
                />
              </FormGroupProvider>
            </Col>
            <Col span={24} lg={12}>
              <Input
                control={form.control}
                name="url"
                label="Banner url*"
                placeholder="Banner url"
              />
            </Col>
            {/* <Col span={24} lg={12}>
              <Input
                control={form.control}
                name="title_uz"
                label="Title uz"
                placeholder="Title uz"
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                control={form.control}
                name="title_ru"
                label="Title ru"
                placeholder="Title ru"
              />
            </Col> */}

            {/* <Col span={24} lg={24}>
              <FormGroupProvider>
                <Label>Bannerda button bormi?</Label>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={0}>Yo`q</Radio>
                  <Radio value={1}>Ha</Radio>
                </Radio.Group>
              </FormGroupProvider>
            </Col>
            {value ? (
              <>
                <Col span={24} lg={12}>
                  <Input
                    control={form.control}
                    name="button_name_uz"
                    label="Button uz"
                    placeholder="Button uz"
                  />
                </Col>
                <Col span={24} lg={12}>
                  <Input
                    control={form.control}
                    name="button_name_ru"
                    label="Button ru"
                    placeholder="Button ru"
                  />
                </Col>
                <Col span={24} lg={12}>
                  <Input
                    control={form.control}
                    name="button_url"
                    label="Button url"
                    placeholder="Button url"
                  />
                </Col>
              </>
            ) : null} */}
          </Row>
          <Footer>
            <Button
              name={id ? "Yangilash" : "Banner yaratish"}
              className="category-btn"
              type={"submit"}
            />
          </Footer>
        </form>
      )}
      {isLoading && <Spinner />}
    </Wrapper>
  );
};

export default CreateBanner;
