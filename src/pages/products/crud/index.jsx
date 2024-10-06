import { Button } from "@/components/button";
import { Footer, Header, Title, Wrapper } from "@/styles/global";
import { useConfirm } from "../hooks/useConfirm";
import { Col, Row, Button as AntdButton, Select } from "antd";
// import Upload from "@/components/upload";
// import { Input } from "@/components/input";
// import { Select } from "@/components/select";
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
import { FormGroupProvider, Label, Input, Error } from "@/styles/global";
import {
  CloseOutlined,
  CloudUploadOutlined,
  DeleteFilled,
} from "@ant-design/icons";
// import UploadVideo from "@/components/upload_video";
import { request } from "@/shared/api/request";
import styles from "./product.module.css";
import { useState } from "react";
import UploadVideo from "@/components/upload_video";
import { VideoWrapper } from "@/components/upload_video/style";
const CreateProducts = () => {
  const navigate = useNavigate();
  const user = getUser();
  const is_stock = user?.is_stock;
  const [images, setImages] = useState([]);
  const [videoLink, setVideoLink] = useState(null);
  const [attributes, setAttributes] = useState([
    { type: "TEXT", name_uz: "", name_ru: "", values: [] },
  ]);
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
    videoFile,
  } = useConfirm();
  const getFileUrl = async (e, video) => {
    e.preventDefault();
    // console.log("e.target.files[0]", e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const response = await request.post("upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      if (video) {
        setVideoLink(response.data.file);
      } else {
        setImages([...images, response.data.file]);
      }
      // console.log(images);
    }
  };
  const handleSubmit = async () => {
    const data = {
      // name_uz: form.getValues().name_uz,
      // name_ru: form.getValues().name_ru,
      // name_en: form.getValues().name_en,
      // description_uz: form.getValues().description_uz,
      // description_ru: form.getValues().description_ru,
      // description_en: form.getValues().description_en,
      // category: form.getValues().category,
      // price: form.getValues().price,
      // is_popular: form.getValues().is_popular,
      attributes,
    };
    console.log(fields, "fields");
    console.log(data, "data");
  };
  const types = [
    { label: "TEXT", value: "TEXT" },
    { label: "COLOR", value: "COLOR" },
    { label: "IMAGE", value: "IMAGE" },
  ];
  const { id, detailLoading } = useReset({ form, setFileList, setVideoFile });
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
        <form>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className={styles.imageContainer}>
                {images.length > 0 &&
                  images.map((image) => (
                    <img
                      key={image}
                      className={styles.categoryLogo}
                      src={image}
                      alt="productImage"
                      width={80}
                      height={80}
                    />
                  ))}
                <>
                  <label
                    htmlFor="categoryLogo"
                    className={styles.imageUploading}
                  >
                    <CloudUploadOutlined />
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: "12px",
                      }}
                    >
                      Rasm yuklang
                    </div>
                  </label>
                  <input
                    type="file"
                    name="categoryLogo"
                    id="categoryLogo"
                    style={{ display: "none" }}
                    onChange={(e) => getFileUrl(e, 0)}
                  />
                </>
              </div>
              {videoLink ? (
                <VideoWrapper>
                  <video
                    src={videoLink}
                    width="400px"
                    height="250px"
                    controls
                  ></video>
                  <CloseOutlined
                    onClick={() => {
                      // setUrl(null);
                      setVideoLink(null);
                    }}
                    className="icon"
                  />
                </VideoWrapper>
              ) : (
                <>
                  <label
                    style={{ marginTop: "10px" }}
                    htmlFor="videoLink"
                    className={styles.imageUploading}
                  >
                    <CloudUploadOutlined />
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: "12px",
                      }}
                    >
                      Video yuklang
                    </div>
                  </label>
                  <input
                    type="file"
                    name="videoLink"
                    id="videoLink"
                    style={{ display: "none" }}
                    onChange={(e) => getFileUrl(e, true)}
                  />
                </>
              )}
              {/* <UploadVideo setVideoFile={setVideoFile} videoFile={videoFile} /> */}
              {/* <Upload fileList={fileList} setFileList={setFileList} /> */}
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
                {attributes.map((item, index) => {
                  return (
                    <ListItem key={index}>
                      <Input
                        placeholder="Attribut nomi ru"
                        value={item?.name_ru}
                        onChange={(e) => {
                          attributes[index].name_ru = e.target.value;
                          setAttributes([...attributes]);
                        }}
                      />
                      <Input
                        placeholder="Attribut nomi uz"
                        value={item?.name_uz}
                        onChange={(e) => {
                          attributes[index].name_uz = e.target.value;
                          setAttributes([...attributes]);
                        }}
                      />
                      {/* <Input
                        control={form.control}
                        value={item?.name_ru}
                        onChange={(e) => {
                          const newItem = { ...item, name_ru: e.target.value };
                          attributes[index] = newItem;
                        }}
                        name={`attributes.${index}.name_ru`}
                        placeholder="Attribut nomi ru"
                        label="Attribut nomi ru"
                      /> */}
                      {/* <Input
                        value={item?.name_ru}
                        onChange={(e) => {
                          attributes[index].name_ru = e.target.value;
                          setAttributes([...attributes]);
                        }}
                        control={form.control}
                        name={`attributes.${index}.name_uz`}
                        placeholder="Attribut nomi uz"
                        label="Attribut nomi uz"
                      /> */}
                      <Select
                        defaultValue={item?.type}
                        style={{ width: "100%" }}
                        options={types}
                        onChange={(value) => {
                          attributes[index].type = value;
                          setAttributes([...attributes]);
                        }}
                      />
                      <Select
                        mode="tags"
                        style={{ width: "100%" }}
                        onChange={(value) => {
                          if (item.type === "TEXT") {
                            console.log(value);
                            const valuee = [];
                            value.map((v) => {
                              valuee.push({
                                value: v,
                                label: v,
                              });
                            });
                            attributes[index].values = [...valuee];
                            setAttributes([...attributes]);
                          }
                          // const arr = [...item.values, value];
                          // attributes[index].values = [...arr];
                          // setAttributes([...attributes]);
                        }}
                        options={[]}
                      />
                      {/* <CreateSelect
                        control={form.control}
                        name={`attributes.${index}.name_uz`}
                        placeholder="Attribut qiymati"
                        options={[]}
                      /> */}
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
                    setAttributes([
                      ...attributes,
                      {
                        name_uz: "",
                        name_ru: "",
                        type: "TEXT",
                        values: [],
                      },
                    ]);
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
              onClick={() => handleSubmit()}
              // type="submit"
            />
          </Footer>
        </form>
      )}

      {isLoading && <Spinner />}
    </Wrapper>
  );
};

export default CreateProducts;
