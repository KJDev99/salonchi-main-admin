import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Footer, Header, Title, Wrapper } from "@/styles/global";
import { Col, notification, Row } from "antd";
import { useConfirm } from "../hooks/useConfirm";
// import Upload from "@/components/upload";
import { Spinner } from "@/components/spinner";
// import { Select } from "@/components/select";
import { useNavigate, useParams } from "react-router-dom";
import { useReset } from "../hooks/useReset";
import { useEffect, useState } from "react";
import { request } from "@/shared/api/request";
import styles from "./styles.module.css";
import { CloudUploadOutlined, DeleteFilled } from "@ant-design/icons";
const CreateSubCategory = () => {
  const [categoryLogo, setCategoryLogo] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { form, fileList, setFileList, isLoading } = useConfirm();
  const { id, subid } = useParams();
  const getFileUrl = async (e) => {
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
      setCategoryLogo(response.data.file);
    }
  };
  const { isLoading: detailLoading } = useReset({
    form,
    fileList,
    setFileList,
  });

  const createCategory = async () => {
    const data = {
      name_uz: form.getValues().name_uz,
      name_ru: form.getValues().name_ru,
      photo: categoryLogo,
      parent: id,
    };

    if (subid) {
      const response = await request.put(
        `admin/category/${subid}/update`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        api["success"]({
          message: "Success",
          description: "Sub categoriya muvaffaqiyatli yangilandi.",
        });
        setTimeout(() => {
          navigate("/admin/categories/" + id + "/sub");
        }, 1500);
      }
    } else {
      const response = await request.post(`admin/category/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        api["success"]({
          message: "Success",
          description: "Sub categoriya muvaffaqiyatli yaratildi.",
        });
        setTimeout(() => {
          navigate("/admin/categories/" + id + "/sub");
        }, 1500);
      }
    }
  };
  useEffect(() => {
    if (subid) {
      const getCurrentValue = async () => {
        // console.log("worked", subid);
        const res = await request.get(`admin/category/${subid}/detail`);
        if (res.status === 200) {
          const { photo } = res.data;
          setCategoryLogo(photo);
        }
      };
      getCurrentValue();
    }
  }, [subid, id]);
  return (
    <>
      {contextHolder}
      <Wrapper>
        <Header>
          <Title>
            {subid ? "Sub kategoriyani yangilash" : "Sub kategoriya yaratish"}{" "}
          </Title>
          <Button
            name="Orqaga"
            onClick={() => navigate("/admin/categories/" + id + "/sub")}
            className="go-back-btn"
          />
        </Header>
        {subid && detailLoading ? (
          <Spinner />
        ) : (
          <form>
            <Row gutter={[16, 16]}>
              <Col span={24} className={styles.imagesUploading}>
                <div className={styles.imagesUploadingDiv}>
                  <p>Sub kategoriya logosi</p>
                  {!categoryLogo ? (
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
                        accept="image/*"
                        id="categoryLogo"
                        style={{ display: "none" }}
                        onChange={(e) => getFileUrl(e, 0)}
                      />
                    </>
                  ) : (
                    <>
                      <div className={styles.imageItem}>
                        <p
                          className={styles.delete}
                          // style={{ backgroundColor: "white" }}
                        >
                          <DeleteFilled
                            color="red"
                            background="red"
                            onClick={() => setCategoryLogo(null)}
                          />
                        </p>
                        <img
                          className={styles.categoryLogo}
                          src={categoryLogo}
                          alt="productImage"
                          width={80}
                          height={80}
                        />
                      </div>
                    </>
                  )}
                  {/* <Upload
                fileList={fileList}
                setFileList={setFileList}
                multiple={false}
                maxCount={1}
              /> */}
                </div>
                {/* <div className={styles.imagesUploadingDiv}>
                  <p>Kategoriya banner(uz)</p>
                  {!categoryImageUz ? (
                    <>
                      <label
                        htmlFor="categoryImageUz"
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
                        id="categoryImageUz"
                        style={{ display: "none" }}
                        onChange={(e) => getFileUrl(e, 1)}
                      />
                    </>
                  ) : (
                    <>
                      <div className={styles.imageItem}>
                        <p
                          className={styles.delete}
                          style={{ backgroundColor: "white" }}
                        >
                          <DeleteFilled
                            color="red"
                            background="red"
                            onClick={() => setCategoryImageUz(null)}
                          />
                        </p>
                        <img
                          className={styles.categoryLogo}
                          src={categoryImageUz}
                          alt="productImage"
                          width={80}
                          height={80}
                        />
                      </div>
                    </>
                  )}
                  <Upload
                fileList={fileList}
                setFileList={setFileList}
                multiple={false}
                maxCount={1}
              /> 
                </div> */}
                {/* <div className={styles.imagesUploadingDiv}>
                  <p>Kategoriya banner(ru)</p>
                  {!categoryImageRu ? (
                    <>
                      <label
                        htmlFor="categoryImageRu"
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
                        name="categoryImageRu"
                        id="categoryImageRu"
                        style={{ display: "none" }}
                        onChange={(e) => getFileUrl(e, 2)}
                      />
                    </>
                  ) : (
                    <>
                      <div className={styles.imageItem}>
                        <p
                          className={styles.delete}
                          // style={{ backgroundColor: "white" }}
                        >
                          <DeleteFilled
                            color="red"
                            background="red"
                            onClick={() => setCategoryImageRu(null)}
                          />
                        </p>
                        <img
                          className={styles.categoryLogo}
                          src={categoryImageRu}
                          alt="productImage"
                          width={80}
                          height={80}
                        />
                      </div>
                    </>
                  )}
                   <Upload
                fileList={fileList}
                setFileList={setFileList}
                multiple={false}
                maxCount={1}
              /> 
                </div> */}
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
              {/* <Col span={24} lg={12}>
              <Select
                control={form.control}
                name="parent"
                label="Parent"
                placeholder="Parent"
                options={categoryList}
              />
            </Col> */}
            </Row>
            <Footer>
              <Button
                onClick={createCategory}
                name={subid ? "Yangilash" : "Sub kategoriya yaratish"}
                className="category-btn"
                // type="submit"
              />
            </Footer>
          </form>
        )}
        {isLoading && <Spinner />}
      </Wrapper>
    </>
  );
};

export default CreateSubCategory;
