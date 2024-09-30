import { useState } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Modal, Upload as CustomUpload, message } from "antd";
import { UploadWrapper } from "./style";
import PropTypes from "prop-types";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const beforeUpload = (file) => {
  const size = file?.size / 1024 / 1024 > 5;
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Siz rasm turini JPG yoki PNG kiritmadingiz!");
  }

  if (size) {
    message.error("Fayl hajmini 15mb dan katta kiritdingiz!");
  }
  return isJpgOrPng && size;
};
const Upload = ({ fileList, setFileList, multiple = false, maxCount }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  // console.log("fileList", fileList);
  const handleCancel = () => setPreviewOpen(false);


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };


  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <CloudUploadOutlined />
      <div
        style={{
          marginTop: 8,
          fontSize: "12px",
        }}
      >
        Rasm yuklang
      </div>
    </div>
  );
  return (
    <UploadWrapper>
      <CustomUpload
        listType="picture-card"
        beforeUpload={beforeUpload}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={multiple}
        maxCount={maxCount}
      >
        {fileList.length >= 10 ? null : uploadButton}
      </CustomUpload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </UploadWrapper>
  );
};
export default Upload;

Upload.propTypes = {
  fileList: PropTypes.any.isRequired,
  setFileList: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  maxCount: PropTypes.number,
};
