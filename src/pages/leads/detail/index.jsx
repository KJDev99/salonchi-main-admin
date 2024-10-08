import { Button } from "@/components/button";
import { Header, Title, Wrapper } from "@/styles/global";
import { useNavigate } from "react-router-dom";
import { useDetail } from "./useDetail";
import { Spinner } from "@/components/spinner";
import { List, ListItem } from "./style";
import { Image, Modal, Tag } from "antd";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/format";
import { getStatus, tagStatus } from "@/utils/status";
import { ChangeStatus } from "./change-status";
import { Fragment } from "react";
import { CustomTextArea } from "@/components/textarea";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { BsCreditCard } from "react-icons/bs";

const OrderDetailWaiting = () => {
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

  return (
    <Wrapper>
      {contextHolder}
      <Header>
        <Title>Buyurtma ma`lumotlari</Title>
        <Button
          name="Orqaga"
          onClick={() => navigate("/admin/leads")}
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
            {data?.payment_type == "CASH" ? (
              <LiaMoneyBillWaveAltSolid
                style={{ color: "green", fontSize: "28px" }}
              />
            ) : (
              <BsCreditCard style={{ color: "green", fontSize: "28px" }} />
            )}
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
            <span className="address-info">
              {data?.address?.region?.name_uz} viloyati,{" "}
              {data?.address?.district?.name_uz} tumani {data?.address?.street}{" "}
              ko`chasi
            </span>
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
                <Fragment key={v.id}>
                  <li>
                    <span>{i + 1}. Maxsulot rasmi</span>
                    {v?.product?.photo?.length > 0 ? (
                      <Image
                        src={v?.product?.photo}
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
                </Fragment>
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

export default OrderDetailWaiting;