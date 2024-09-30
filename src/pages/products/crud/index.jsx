import { Button } from "@/components/button";
import { Footer, Header, Title, Wrapper } from "@/styles/global";
import { useConfirm } from "../hooks/useConfirm";
import { Col, Row, Button as AntdButton } from "antd";
import Upload from "@/components/upload";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Spinner } from "@/components/spinner";
import { useNavigate } from "react-router-dom";
import { useReset } from "../hooks/useReset";
import TextEditorController from "@/components/text-editor";
import { getUser } from "@/utils/user";
import AdditionCrud from "../addition";
import { CreateSelect } from "@/components/create-select";
import { FormProvider } from "react-hook-form";
import { List, ListItem } from "./style";
import { FaPlus } from "react-icons/fa";
import { DeleteFilled } from "@ant-design/icons";
import UploadVideo from "@/components/upload_video";

const CreateProducts = () => {
  const navigate = useNavigate();
  const user = getUser();
  const is_stock = user?.is_stock;
  const {
    form,
    fields,
    append,
    remove,
    confirm,
    fileList,
    setFileList,
    isLoading,
    categoryList,
    contextHolder,
    setVideoFile,
    videoFile
  } = useConfirm();

  const { id, detailLoading } = useReset({ form, setFileList,setVideoFile });



  return (
    <Wrapper>
      {contextHolder}
      <Header>
        <Title>{id ? "Maxsulotni yangilash" : "Maxsulot yaratish"} </Title>
        <Button
          name="Orqaga"
          onClick={() => navigate("/admin/products")}
          className="go-back-btn"
        />
      </Header>
      {id && detailLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={form.handleSubmit(confirm)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Upload fileList={fileList} setFileList={setFileList} />
            </Col>
             <Col span={24}>
             <UploadVideo setVideoFile={setVideoFile}  videoFile={videoFile} />
             </Col>
            <Col span={24} lg={12}>
              <Input
                control={form.control}
                name="name_uz"
                label="Mahsulot nomi (O’zbek tili)"
                placeholder="Mahsulot nomi (O’zbek tili)"
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                control={form.control}
                name="name_ru"
                label="Mahsulot nomi (Rus tili)"
                placeholder="Mahsulot nomi (Rus tili)"
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                control={form.control}
                name="price"
                label="Sotilish narxi"
                placeholder="Sotilish narxi"
                type="number"
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                control={form.control}
                name="old_price"
                label="Eski narxi"
                placeholder="Eski narxi"
                type="number"
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={12}>
              <TextEditorController
                control={form.control}
                name="desc_uz"
                label="Descrtiption - tasnif (O’zbek)"
                placeholder="Descrtiption - tasnif (O’zbek)"
              />
            </Col>
            <Col span={24} lg={12}>
              <TextEditorController
                control={form.control}
                name="desc_ru"
                label="Descrtiption - tasnif (Rus tili)"
                placeholder="Descrtiption - tasnif (Rus tili)"
              />
            </Col>
            <Col span={24} lg={12}>
              <Select
                control={form.control}
                name="category"
                label="Kategoriyalar"
                placeholder="Kategoriyalar"
                options={categoryList}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
            <Col span={24} lg={12}>
              <List>
                {fields.map((item, index) => {
                  return (
                    <ListItem key={item?.id}>
                      <Input
                        control={form.control}
                        name={`attributes.${index}.name_ru`}
                        placeholder="Attribut nomi ru"
                        label="Attribut nomi ru"
                      />
                        <Input
                        control={form.control}
                        name={`attributes.${index}.name_uz`}
                        placeholder="Attribut nomi uz"
                        label="Attribut nomi uz"
                      />
                      <CreateSelect
                        control={form.control}
                        name={`attributes.${index}.value`}
                        placeholder="Attribut qiymati"
                        options={[]}
                      />
                      <AntdButton
                        icon={<DeleteFilled />}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                        }}
                        className="delete-btn"
                        danger
                        onClick={() => remove(index)}
                      />
                    </ListItem>
                  );
                })}
                <AntdButton
                  icon={<FaPlus />}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    append({ key: "", value: [] });
                  }}
                />
              </List>
            </Col>
          </Row>
          {is_stock && (
            <FormProvider {...form}>
              <AdditionCrud />
            </FormProvider>
          )}
          <Footer>
            <Button
              name={id ? "Yangilash" : "Maxsulot yaratish"}
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

export default CreateProducts;
