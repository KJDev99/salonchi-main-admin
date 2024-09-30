import { Wrapper } from "@/styles/global";
import { Card, Modal, Upload} from "antd";
import { CustomTable } from "@/components/table";

import { useList } from "./useList";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/button";

import { CheckCircleFilled, InboxOutlined } from "@ant-design/icons";

const SellerView = () => {
  const { params, columns, setParams, rows, contextHolder, sillerData,handleSubmit,open,setOpen,setFile,files } =
    useList();
  const { Dragger } = Upload;
 
  

  return (
    <Wrapper>
      {contextHolder}
      <Card
        style={{
          border: "1px solid #6417B0",
          borderRadius: "20px",
          marginBottom: `50px`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "100px",
            borderBottom: "1px solid #6417B0",
          }}
        >
          <h2 style={{ width: `200px` }}>{sillerData?.firstname}</h2>
          <h2>{sillerData?.phone}</h2>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "100px",
            marginTop: "10px",
          }}
        >
          <div style={{ display: `flex`, flexDirection: `column` }}>
            <div style={{ width: `200px` }}>
              <p
                style={{
                  fontSize: `18px`,
                  marginBottom: `0`,
                  fontWeight: `500`,
                }}
              >
                Karta raqami:
              </p>
              <p
                style={{
                  color: `#585858`,
                  fontSize: `16px`,
                  fontWeight: `300`,
                }}
              >
                {sillerData?.card?.card_number || `0000 0000 0000 0000`}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: `18px`,
                  marginBottom: `0`,
                  fontWeight: `500`,
                }}
              >
                Karta egasi:
              </p>
              <p
                style={{
                  color: `#585858`,
                  fontSize: `16px`,
                  marginBottom: `0`,
                  fontWeight: `300`,
                }}
              >
                {sillerData?.firstname}
              </p>
            </div>
          </div>
          <div style={{ display: `flex`, flexDirection: `column` }}>
            <div>
              <p
                style={{
                  fontSize: `18px`,
                  marginBottom: `0`,
                  fontWeight: `500`,
                }}
              >
                Yetkazilgan buyurtmalar:
              </p>
              <p
                style={{
                  color: `#585858`,
                  fontSize: `18px`,
                  fontWeight: `600`,
                }}
              >
                {sillerData?.extra?.amount || 0}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: `18px`,
                  marginBottom: `0`,
                  fontWeight: `500`,
                }}
              >
                Ish haqi:
              </p>
              <p
                style={{
                  color: `#585858`,
                  fontSize: `18px`,
                  fontWeight: `600`,
                  marginBottom: `0`,
                }}
              >
                {sillerData?.extra?.amount || 0}
              </p>
            </div>
          </div>
          <div style={{ display: `flex`, flexDirection: `column` }}>
            <Button disabled={sillerData?.extra?.amount  === 0 } name="To’lovni tasdiqlash" onClick={() => setOpen(true)} />
          </div>
        </div>
      </Card>
      <CustomTable columns={columns} data={rows} loading={false} />
      <Pagination total={10} params={params} setParams={setParams} />
      <Modal
        title="To‘lovni tasdiqlash"
        centered
        open={open}
        onOk={() => handleSubmit()}
        onCancel={() => {
          setOpen(false)
          setFile(null)
        }}
        cancelText="Inkor qilish"
        okText="To’lovni tasdiqlash"
  
      >
        {
          !files ?  <Dragger maxCount={1} onChange={(file) => {
          console.log("file",file)   
          setFile(file.fileList)      
        }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
          To‘lov chekini yuklang
          </p>
     
        </Dragger> : <div style={{width:'100%',textAlign:'center'}}>
           <p style={{textAlign:'center'}}>
           <CheckCircleFilled style={{ fontSize: "50px", color: "#52c41a",textAlign:'center' }} />
           </p>
            
            <p style={{ marginTop: "10px", fontWeight: "600" }}>
              {`To'lov cheki ${files.name} yuklandi. Tasdiqlashni bosqichiga o'zingiz qo'yishingiz mumkin`}
            </p> 
            
         
        </div> 
        }
      </Modal>
    </Wrapper>
  );
};

export default SellerView;
