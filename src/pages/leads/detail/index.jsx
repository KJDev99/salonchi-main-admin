import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { Header, Title, Wrapper } from "@/styles/global";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/components/spinner";
import { List, ListItem } from "./style";
import { Image, Modal, Tag } from "antd";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/constants/format";
import { getStatus } from "@/utils/status";
import { Fragment } from "react";
import { CustomTextArea } from "@/components/textarea";
import axios from "axios";

const LeadWaiting = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form] = useState({ control: {} }); // Agar form qo'llanmasa, shuni olib tashlash mumkin

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem("userInfo");

        if (!userDataString) {
          throw new Error("User data not found in localStorage");
        }

        const userData = JSON.parse(userDataString);
        const token = userData?.access;

        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(
          `https://api.salonchi.uz/api/v1/lead/${id}/detail`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
        console.log(response.data, "text/plain");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getStatusMessage = (status) => {
    switch (status) {
      case "ALL":
        return "Barcha lead"; // ALL bo'lsa, barcha buyurtma
      case "NEW":
        return "Yangi lead"; // NEW bo'lsa, yangi lead
      case "ACCEPT":
        return "Qabul qilingan"; // ACCEPT bo'lsa, qabul qilingan
      case "REJECTED":
        return "Bekor qilingan"; // REJECTED bo'lsa, bekor qilingan
      case "DELIVERED":
        return "Yetkazilgan"; // REJECTED bo'lsa, bekor qilingan
      case "RECALL":
        return "Qayta aloqa"; // REJECTED bo'lsa, bekor qilingan
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>Lead ma`lumotlari</Title>
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
            <span>{data?.name}</span>
          </ListItem>
          <ListItem getstatus={getStatus(data?.status)}>
            <span>Status</span>
            <Tag bordered={false}>{getStatusMessage(data?.status)}</Tag>
          </ListItem>
          <ListItem>
            <span>Telefon raqami</span> <span>{data?.phone}</span>
          </ListItem>
          <ListItem>
            <span>Lead yaratilgan sana</span>{" "}
            <span>{dayjs(data?.created).format(DATE_FORMAT)}</span>
          </ListItem>

          {(data?.status == "REJECTED" || data?.status == "RECALL") && (
            <ListItem>
              <span>Izoh</span>
              <span className="comment">
                {data?.comment === "" ? "Izohlar yo'q" : data?.comment}
              </span>
            </ListItem>
          )}
          {data?.product && (
            <ListItem className="product-list-item">
              <span>
                <b>Maxsulot</b>
              </span>
            </ListItem>
          )}
          <ol className="product-list">
            <Fragment>
              <li>
                <span> Maxsulot rasmi</span>
                {data?.product?.photo?.length > 0 ? (
                  <Image
                    src={data?.product?.photo}
                    alt="media"
                    className="product-image"
                  />
                ) : (
                  <span>Rasm mavjud emas</span>
                )}
              </li>
              <li>
                <span> Maxsulot nomi</span>
                <span>{data?.product?.name_uz}</span>
              </li>
              <li>
                <span>Maxsulot narxi</span>
                <span>{data?.product?.price} so`m</span>
              </li>
            </Fragment>
          </ol>
        </List>
      )}

      {open && (
        <Modal
          title="Buyurtmani rad etish"
          open={open}
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

export default LeadWaiting;
