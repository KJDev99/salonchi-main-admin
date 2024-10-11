import { useEffect, useState } from "react";
import axios from "axios";
import { Wrapper, Header, Title } from "@/styles/global"; // Keep these as needed
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
import MessageIcon from "@/assets/message";
// import ViewIcon from "@/assets/view";
import { Button, Space } from "antd";
import { ROUTER } from "@/constants/router";
import { EyeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { Pagination } from "@/components/pagination";

const statusOptions = ["NEW", "ACCEPT", "REJECTED", "DELIVERED", "RECALL"];

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [titles, setTitles] = useState("ALL");
  const [modalOpenMsg, setModalOpenMsg] = useState(false); // Controls message modal
  const [text, setText] = useState(""); // State for text in textarea
  const [selectedLeadId, setSelectedLeadId] = useState(null); // Stores selected lead ID
  const [smsShablon, setSmsShablon] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [comment, setComment] = useState(null);
  const [isReCallOpen, setIsReCallOpen] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
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
          "https://api.salonchi.uz/api/v1/lead",
          {
            headers: {
              Authorization: `Bearer ${userData.access}`,
            },
          }
        );
        setLeads(response.data.results);
        setFilteredLeads(response.data.results);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();

    const fetchSmsShablon = async () => {
      try {
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
          "https://api.salonchi.uz/api/v1/admin/sms",
          {
            headers: {
              Authorization: `Bearer ${userData.access}`,
            },
          }
        );
        setSmsShablon(response.data);
      } catch (error) {
        console.error("Error fetching sms shablon:", error);
      }
    };

    fetchSmsShablon();
  }, []);

  const handleFilterChange = (status) => {
    setSelectedStatus(status);
    if (status === "ALL") {
      setFilteredLeads(leads);
    } else {
      setFilteredLeads(leads.filter((lead) => lead.status === status));
    }
  };

  useEffect(() => {
    handleFilterChange(selectedStatus);
    setTitles(selectedStatus);
  }, [selectedStatus, titles, modalOpen]);

  const handleStatusChange = (lead, newStatus) => {
    setSelectedLead(lead);
    setNewStatus(newStatus);
    setModalOpen(true); // Open the modal for confirmation
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

  if (loading) return <p>Loading...</p>;
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

  return (
    <Wrapper>
      <Header>
        <Title>{getStatusMessage(titles)}</Title>
        <div>
          <StatusFilterButton
            isActive={selectedStatus === "ALL"}
            onClick={() => setSelectedStatus("ALL")}
          >
            Barchasi
          </StatusFilterButton>
          <StatusFilterButton
            isActive={selectedStatus === "NEW"}
            onClick={() => setSelectedStatus("NEW")}
          >
            Yangi
          </StatusFilterButton>
          <StatusFilterButton
            isActive={selectedStatus === "ACCEPT"}
            onClick={() => setSelectedStatus("ACCEPT")}
          >
            Qabul qilingan
          </StatusFilterButton>
          <StatusFilterButton
            isActive={selectedStatus === "REJECTED"}
            onClick={() => setSelectedStatus("REJECTED")}
          >
            Bekor qilingan
          </StatusFilterButton>
          <StatusFilterButton
            isActive={selectedStatus === "DELIVERED"}
            onClick={() => setSelectedStatus("DELIVERED")}
          >
            Yetkazilgan
          </StatusFilterButton>
          <StatusFilterButton
            isActive={selectedStatus === "RECALL"}
            onClick={() => setSelectedStatus("RECALL")}
          >
            Qayta aloqa
          </StatusFilterButton>
        </div>
      </Header>
      {filteredLeads.length == 0 ? (
        <Titles>Hozircha bu yer bosh:!</Titles>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableCell as="th">T/r</TableCell>
              <TableCell as="th">Ismi</TableCell>
              <TableCell as="th">Telefon raqami</TableCell>
              <TableCell as="th">Statusi</TableCell>
              <TableCell as="th">Yaratilgan vaqti</TableCell>
              <TableCell as="th">Xolati</TableCell>
              <TableCell as="th">Ko`rish</TableCell>
              <TableCell as="th">Xabar</TableCell>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => (
              <TableRow key={lead.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>
                  <Badge getstatus={getStatusStyle(lead.status)}>
                    {getStatusMessage(lead.status)}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(lead.created).toLocaleString()}</TableCell>
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
                <TableCell onClick={() => openMessageModal(lead.id)}>
                  <MessageIcon />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
          {/* <Pagination total={count} params={params} setParams={setParams} /> */}
        </Table>
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
              <ModalButton onClick={confirmStatusChange}>Ha</ModalButton>
              <ModalButton onClick={() => setModalOpen(false)}>Yoq</ModalButton>
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
