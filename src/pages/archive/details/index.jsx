import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { CustomTextArea } from "@/components/textarea";
import { DATE_FORMAT } from "@/constants/format";
import { Header, Title, Wrapper } from "@/styles/global";
import { getStatus, tagStatus } from "@/utils/status";
import { Image, Modal, Tag } from "antd";
import dayjs from "dayjs";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { ChangeStatus } from "./change-status";
import { List, ListItem } from "./style";
import { useDetail } from "./useDetail";
// import { BsCreditCard } from "react-icons/bs";
import { ReactComponent as Nasiya } from "@/assets/nasiya.svg";
import { BsCreditCard } from "react-icons/bs";

const ArchiveOrderDetails = () => {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    form,
    open,
    setOpen,
    contextHolder,
    rejectOrder,
    acceptOrder,
  } = useDetail();
  const getPaymentIcon = (paymentType) => {
    switch (paymentType) {
      case "CASH":
        return (
          <LiaMoneyBillWaveAltSolid
            style={{ color: "green", fontSize: "28px" }}
          />
        );
      case "UZUM":
        return <Nasiya style={{ width: "100px", height: "30px" }} />;
      case "CART":
        return <BsCreditCard style={{ color: "green", fontSize: "28px" }} />;
      default:
        return null;
    }
  };
  return (
    <Wrapper>
      {contextHolder}
      <Header>
        <Title>Buyurtma ma`lumotlari</Title>
        <Button
          name="Orqaga"
          onClick={() => navigate("/admin/archive")}
          className="go-back-btn"
        />
      </Header>
      {isLoading ? (
        <Spinner />
      ) : (
        <List>
          <ListItem>
            <span>Mijozning ismi va familiyasi</span>
            <span>{data?.user}</span>
          </ListItem>
          <ListItem getstatus={getStatus(data?.status)}>
            <span>Status</span>{" "}
            <Tag color={tagStatus(data?.status)} bordered={false}>
              {getStatus(data?.status)?.label}
            </Tag>
          </ListItem>
          <ListItem>
            <span>To`lov turi</span>
            {getPaymentIcon(data?.payment_type)}
          </ListItem>
          <ListItem>
            <span>Telefon raqami</span> <span>{data?.phone}</span>
          </ListItem>{" "}
          <ListItem>
            <span>Buyurtma yaratilgan sanasi</span>{" "}
            <span>{dayjs(data?.created_at).format(DATE_FORMAT)}</span>
          </ListItem>{" "}
          <ListItem>
            <span>Buyurtma manzili</span>
            {data && data?.address && (
              <span className="address-info">
                {data?.address?.region}, {data?.address?.district} tumani ,
                {data?.address?.street} ko`chasi, {data?.address?.home}
              </span>
            )}
          </ListItem>
          <ListItem>
            <span>Jami</span> <span>{data?.amount} so`m</span>
          </ListItem>{" "}
          <ListItem>
            <span>Izoh</span>
            <span className="comment">
              {data?.comment === "" ? "Izohlar yo'q" : data?.comment}
            </span>
          </ListItem>
          {data?.order_items?.length > 0 && (
            <ListItem className="product-list-item">
              <span>
                <b>Maxsulotlar</b>
              </span>
            </ListItem>
          )}
          <ol className="product-list">
            {data?.order_items?.map((v, i) => {
              return (
                <div key={v.id}>
                  <li>
                    <span>{i + 1}. Maxsulot rasmi</span>
                    {v?.details?.photo?.length > 0 ? (
                      <Image
                        src={
                          v?.details?.attributes[0]?.value[0].value ||
                          v?.details?.photo
                        }
                        alt="media"
                        className="product-image"
                      />
                    ) : (
                      <span>Rasm mavjud emas</span>
                    )}
                  </li>
                  <li>
                    <span> Maxsulot nomi</span>
                    <span>{v?.product?.name_uz}</span>
                  </li>
                  <li>
                    <span>Maxsulot narxi</span>
                    <span>{v?.price} so`m</span>
                  </li>
                  <li>
                    <span>Soni</span>
                    <span>{v?.count} ta</span>
                  </li>
                  <li>
                    <span>
                      {v?.details?.attributes?.[0]?.key
                        ? v?.details?.attributes?.[0]?.key
                        : v?.details?.attributes?.[0]?.name_uz}{" "}
                    </span>
                    <span>{v?.details?.attributes?.[0]?.value?.label}</span>
                  </li>
                </div>
              );
            })}
          </ol>
        </List>
      )}
      <ChangeStatus
        status={data?.status}
        setOpen={setOpen}
        acceptOrder={acceptOrder}
      />
      {open && (
        <Modal
          title="Buyurtmani rad etish"
          open={open}
          onOk={rejectOrder}
          onCancel={() => setOpen(false)}
          cancelText="Bekor qilish"
          okText="Rad etish"
        >
          <CustomTextArea
            name="comment"
            placeholder="Izoh qoldiring..."
            control={form.control}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

export default ArchiveOrderDetails;
