import { Button } from "@/components/button";
import { Footer, Header, Title, Wrapper } from "@/styles/global";
import {
  Button as AntdButton,
  Select as AntdSelect,
  Checkbox,
  Col,
  notification,
  Row,
} from "antd";
import { useConfirm } from "../hooks/useConfirm";
// import Upload from "@/components/upload";
// import { Input } from "@/components/input";
// import { Select } from "@/components/select";
import { Spinner } from "@/components/spinner";
import { useNavigate } from "react-router-dom";
import { useReset } from "../hooks/useReset";
// import TextEditorController from "@/components/text-editor";
import { getUser } from "@/utils/user";
// import AdditionCrud from "../addition";
// import { CreateSelect } from "@/components/create-select";
// import { FormProvider, get, set } from "react-hook-form";
import { List, ListItem } from "./style";
// import { FormGroupProvider, Label, Input, Error } from "@/styles/global";
import { Input, Label } from "@/styles/global";
import {
  CloseOutlined,
  CloudUploadOutlined,
  DeleteFilled,
} from "@ant-design/icons";
// import UploadVideo from "@/components/upload_video";
import { request } from "@/shared/api/request";
import { useCallback, useEffect, useState } from "react";
import styles from "./product.module.css";
// import UploadVideo from "@/components/upload_video";
import { Reactquill } from "@/components/text-editor/style";
import { VideoWrapper } from "@/components/upload_video/style";
const CreateProducts = () => {
  const navigate = useNavigate();
  const user = getUser();
  const is_stock = user?.is_stock;
  const [images, setImages] = useState([]);
  const [videoLink, setVideoLink] = useState(null);
  const [attributes, setAttributes] = useState([]);
  // console.log(attributes, "attributes");

  const [imageLabel, setImageLabel] = useState("");
  const [imagesAtt, setImagesAtt] = useState([]);
  // const [colorLabel, setColouseLocationrLabel] = useState("");
  // const [colorCode, setColorCode] = useState("");
  // const [colorsAtt, setColorsAtt] = useState([]);
  const [name_uz, setNameUz] = useState("");
  const [name_ru, setNameRu] = useState("");
  const [price, setPrice] = useState();
  const [oldPrice, setOldPrice] = useState();
  const [bodyPrice, setBodyPrice] = useState();
  const [amount, setAmount] = useState();
  const [description_uz, setDescriptionUz] = useState("");
  const [description_ru, setDescriptionRu] = useState("");
  const [isRecommend, setIsRecommend] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isCheap, setIsCheap] = useState(false);
  const [category, setCategory] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [variants, setVariants] = useState([]);
  const [active, setActive] = useState(0);
  // const [selectedImages, setSelectedImages] = useState([]);

  const { form, setFileList, isLoading, setVideoFile } = useConfirm();
  const [api, contextHolder] = notification.useNotification();
  // startingg

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
    }
  };
  const getCategoryList = async () => {
    const response = await request.get("/category/list");
    setCategoryList(response.data);
  };
  const getSubCategoryList = async (id) => {
    const response = await request.get(`/category/sub/list/${id}`);
    setSubCategoryList(response.data);
  };
  const { id, detailLoading } = useReset({ form, setFileList, setVideoFile });
  const onSave = useCallback((variantss) => {
    if (variantss.length > 0) {
      setVariants((prevVariants) => {
        // Compare stringified versions to prevent unnecessary updates
        return JSON.stringify(prevVariants) !== JSON.stringify(variantss)
          ? variantss
          : prevVariants;
      });
    }
  }, []);
  const getData = useCallback(async () => {
    if (id) {
      try {
        const response = await request.get(`admin/product/${id}/detail`);
        if (response.status === 200) {
          const {
            name_uz,
            name_ru,
            desc_uz,
            desc_ru,
            media,
            attributes,
            is_new,
            is_recommend,
            is_cheap,
            price,
            old_price,
            body_price,
            count,
            category,
            variants,
          } = response.data;

          // State updates
          setNameUz(name_uz);
          setNameRu(name_ru);
          setDescriptionUz(desc_uz);
          setDescriptionRu(desc_ru);
          setAttributes(attributes);
          setIsCheap(is_cheap);
          setIsNew(is_new);
          setIsRecommend(is_recommend);
          setPrice(price);
          setOldPrice(old_price);
          setBodyPrice(body_price);
          setAmount(count);
          setCategory(category.id);
          getSubCategoryList(category.id);
          setSelectedCategory(category.sub.id);

          // Media handling
          const arr = [];
          media.forEach((item) => {
            if (item.file_type === "video") {
              setVideoLink(item.file);
            } else {
              arr.push(item.file);
            }
          });
          setImages(arr);

          // Attributes handling
          const attr = [];
          attributes.forEach((item) => {
            if (item.type === "IMAGE") {
              const imgArr = item.values.map((v, i) => ({
                key: i,
                url: v.value,
                label: v.title,
              }));
              setImagesAtt([...imgArr]);
            }
            attr.push({
              id: item.id,
              type: item.type,
              name_uz: item.name_uz,
              name_ru: item.name_ru,
              values: [...item.values],
            });
          });
          setAttributes(attr);

          // Variants handling
          const formattedVariants = variants.map((variant, i) => ({
            key: i,
            attributes: variant.attributes,
            price: variant.price,
            old_price: variant.old_price,
            body_price: variant.body_price,
            count: variant.count,
          }));

          onSave(formattedVariants);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [id, onSave]);

  useEffect(() => {
    getCategoryList();
    getData();
  }, [id, getData]);

  useEffect(() => {
    if (id) {
      getSubCategoryList(category);
    } else {
      getSubCategoryList(category);
    }
  }, [category, id]);

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        const response = await request.get(`admin/product/${id}/detail`);
        setCategory(response.data.category.id);
      };
      fetchCategory();
    }
  }, [id]);
  const handleSubmit = async () => {
    const arr = [...images];
    if (videoLink) arr.push(videoLink);
    const number = attributes.reduce((acc, attr) => {
      return acc * attr.values.length;
    }, 1);
    const data = {
      medias: [...arr],
      name_uz,
      name_ru,
      desc_uz: description_uz,
      desc_ru: description_ru,
      price: +price || 0,
      old_price: +oldPrice || 0,
      body_price: +bodyPrice || 0,
      count: +amount || 0,
      attributes: attributes,
      is_recommend: isRecommend,
      is_new: isNew,
      is_cheap: isCheap,
      category: selectedCategory,
      variants,
    };
    console.log(data.variants);
    console.log(data.attributes);
    console.log(number);

    if (
      name_uz === "" ||
      name_ru === "" ||
      description_uz === "" ||
      description_ru === "" ||
      category === null ||
      selectedCategory === null ||
      images.length === 0 ||
      attributes.some((item) => item.values.length === 0) ||
      attributes.some((item) => item.name_ru.length === 0) ||
      attributes.some((item) => item.name_uz.length === 0)
      // (variants.length < number && attributes.length > 0)
    ) {
      api["error"]({
        message: "Error",
        description: "Buyurtma ma'lumotlari to'liq kiritilmadi",
      });
    } else {
      if (id) {
        const res = await request.put(`admin/product/${id}/update`, data);
        if (res.status === 200) {
          api["success"]({
            message: "Success",
            description: "Maxsulot muvaffaqiyatli yangilandi",
          });
          setImages([]);
          setAttributes([]);
          setVideoLink(null);
          setNameUz("");
          setNameRu("");
          setDescriptionUz("");
          setDescriptionRu("");
          setPrice("");
          setOldPrice("");
          setAmount("");
          setBodyPrice("");
          setIsRecommend(false);
          setIsNew(false);
          setIsCheap(false);
          setTimeout(() => {
            navigate("/admin/products");
          }, 1500);
        }
      } else {
        const res = await request.post("admin/product/create", data);
        if (res.status === 201) {
          api["success"]({
            message: "Success",
            description: "Maxsulot muvaffaqiyatli yaratildi",
          });
          setImages([]);
          setAttributes([]);
          setVideoLink(null);
          setNameUz("");
          setNameRu("");
          setDescriptionUz("");
          setDescriptionRu("");
          setPrice("");
          setOldPrice("");
          setIsRecommend(false);
          setIsNew(false);
          setIsCheap(false);
          setSelectedCategory("");
          setTimeout(() => {
            navigate("/admin/products");
          }, 1500);
        } else {
          api["error"]({
            message: "Error",
            description: res?.data?.message || "Nimadur xatolik yuz berdi!",
          });
        }
      }
    }
  };

  const types = [
    { label: "TEXT", value: "TEXT" },
    { label: "IMAGE", value: "IMAGE" },
  ];

  function goBack() {
    navigate(-1);
  }

  return (
    <Wrapper>
      {contextHolder}
      <Header>
        <Title>{id ? "Maxsulotni yangilash" : "Maxsulot yaratish"} </Title>
        <Button
          name="Orqaga"
          // onClick={() => navigate("/admin/products")}
          onClick={goBack}
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
                  images.map((image, index) => (
                    <div className={styles.imageItem} key={index}>
                      <p className={styles.delete}>
                        <DeleteFilled
                          color="red"
                          background="red"
                          onClick={() =>
                            setImages(images.filter((i) => i !== image))
                          }
                        />
                      </p>
                      <img
                        key={image}
                        className={styles.categoryLogo}
                        src={image}
                        alt="productImage"
                        width={80}
                        height={80}
                      />
                    </div>
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
                <VideoWrapper style={{ marginTop: "5px" }}>
                  <video
                    src={videoLink}
                    width="400px"
                    height="250px"
                    controls
                  ></video>
                  <CloseOutlined
                    onClick={() => {
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
            </Col>
            <Col span={24} lg={12}>
              <Input
                value={name_uz}
                onChange={(e) => setNameUz(e.target.value)}
                name="name_uz"
                label="Mahsulot nomi (O’zbek tili)"
                placeholder="Mahsulot nomi (O’zbek tili)"
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                value={name_ru}
                onChange={(e) => setNameRu(e.target.value)}
                name="name_ru"
                label="Mahsulot nomi (Rus tili)"
                placeholder="Mahsulot nomi (Rus tili)"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 12 }} gutter={[16, 16]}>
            <Col span={24} lg={12}>
              <Label>Description - tasnif (O’zbek tili)</Label>
              <Reactquill
                value={description_uz}
                onChange={(e) => setDescriptionUz(e)}
                placeholder="Description - tasnif (O’zbek tili)"
                theme="snow"
                rows={1}
              />
            </Col>
            <Col span={24} lg={12}>
              <Label>Description - tasnif (Rus tili)</Label>
              <Reactquill
                value={description_ru}
                onChange={(e) => setDescriptionRu(e)}
                placeholder="Description - tasnif (Rus tili)"
                theme="snow"
                rows={5}
              />
            </Col>
            {id ? (
              <>
                <Col span={24} lg={12}>
                  <AntdSelect
                    style={{ width: "100%" }}
                    onChange={(e) => setCategory(e)}
                    value={category}
                    name="category"
                    label="Kategoriyalar"
                    placeholder="Kategoriyalar"
                    options={categoryList.map((item, index) => ({
                      key: index,
                      label: item.name_uz,
                      value: item.id,
                    }))}
                  />
                </Col>
                <Col span={24} lg={12}>
                  <AntdSelect
                    style={{ width: "100%" }}
                    onChange={(e) => setSelectedCategory(e)}
                    name="subCategory"
                    label="SubCategoriyalar"
                    placeholder="SubCategoriyalar"
                    value={selectedCategory}
                    options={
                      subCategoryList && subCategoryList.length > 0
                        ? subCategoryList.map((item, index) => ({
                            key: index,
                            label: item.name_uz,
                            value: item.id,
                          }))
                        : []
                    }
                  />
                </Col>
              </>
            ) : (
              <>
                <Col span={24} lg={12}>
                  <AntdSelect
                    style={{ width: "100%" }}
                    onChange={(e) => setCategory(e)}
                    name="category"
                    label="Kategoriyalar"
                    placeholder="Kategoriyalar"
                    options={categoryList.map((item, index) => ({
                      key: index,
                      label: item.name_uz,
                      value: item.id,
                    }))}
                  />
                </Col>
                <Col span={24} lg={12}>
                  <AntdSelect
                    style={{ width: "100%" }}
                    onChange={(e) => setSelectedCategory(e)}
                    name="subCategory"
                    label="SubCategoriyalar"
                    placeholder="SubCategoriyalar"
                    options={
                      subCategoryList && subCategoryList.length > 0
                        ? subCategoryList.map((item, index) => ({
                            key: index,
                            label: item.name_uz,
                            value: item.id,
                          }))
                        : []
                    }
                  />
                </Col>
              </>
            )}
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
            <Col span={48} lg={24}>
              <List>
                {attributes.map((item, index) => {
                  return (
                    <ListItem
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        marginBottom: 12,
                      }}
                      key={index}
                    >
                      <Row gutter={[16, 16]}>
                        <Col span={24} lg={12}>
                          <Label>Attribute nomi uz</Label>
                          <Input
                            disabled
                            placeholder="Attribut nomi uz"
                            label="Attribut nomi uz"
                            value={item?.name_uz}
                            onChange={(e) => {
                              attributes[index].name_uz = e.target.value;
                              setAttributes([...attributes]);
                            }}
                          />
                        </Col>
                        <Col span={24} lg={12}>
                          <Label>Attribute nomi ru</Label>
                          <Input
                            label="Attribut nomi ru"
                            placeholder="Attribut nomi ru"
                            value={item?.name_ru}
                            onChange={(e) => {
                              attributes[index].name_ru = e.target.value;
                              setAttributes([...attributes]);
                            }}
                          />
                        </Col>
                      </Row>
                      <Col style={{ padding: 0 }} span={24} lg={12}>
                        <Label>Attribute turi</Label>
                        <AntdSelect
                          defaultValue={item?.type}
                          style={{ width: "100%", margin: "10px 0" }}
                          options={types}
                          onChange={(value) => {
                            attributes[index].type = value;
                            setAttributes([...attributes]);
                          }}
                        />
                        {item.type === "TEXT" && (
                          <div
                            style={{
                              display: "flex",
                              items: "center",
                              gap: "10px",
                            }}
                          >
                            {item.values.map((value, valueIndex) => {
                              return (
                                <div key={value.id}>
                                  <div
                                    key={value.id}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      padding: "5px 10px",
                                      marginBottom: "5px",
                                      border: "1px solid #ccc",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    {value.title}
                                  </div>
                                  <Input
                                    label="Attribut nomi ru"
                                    placeholder="Attribut nomi ru"
                                    defaultValue={value?.title_ru}
                                    // onChange={(e) => {
                                    //   attributes[index].values[index].title_ru =
                                    //     e.target.value;
                                    //   setAttributes([...attributes]);
                                    // }}
                                    onChange={(e) => {
                                      attributes[index].values[
                                        valueIndex
                                      ].title_ru = e.target.value;
                                      setAttributes([...attributes]);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {imagesAtt.length > 0 && item.type === "IMAGE" && (
                          <>
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
                                        imagesAtt.filter(
                                          (v) => v.value !== value.value
                                        )
                                      );
                                      attributes[index].values = [
                                        ...attributes[index].values.filter(
                                          (v) => v.value !== value.value
                                        ),
                                      ];

                                      setAttributes([...attributes]);
                                    }}
                                    key={i}
                                    className={`${styles.attributeImages} ${styles.imageItem}`}
                                  >
                                    <p style={{ margin: 0 }}>{value.label}</p>
                                    <p className={styles.delete}>
                                      <DeleteFilled />
                                    </p>
                                    <img
                                      src={value.url}
                                      alt="image"
                                      style={{ width: 100, height: 100 }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                        {item.type === "IMAGE" && (
                          <>
                            <div>
                              {/* Tabs */}
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  marginBottom: "10px",
                                }}
                              >
                                {item?.values?.map((v, i) => {
                                  return (
                                    <div
                                      key={i}
                                      style={{
                                        padding: "8px 15px",
                                        borderRadius: "8px",
                                        border: "1px solid #ccc",
                                        cursor: "pointer",
                                        backgroundColor:
                                          active === i ? "#007bff" : "#fff",
                                        color: active === i ? "#fff" : "#000",
                                        fontWeight:
                                          active === i ? "bold" : "normal",
                                      }}
                                      onClick={() => setActive(i)}
                                    >
                                      {v.title}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Active Tab Content */}
                              <div
                                style={{
                                  padding: "10px",
                                  borderRadius: "8px",
                                }}
                              >
                                <div style={{ display: "flex", gap: "10px" }}>
                                  {images.map((v, i) => {
                                    return (
                                      <img
                                        key={i}
                                        src={v}
                                        alt="image"
                                        style={{
                                          width: 100,
                                          height: 100,
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          const updatedValues = item.values.map(
                                            (val, index) =>
                                              index === active
                                                ? { ...val, value: v }
                                                : val
                                          );
                                          attributes[index].values = [
                                            ...updatedValues,
                                          ];
                                          setAttributes([...attributes]);
                                          setImagesAtt((prev) => [
                                            ...prev,
                                            { value: v },
                                          ]);

                                          setImageLabel("");
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </>
                        )}

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
                      </Col>
                    </ListItem>
                  );
                })}
              </List>
            </Col>
          </Row>
          <Row gutter={[16, 8]} style={{ marginTop: 12 }}>
            <Col span={24} lg={12}>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                label="Sotilish narxi"
                placeholder="Sotilish narxi"
                type="number"
              />
            </Col>
            <Col span={24} lg={12}>
              <Input
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                name="old_price"
                label="Eski narxi"
                placeholder="Eski narxi"
                type="number"
              />
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
                  Arzon narxlar
                </Checkbox>
              </Col>
            </Row>
          )}
          <Footer>
            <Button
              name={id ? "Yangilash" : "Maxsulot yaratish"}
              className="category-btn"
              onClick={() => handleSubmit()}
            />
          </Footer>
        </form>
      )}

      {isLoading && <Spinner />}
    </Wrapper>
  );
};

export default CreateProducts;
