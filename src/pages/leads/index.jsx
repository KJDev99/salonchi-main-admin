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
  StatusFilter,
  StatusFilterButton,
  Titles,
} from "./style"; // Ensure paths are correct
import MessageIcon from "@/assets/message";
import ViewIcon from "@/assets/view";

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
        console.log(response.data);

        setFilteredLeads(response.data.results); // Initially show all leads
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleFilterChange = (status) => {
    setSelectedStatus(status);
    if (status === "ALL") {
      setFilteredLeads(leads);
      console.log(leads, "all");
    } else {
      setFilteredLeads(leads.filter((lead) => lead.status === status));
    }
  };
  useEffect(() => {
    handleFilterChange(selectedStatus);
    setTitles(selectedStatus);
  }, [selectedStatus]);

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
          { status: newStatus },
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
                  <ViewIcon />
                </TableCell>
                <TableCell>
                  <MessageIcon />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}

      {modalOpen && (
        <Modal>
          <ModalContent>
            <p>
              Siz {getStatusMessage(newStatus)} statusga o`zgartirmoqchimisiz?
            </p>
            <ModalActions>
              <ModalButton onClick={confirmStatusChange}>Ha</ModalButton>
              <ModalButton onClick={() => setModalOpen(false)}>Yoq</ModalButton>
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
