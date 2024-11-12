import { useEffect, useState } from "react";
import axios from "axios";
import { Wrapper, Header, Input, Title } from "@/styles/global"; // Keep these as needed
import {
  Table,
  TableRow,
  TableCell,
  Badge,
  Select,
  Modal,
  ModalContent,
  ModalActions,
  ModalButton,
  StatusFilterButton,
  Titles,
  Textarea,
} from "./style"; // Ensure paths are correct
// import MessageIcon from "@/assets/message";
// import ViewIcon from "@/assets/view";
import { Button, Space, Select as SelectAntd, notification } from "antd";
import { ROUTER } from "@/constants/router";
import { DeleteFilled, EyeFilled, PlusCircleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "@/shared/api/request";
import { PaginationTen } from "@/components/paginationten";
import { LoaderWrapper } from "@/components/spinner/style";
import { ButtonElement } from "@/components/button/style";

// import { Pagination } from "@/components/pagination";
// import { Pagination } from "@/components/pagination";

const statusOptions = ["NEW", "ACCEPT", "REJECTED", "DELIVERED", "RECALL"];

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenCreate, setModalOpenCreate] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [titles, setTitles] = useState("ALL");
  const [modalOpenMsg, setModalOpenMsg] = useState(false); // Controls message modal
  const [text, setText] = useState(""); // State for text in textarea
  const [selectedLeadId, setSelectedLeadId] = useState(null); // Stores selected lead ID
  const [smsShablon, setSmsShablon] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [comment, setComment] = useState(null);
  const [count, setCount] = useState(0);
  const [isReCallOpen, setIsReCallOpen] = useState();
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const [counts, setCounts] = useState({});
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
    status: initial_params.has("status") ? initial_params.get("status") : "ALL",
  });
  const navigate = useNavigate();
  useEffect(() => {
    setParams({ ...params, page: 1 });
  }, [selectedStatus]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [products, setProducts] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("+998");
  const [productWithLead, setProductWithLead] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const fetchProducts = async (product) => {
    try {
      const response = await request.get(
        "https://api.salonchi.uz/api/v1/product/list/lead?search=" + product ||
          ""
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchProductsWithLead = async () => {
    try {
      const response = await request.get(
        "https://api.salonchi.uz/api/v1/lead/products"
      );
      setProductWithLead(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts("");
    fetchProductsWithLead();
  }, []);
  useEffect(() => {
    // fetchProducts(selectedProductId, selectedStatus);
  }, [selectedStatus]);
  const onChange = (value) => {
    setSelectedProductId(value);
  };

  const onSearch = (value) => {
    fetchProducts(value);
  };

  const confirmCreate = async () => {
    if (!userName || !userPhone) {
      api["error"]({
        message: "Error",
        description: "Iltimos, barcha ma'lumotlarni to'ldiring!",
      });
      return;
    }
    try {
      const response = await request.post(
        "https://api.salonchi.uz/api/v1/lead",
        {
          name: userName,
          product: selectedProductId,
          phone: userPhone,
        }
      );
      if (response.status === 201) {
        setModalOpenCreate(false);
        setSelectedProductId(null);
        setUserPhone("+998");
        setUserName("");
        api["success"]({
          message: "Success",
          description: "Lead muvaffaqiyatli yaratildi",
        });
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      api["error"]({
        message: "Error",
        description: "Lead yaratishda xatolik berdi!",
      });
    }
  };
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const userDataString = localStorage.getItem("userInfo");
        let userData;
        if (userDataString) {
          try {
            userData = JSON.parse(userDataString);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
        const response = await axios.get(
          "https://api.salonchi.uz/api/v1/lead?page=" +
            params.page +
            "&limit=" +
            20 +
            `&status=${
              selectedStatus === "ALL" ? "" : selectedStatus
            }&product_id=${selectedProductId ? selectedProductId : ""}`,
          {
            headers: {
              Authorization: `Bearer ${userData.access}`,
            },
          }
        );
        setLeads(response.data.results);
        setFilteredLeads(response.data.results);
        setCount(response.data.count);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSmsShablon = async () => {
      try {
        const response = await request.get(
          "https://api.salonchi.uz/api/v1/admin/sms"
        );
        setSmsShablon(response.data);
      } catch (error) {
        console.error("Error fetching sms shablon:", error);
      }
    };

    fetchSmsShablon();
    const fetchStatistics = async () => {
      try {
        const response = await request.get(
          "https://api.salonchi.uz/api/v1/lead/status/count?product=" +
            selectedProductId
        );
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchLeads();
    fetchStatistics();
  }, [params.page, selectedStatus, selectedProductId]);

  useEffect(() => {
    const handleFilterChange = (status) => {
      setSelectedStatus(status);
      if (status === "ALL") {
        setFilteredLeads(leads);
      } else {
        setFilteredLeads(leads.filter((lead) => lead.status === status));
      }
    };
    handleFilterChange(selectedStatus);
    setTitles(selectedStatus);
  }, [selectedStatus, titles, modalOpen]);

  const handleStatusChange = (lead, newStatus) => {
    setSelectedLead(lead);
    setNewStatus(newStatus);
    setModalOpen(true); // Open the modal for confirmation
  };
  const handleProductChange = async (product) => {
    setSelectedProductId(product);

    try {
      const response = await request.get(
        "https://api.salonchi.uz/api/v1/lead/status/count?product=" + product
      );
      const response2 = await request.get("lead?product_id=" + product);
      setFilteredLeads(response2.data.results);
      setCounts(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
    //
  };
  const confirmStatusChange = async () => {
    if (selectedLead && newStatus) {
      try {
        const userData = JSON.parse(localStorage.getItem("userInfo"));
        await axios.put(
          `https://api.salonchi.uz/api/v1/lead/${selectedLead.id}/status`,
          { status: newStatus, comment: comment, schedule: isReCallOpen },
          {
            headers: {
              Authorization: `Bearer ${userData?.access}`,
            },
          }
        );
        console.log("nimadir");
        window.location.reload();
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === selectedLead.id ? { ...lead, status: newStatus } : lead
          )
        );

        setModalOpen(false);
      } catch (error) {
        console.error("Error updating lead status:", error);
      }
    }
  };

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

  const openMessageModal = (leadId) => {
    setSelectedLeadId(leadId);
    setModalOpenMsg(true);
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));

      const payload = {
        leads: [selectedLeadId],
        all_lead: false,
        text,
      };

      await axios.post("https://api.salonchi.uz/api/v1/admin/sms", payload, {
        headers: {
          Authorization: `Bearer ${userData?.access}`,
        },
      });

      setModalOpenMsg(false);
      alert("Xabar jonatildi!");
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };
  const handleUserPhone = (e) => {
    if (e.target.value.length > 4) {
      let input = e.target.value.replace(/[^\d]/g, "");

      // Ensure it starts with +998
      if (!input.startsWith("998")) {
        input = "998";
      }

      // Apply formatting as +998-91-123-45-56
      let formatted = `+${input.slice(0, 3)}`;
      if (input.length > 3) formatted += `-${input.slice(3, 5)}`;
      if (input.length > 5) formatted += `-${input.slice(5, 8)}`;
      if (input.length > 8) formatted += `-${input.slice(8, 10)}`;
      if (input.length > 10) formatted += `-${input.slice(10, 12)}`;

      setUserPhone(formatted);
    }
  };
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedShablon = smsShablon.find(
      (shablon) => shablon.id === Number(selectedId)
    );
    if (selectedShablon) {
      setText(selectedShablon.text);
      setSelectedOption(selectedId);
    }
  };

  const closeModalMsg = () => {
    setModalOpenMsg(false);
    setSelectedOption("0");
  };
  const today = new Date().toLocaleDateString(); // Bugungi sana

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    const aDate = new Date(a.schedule).toLocaleDateString();
    const bDate = new Date(b.schedule).toLocaleDateString();

    // Bugungi sanani oldinga chiqarish
    if (aDate === today) return -1;
    if (bDate === today) return 1;
    return 0;
  });
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await request.delete(`/lead/${id}/delete`);
      if (res.status === 204) {
        window.location.reload();
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <Header>
        {contextHolder}
        <div className="header-top">
          <div className="header-top-left">
            <Title>{getStatusMessage(titles)}</Title>
            <SelectAntd
              // width="100%"
              style={{ width: "200px", marginBottom: "10px", alignSelf: "end" }}
              showSearch
              placeholder="Mahsulot tanlang"
              optionFilterProp="label"
              onChange={handleProductChange}
              onSearch={onSearch}
              options={[
                { value: "", label: "Barchasi" },
                ...productWithLead.map((product) => ({
                  value: product.product_id,
                  label: product.product__name_uz,
                })),
              ]}
            />
          </div>
          <div className="header-top-right">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg"
              width={40}
              alt="message-icon"
            />
            <div style={{ display: "flex", width: "50px", height: "40px" }}>
              <ButtonElement
                onClick={() => setModalOpenCreate(true)}
                style={{ padding: "5px 10px" }}
              >
                <PlusCircleFilled />
              </ButtonElement>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <StatusFilterButton
            isActive={selectedStatus === "ALL"}
            status="ALL"
            onClick={() => setSelectedStatus("ALL")}
          >
            Barchasi <p>{counts ? counts.all : ""}</p>
          </StatusFilterButton>
          <StatusFilterButton
            isActive={selectedStatus === "NEW"}
            status="NEW"
            onClick={() => setSelectedStatus("NEW")}
          >
            Yangi <p>{counts ? counts.new : ""}</p>
          </StatusFilterButton>
          <StatusFilterButton
            isActive={selectedStatus === "ACCEPT"}
            status="ACCEPT"
            onClick={() => setSelectedStatus("ACCEPT")}
          >
            Qabul qilingan <p>{counts ? counts.accepted : ""}</p>
          </StatusFilterButton>
          <StatusFilterButton
            isActive={selectedStatus === "REJECTED"}
            status="REJECTED"
            onClick={() => setSelectedStatus("REJECTED")}
          >
            Bekor qilingan <p>{counts ? counts.rejected : ""}</p>
          </StatusFilterButton>
          <StatusFilterButton
            isActive={selectedStatus === "DELIVERED"}
            status="DELIVERED"
            onClick={() => setSelectedStatus("DELIVERED")}
          >
            Yetkazilgan <p>{counts ? counts.delivered : ""}</p>
          </StatusFilterButton>
          <StatusFilterButton
            isActive={selectedStatus === "RECALL"}
            status="RECALL"
            onClick={() => setSelectedStatus("RECALL")}
          >
            Qayta aloqa <p>{counts ? counts.recall : ""}</p>
          </StatusFilterButton>
        </div>{" "}
      </Header>
      {filteredLeads.length == 0 && !loading ? (
        <Titles>Hozircha bu yer bosh:!</Titles>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableCell as="th">T/r</TableCell>
              <TableCell as="th">Ismi</TableCell>
              <TableCell as="th">Telefon raqami</TableCell>
              <TableCell as="th">Statusi</TableCell>

              {selectedStatus == "RECALL" ? (
                <TableCell as="th">Aloqa vaqti</TableCell>
              ) : (
                <TableCell as="th">Yaratilgan vaqti</TableCell>
              )}
              <TableCell as="th">Xolati</TableCell>
              <TableCell as="th">Ko`rish</TableCell>
              <TableCell as="th">Xabar</TableCell>
              <TableCell as="th">O&apos;chirish</TableCell>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              sortedLeads.map((lead, index) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    {(params.page - 1) * params.limit + index + 1}
                  </TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Badge getstatus={getStatusStyle(lead.status)}>
                      {getStatusMessage(lead.status)}
                    </Badge>
                  </TableCell>
                  {selectedStatus == "RECALL" ? (
                    <TableCell
                      className={
                        new Date(lead.schedule).toLocaleDateString() === today
                          ? "today-row"
                          : ""
                      }
                    >
                      {new Date(lead.schedule).toLocaleDateString()}
                    </TableCell>
                  ) : (
                    <TableCell>
                      {new Date(lead.created).toLocaleString()}
                    </TableCell>
                  )}

                  <TableCell>
                    <Select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead, e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {getStatusMessage(status)}
                        </option>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Space>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => navigate(`${ROUTER.DETAIL}/${lead.id}`)}
                      >
                        <EyeFilled />
                      </Button>
                    </Space>
                  </TableCell>
                  <TableCell>
                    <img
                      onClick={() => openMessageModal(lead.id)}
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg"
                      width={22}
                      alt="message-icon"
                    />
                    <a
                      href={`https://t.me/${lead.phone.replace(/[-\s]/g, "")}`}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png"
                        width={22}
                        alt="message-icon"
                      />
                    </a>
                  </TableCell>
                  <TableCell>
                    <Space>
                      <Button
                        type="primary"
                        className="delete-btn"
                        style={{ color: "red", borderColor: "red" }}
                        ghost
                        onClick={() => {
                          setSelectedLead(lead);
                          setDeleteModalOpen(true);
                        }}
                      >
                        <DeleteFilled />
                      </Button>
                    </Space>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <LoaderWrapper />
            )}
          </tbody>
          {/* <Pagination total={count} params={params} setParams={setParams} /> */}
        </Table>
      )}
      <PaginationTen total={count} params={params} setParams={setParams} />
      {deleteModalOpen && (
        <Modal>
          <ModalContent>
            <p>Siz ushbu leadni o&apos;chirmoqchimisiz?</p>
            <ModalActions>
              <ModalButton
                style={{ backgroundColor: "red" }}
                onClick={() => setDeleteModalOpen(false)}
              >
                Yo&apos;q
              </ModalButton>
              <ModalButton
                style={{ backgroundColor: "green" }}
                onClick={() => {
                  handleDelete(selectedLead.id);
                }}
              >
                O&apos;chirish
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
      {modalOpen && (
        <Modal>
          <ModalContent>
            <p>
              Siz {getStatusMessage(newStatus)} statusga o`zgartirmoqchimisiz?
            </p>
            {(newStatus == "RECALL" || newStatus == "REJECTED") && (
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Bekor qilish sababini kiriting..."
                required={true}
              />
            )}
            {newStatus == "RECALL" && (
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => setIsReCallOpen(e.target.value)}
                required={true}
              />
            )}
            <ModalActions>
              <ModalButton
                style={{ backgroundColor: "red" }}
                onClick={() => setModalOpen(false)}
              >
                Yoq
              </ModalButton>
              <ModalButton
                style={{ backgroundColor: "green" }}
                onClick={confirmStatusChange}
              >
                O&apos;zgartirish
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
      {modalOpenCreate && (
        <Modal>
          <ModalContent>
            <p>Lead yaratish</p>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required={true}
              placeholder="Mijoz ismi..."
            />
            <Input
              type="text"
              value={userPhone}
              onChange={(e) => handleUserPhone(e)}
              required={true}
              placeholder="Mijoz telefon raqami..."
            />
            <SelectAntd
              // width="100%"
              style={{ width: "100%", marginBottom: "10px" }}
              showSearch
              placeholder="Mahsulot tanlang"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={products.map((product) => ({
                value: product.id,
                label: product.name_uz,
              }))}
            />
            <ModalActions>
              <ModalButton onClick={() => setModalOpenCreate(false)}>
                Yoq
              </ModalButton>
              <ModalButton onClick={confirmCreate}>Ha</ModalButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
      {modalOpenMsg && (
        <Modal>
          <ModalContent>
            {/* Close Button */}
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={() => closeModalMsg()}
            >
              X
            </button>

            <h3>Xabar matnini tanlang</h3>

            <select onChange={handleSelectChange} value={selectedOption}>
              <option value="0">SMS Shablon</option>
              {smsShablon.map((shablon) => (
                <option key={shablon.id} value={shablon.id}>
                  {shablon.status} - {shablon.text.slice(0, 20)}...
                </option>
              ))}
            </select>

            <Textarea
              value={text}
              readOnly // Set textarea to read-only
              rows="4"
              placeholder="Xabar matnini tanlang..."
            />

            {/* Actions */}
            <ModalActions>
              <ModalButton onClick={handleSubmit}>Yuborish</ModalButton>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
};

// Function to return status styles
const getStatusStyle = (status) => {
  switch (status) {
    case "NEW":
      return { backgroundColor: "#FFD700" }; // Gold color for 'Kutilayotgan'
    case "ACCEPT":
      return { backgroundColor: "#007bff" }; // Blue for accepted
    case "REJECTED":
      return { backgroundColor: "#dc3545" }; // Red for rejected
    case "DELIVERED":
      return { backgroundColor: "#28a745" }; // Green for delivered
    case "RECALL":
      return { backgroundColor: "#ff851b" }; // Orange for recall
    default:
      return { backgroundColor: "#6c757d" }; // Grey for others
  }
};

export default Leads;
