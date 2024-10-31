import { useEffect, useState } from "react";
import axios from "axios";
import { Wrapper, Header, Title } from "@/styles/global"; // Keep these as needed
import {
  Table,
  TableRow,
  TableCell,
  Badge,
  Modal,
  ModalContent,
  ModalActions,
  ModalButton,
  StatusEditButton,
} from "./style"; // Ensure paths are correct
import { Titles } from "../leads/style";
import { PaginationTen } from "@/components/paginationten";
import { useLocation } from "react-router-dom";

const WaitingLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [count, setCount] = useState(0);
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 20,
  });
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
          "https://api.salonchi.uz/api/v1/lead/waiting" +
            `?page=${params.page}`,
          {
            headers: {
              Authorization: `Bearer ${userData?.access}`,
            },
          }
        );
        setLeads(response.data.results);
        setFilteredLeads(response.data.results); // Show all leads initially
        setCount(response.data.count);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [params.page]);

  const handleStatusChange = (lead) => {
    setSelectedLead(lead);
    setModalOpen(true); // Open the modal for confirmation
  };

  const confirmStatusChange = async () => {
    if (selectedLead) {
      try {
        const userData = JSON.parse(localStorage.getItem("userInfo"));
        await axios.put(
          `https://api.salonchi.uz/api/v1/lead/${selectedLead.id}/status`,
          { status: "NEW" },
          {
            headers: {
              Authorization: `Bearer ${userData?.access}`,
            },
          }
        );
        // Update the leads list after status change
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === selectedLead.id ? { ...lead, status: "NEW" } : lead
          )
        );
        setModalOpen(false);
      } catch (error) {
        console.error("Error updating lead status:", error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Wrapper>
      <Header>
        <Title>Kutilayotgan Leadlar</Title>
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
              <TableCell as="th">Actions</TableCell>
              {/* <TableCell as="th">Ko'rish</TableCell> */}
              {/* <TableCell as="th">Xabar</TableCell> */}
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
                    {lead.status === "WAITING" ? "Kutilayotgan" : lead.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(lead.created).toLocaleString()}</TableCell>
                <TableCell>
                  {lead.status === "WAITING" && (
                    <StatusEditButton onClick={() => handleStatusChange(lead)}>
                      Qabul qilish
                    </StatusEditButton>
                  )}
                </TableCell>
                {/* <TableCell>
                  <MessageIcon />
                </TableCell> */}
                {/* <TableCell>
                  <MessageIcon />
                </TableCell> */}
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
      <PaginationTen total={count} params={params} setParams={setParams} />
      {/* Modal for confirmation */}
      {modalOpen && (
        <Modal>
          <ModalContent>
            <p>Siz ushbu buyurtmani qabul qilmoqchimisiz?</p>
            <ModalActions>
              <ModalButton
                style={{ backgroundColor: "red" }}
                onClick={() => setModalOpen(false)}
              >
                Yo&apos;q
              </ModalButton>

              <ModalButton
                style={{ backgroundColor: "green" }}
                onClick={confirmStatusChange}
              >
                Qabul qilish
              </ModalButton>
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
      return { backgroundColor: "#FFD700" }; // Gold for 'Kutilayotgan'
    case "ACCEPT":
      return { backgroundColor: "#007bff" }; // Blue for 'Accepted'
    default:
      return { backgroundColor: "#6c757d" }; // Grey for other statuses
  }
};

export default WaitingLeads;
