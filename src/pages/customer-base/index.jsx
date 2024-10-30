import { CustomTable } from "@/components/table";
import { Header, Title, Wrapper } from "@/styles/global";
import { useList } from "./useList";
import { Pagination } from "@/components/pagination";
import { FilterBtn } from "./style";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MessageIcon from "@/assets/message";
import {
  Modal,
  ModalActions,
  ModalButton,
  ModalContent,
  Textarea,
} from "../leads/style";

const Customerbase = () => {
  const { count, data, columns, params, isLoading, setParams } = useList();

  const [filteredData, setFilteredData] = useState(false);

  const [newData, setNewData] = useState([]);

  const [modalOpenMsg, setModalOpenMsg] = useState(false); // Controls message modal
  const [text, setText] = useState(""); // State for text in textarea
  const [smsShablon, setSmsShablon] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const TableContainer = styled.div`
    width: 100%;
    margin: 20px auto;
    border-collapse: collapse;
  `;

  // Styling for the table itself
  const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  `;

  // Styling for table headers
  const TableHeader = styled.th`
    padding: 12px;
    background-color: #f8f9fa;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    text-align: left;
  `;

  // Styling for table rows
  const TableRow = styled.tr`
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
  `;

  // Styling for table data cells
  const TableData = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
  `;

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
        setNewData(response.data.results);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }

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
          "https://api.salonchi.uz/api/v1/lead/waiting",
          {
            headers: {
              Authorization: `Bearer ${userData?.access}`,
            },
          }
        );
        setNewData(response.data.results, ...newData);
      } catch (error) {
        console.error("Error fetching leads:", error);
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
        console.log(response.data, "sms shablon");
      } catch (error) {
        console.error("Error fetching sms shablon:", error);
      }
    };

    fetchSmsShablon();
  }, []);

  const openMessageModal = () => {
    setModalOpenMsg(true); // Open modal
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));

      const payload = {
        leads: [],
        all_lead: true,
        text,
      };

      // Make the POST request
      await axios.post("https://api.salonchi.uz/api/v1/admin/sms", payload, {
        headers: {
          Authorization: `Bearer ${userData?.access}`,
        },
      });

      // Close the modal and show a success message
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
        <Title>Mijozlar bazasi</Title>
        <FilterBtn>
          <button
            className={filteredData ? "" : "active"}
            onClick={() => setFilteredData(false)}
          >
            Mijozlar
          </button>
          <button
            className={filteredData ? "active" : ""}
            onClick={() => setFilteredData(true)}
          >
            Leadlar
          </button>
          <div className="msg" onClick={() => openMessageModal()}>
            <MessageIcon />
          </div>
        </FilterBtn>
      </Header>
      {filteredData ? (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>T/r</TableHeader>
                <TableHeader>Ism va familiyasi</TableHeader>
                <TableHeader>Telefon raqami</TableHeader>
              </tr>
            </thead>
            <tbody>
              {newData.map((item, index) => (
                <TableRow key={index}>
                  <TableData>{index + 1}</TableData>
                  <TableData>{item.name}</TableData>
                  <TableData>{item.phone}</TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      ) : (
        <CustomTable columns={columns} data={data} loading={isLoading} />
      )}
      <Pagination params={params} setParams={setParams} total={count} />

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

            {/* Title */}
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

export default Customerbase;
