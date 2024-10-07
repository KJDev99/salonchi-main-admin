import { Button } from "@/components/button";
import { Footer, Header, Title, Wrapper } from "@/styles/global";
import { useConfirm } from "../hooks/useConfirm";
import {
  Col,
  Row,
  Button as AntdButton,
  Select as AntdSelect,
  Checkbox,
} from "antd";
// import Upload from "@/components/upload";
// import { Input } from "@/components/input";
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
import { Reactquill } from "@/components/text-editor/style";
const CreateProducts = () => {
  const navigate = useNavigate();
  const user = getUser();
  const is_stock = user?.is_stock;
  const [images, setImages] = useState([]);
  const [videoLink, setVideoLink] = useState(null);
  const [attributes, setAttributes] = useState([
    { type: "TEXT", name_uz: "", name_ru: "", values: [] },
  ]);
  const [imageLabel, setImageLabel] = useState("");
  const [imagesAtt, setImagesAtt] = useState([]);
  const [colorLabel, setColorLabel] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [colorsAtt, setColorsAtt] = useState([]);
  const [name_uz, setNameUz] = useState("");
  const [name_ru, setNameRu] = useState("");
  const [price, setPrice] = useState();
  const [oldPrice, setOldPrice] = useState();
  const [description_uz, setDescriptionUz] = useState("");
  const [description_ru, setDescriptionRu] = useState("");
  //   "is_recommend": true,
  // "is_new": true,
  // "is_cheap": true,
  const [isRecommend, setIsRecommend] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isCheap, setIsCheap] = useState(false);
  const [category, setCategory] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const {
    form,
    fields,
    append,
    remove,
    confirm,
    fileList,
    setFileList,
    isLoading,
    // categoryList,
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
  const getCategoryList = async () => {
    const response = await request.get("/category/list");
    setCategoryList(response.data.results);
  };
  const handleSubmit = async () => {
    console.log(form.getValues());
    const data = {
      medias: [...images, videoLink],
      name_uz,
      name_ru,
      desc_uz: description_uz,
      desc_ru: description_ru,
      price,
      old_price: oldPrice,
      attributes,
      is_recommend: isRecommend,
      is_new: isNew,
      is_cheap: isCheap,
    };
    const res = await request.post("admin/product/create", data);
    console.log(res);
    // console.log(data, "data");
  };
  const types = [
    { label: "TEXT", value: "TEXT" },
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
                value={name_uz}
                onChange={(e) => setNameUz(e.target.value)}
                // control={form.control}
                name="name_uz"
                label="Mahsulot nomi (O’zbek tili)"
                placeholder="Mahsulot nomi (O’zbek tili)"
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                value={name_ru}
                onChange={(e) => setNameRu(e.target.value)}
                // control={form.control}
                name="name_ru"
                label="Mahsulot nomi (Rus tili)"
                placeholder="Mahsulot nomi (Rus tili)"
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                // control={form.control}
                name="price"
                label="Sotilish narxi"
                placeholder="Sotilish narxi"
                type="number"
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                // control={form.control}
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                name="old_price"
                label="Eski narxi"
                placeholder="Eski narxi"
                type="number"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 12 }} gutter={[16, 16]}>
            <Col span={24} lg={12}>
              <Label>Descrtiption - tasnif (O’zbek tili)</Label>
              <Reactquill
                value={description_uz}
                onChange={(e) => setDescriptionUz(e)}
                placeholder="Descrtiption - tasnif (O’zbek tili)"
                theme="snow"
                rows={5}
              />
            </Col>
            <Col span={24} lg={12}>
              <Label>Descrtiption - tasnif (Rus tili)</Label>
              <Reactquill
                value={description_ru}
                onChange={(e) => setDescriptionRu(e)}
                placeholder="Descrtiption - tasnif (Rus tili)"
                theme="snow"
                rows={5}
              />
            </Col>
            <Col span={24} lg={12}>
              <AntdSelect
                style={{ width: "100%" }}
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
                    <ListItem
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                      key={index}
                    >
                      <Label>Attribute nomi ru</Label>
                      <Input
                        label="Attribut nomi"
                        placeholder="Attribut nomi ru"
                        value={item?.name_ru}
                        onChange={(e) => {
                          attributes[index].name_ru = e.target.value;
                          setAttributes([...attributes]);
                        }}
                      />
                      <Label>Attribute nomi uz</Label>

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
                      <Label>Attribute turi</Label>
                      <AntdSelect
                        defaultValue={item?.type}
                        style={{ width: "100%" }}
                        options={types}
                        onChange={(value) => {
                          attributes[index].type = value;
                          setAttributes([...attributes]);
                        }}
                      />
                      {item.type === "TEXT" && (
                        <AntdSelect
                          mode="tags"
                          style={{ width: "100%" }}
                          onChange={(value) => {
                            if (item.type === "TEXT") {
                              const valuee = [];
                              value.map((v) => {
                                valuee.push({
                                  value: v,
                                  title: v,
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
                      )}
                      {imagesAtt.length > 0 && item.type === "IMAGE" && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 10,
                          }}
                        >
                          {imagesAtt.map((value, i) => {
                            return (
                              <div
                                onClick={() => {
                                  setImagesAtt(
                                    imagesAtt.filter((v) => v.url !== value.url)
                                  );
                                }}
                                key={i}
                              >
                                <p>{value.label}</p>
                                <img
                                  src={value.url}
                                  alt="image"
                                  style={{ width: 100, height: 100 }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {item.type === "IMAGE" && (
                        <div>
                          <Input
                            placeholder="Enter color name"
                            value={imageLabel}
                            onChange={(e) => {
                              setImageLabel(e.target.value);
                            }}
                          />
                        </div>
                      )}
                      {imageLabel.length > 1 &&
                        item.type === "IMAGE" &&
                        images.map((v, i) => {
                          const arr = imagesAtt.filter(
                            (value) => value.url === v
                          );

                          if (arr.length !== 0) {
                            return null;
                          }
                          return (
                            <img
                              key={i}
                              src={v}
                              alt="image"
                              style={{ width: 100, height: 100 }}
                              onClick={() => {
                                setImagesAtt([
                                  ...imagesAtt,
                                  { url: v, label: imageLabel },
                                ]);
                                setImageLabel("");
                                const arr = [
                                  ...attributes[index].values,
                                  { value: v, title: imageLabel },
                                ];

                                attributes[index].values = [...arr];
                                setAttributes([...attributes]);
                              }}
                            />
                          );
                        })}

                      {item.type === "COLOR" && (
                        <div>
                          <Input
                            placeholder="Enter color name"
                            value={colorLabel}
                            onChange={(e) => {
                              setColorLabel(e.target.value);
                            }}
                          />
                          <div style={{ display: "flex", gap: 10 }}>
                            <Input
                              placeholder="Enter color name"
                              type="color"
                              // value={colorCode}
                              onChange={(e) => {
                                console.log(colorCode, "colorCode");
                                console.log();
                                setColorCode(e.target.value);
                                // console.log({
                                //   colorLabel,
                                //   value: e.target.value,
                                // });
                                // setColorLabel(e.target.value);
                              }}
                            />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                const arr = [
                                  ...colorsAtt,
                                  {
                                    label: colorLabel,
                                    value: colorCode,
                                  },
                                ];
                                // setColors([...colors, colorLabel]);
                                setColorLabel("");
                                setColorCode("#000000");
                                setColorsAtt([...arr]);
                                attributes[index].values = [...arr];
                              }}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                      {colorsAtt.length > 0 && item.type === "COLOR" && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 10,
                          }}
                        >
                          {colorsAtt.map((value, i) => {
                            return (
                              <div
                                onClick={() => {
                                  setColorsAtt(
                                    colorsAtt.filter((v) => v !== value)
                                  );
                                }}
                                key={i}
                              >
                                <p>{value.label}</p>
                                <div
                                  style={{
                                    backgroundColor: value.value,
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                  }}
                                ></div>
                              </div>
                            );
                          })}
                        </div>
                      )}
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
                        onClick={() => {
                          attributes.splice(index, 1);
                          setAttributes([...attributes]);
                        }}
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
            <Row>
              <Col span={24}>
                <h4
                  style={{
                    color: "#212121",
                    fontFamily: "Rubik",
                    fontSize: "18px",
                    fontWeight: 400,
                    margin: "30px 0 20px 0",
                  }}
                >
                  Mahsulot joylanadigan bo’lim
                </h4>
              </Col>
              <Col span={24} md={6} lg={6}>
                <Checkbox
                  label={"Tavsiya etilganlar"}
                  checked={isRecommend}
                  onClick={() => setIsRecommend(!isRecommend)}
                >
                  Tavsiya etilganlar
                </Checkbox>
              </Col>
              <Col span={24} md={6} lg={6}>
                <Checkbox
                  label={"Yangiliklar"}
                  checked={isNew}
                  onClick={() => setIsNew(!isNew)}
                >
                  Yangiliklar
                </Checkbox>
              </Col>
              <Col span={24} md={6} lg={6}>
                <Checkbox
                  label={"Arzon narxlar"}
                  checked={isCheap}
                  onClick={() => setIsCheap(!isCheap)}
                >
                  Yangiliklar
                </Checkbox>
              </Col>
              {/* <Col span={24} md={6} lg={6}>
          <CheckboxCustom
            control={form.control}
            name="is_new"
            label="Yangiliklar"
          />
        </Col>
        <Col span={24} md={6} lg={6}>
          <CheckboxCustom
            control={form.control}
            name="is_cheap"
            label="Arzon narxlar"
          />
        </Col> */}
            </Row>
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
