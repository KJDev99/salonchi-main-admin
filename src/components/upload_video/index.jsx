import {
  CloseOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { Upload} from "antd";
import { UploadWrapper, VideoWrapper } from "./style";
import PropTypes from "prop-types";
import { useState } from "react";



const UploadVideo = ({ setVideoFile ,videoFile }) => {
  const [url, setUrl] = useState();

  const handleChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      const selectedFile = newFileList[0].originFileObj;
      setUrl(URL.createObjectURL(selectedFile));
      setVideoFile(selectedFile)
    } else {
      setUrl(null); // Reset URL if no files are present
    }
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
        video yuklang
      </div>
    </div>
  );

  return (
    <UploadWrapper>
      <Upload
        listType="picture-card"
        onChange={handleChange}
        accept="video/*"
        fileList={null}
      >
        {videoFile ? null : uploadButton}
      </Upload>
      {videoFile && (
        <VideoWrapper>
          <video src={ url ?  url : videoFile.url} width="400px" height="250px" controls></video>
          <CloseOutlined onClick={() => {setUrl(null);setVideoFile(null)}} className="icon" />
        </VideoWrapper>
      )}
    </UploadWrapper>
  );
};

UploadVideo.propTypes = {
  videoFile: PropTypes.object,
  setVideoFile: PropTypes.func.isRequired,
};

export default UploadVideo;
