import { useEffect, useState } from "react";
import axios from "axios";
import { Wrapper, Header, Title } from "@/styles/global";
import { Table, TableRow, TableCell, Badge, ActionButton } from "./style"; // Ensure paths are correct

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const userDataString = localStorage.getItem("userInfo");
        let userData;
        if (userDataString) {
          try {
            userData = JSON.parse(userDataString); // Converts the JSON string back to an object
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
        const response = await axios.get(
          "https://api.salonchi.uz/api/v1/lead",
          {
            headers: {
              Authorization: `Bearer ${userData.access}`, // Attach Bearer token
            },
          }
        );
        setLeads(response.data.results);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Wrapper>
      <Header>
        <Title>Kutilayotgan buyurtmalar</Title>
      </Header>
      <Table>
        <thead>
          <tr>
            <TableCell as="th">T/r</TableCell>
            <TableCell as="th">Buyurtma ID si</TableCell>
            <TableCell as="th">Telefon raqami</TableCell>
            <TableCell as="th">Statusi</TableCell>
            <TableCell as="th">Yaratilgan vaqti</TableCell>
            <TableCell as="th">Actions</TableCell>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <TableRow key={lead.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{lead.id}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>
                <Badge getstatus={getStatusStyle(lead.status)}>
                  {lead.status === "NEW" ? "Kutilayotgan" : lead.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(lead.created).toLocaleString()}</TableCell>
              <TableCell>
                <ActionButton>Buyurtmani olish</ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

// Function to return status styles
const getStatusStyle = (status) => {
  switch (status) {
    case "NEW":
      return { backgroundColor: "#FFD700" }; // Gold color for 'Kutilayotgan'
    case "COMPLETED":
      return { backgroundColor: "#28a745" }; // Green color for completed
    default:
      return { backgroundColor: "#6c757d" }; // Grey for others
  }
};

export default Leads;
