import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Select, TextArea, Button } from "./style";

const Sms = () => {
  const [smsText, setSmsText] = useState<string>("");
  const [isTemplate, setIsTemplate] = useState<boolean>(false);

  useEffect(() => {
    const fetchSmsTemplate = async () => {
      const userDataString = localStorage.getItem("userInfo");
      let userData;
      if (userDataString) {
        try {
          userData = JSON.parse(userDataString);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }

      try {
        const response = await axios.get(
          "https://api.salonchi.uz/api/v1/admin/sms",
          {
            headers: {
              Authorization: `Bearer ${userData?.access}`,
            },
          }
        );
        if (response.data && response.data.length > 0) {
          setSmsText(response.data[0].text);
        }
      } catch (error) {
        console.error("Failed to fetch SMS template", error);
      }
    };

    fetchSmsTemplate();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "shablon") {
      setIsTemplate(true);
    } else {
      setIsTemplate(false);
      setSmsText("");
    }
  };

  const handleSend = () => {
    // You can define the function to handle "Jo'natish" here
    console.log("Jo'natish button clicked", smsText);
  };

  return (
    <Container>
      <Select onChange={handleSelectChange}>
        <option value="qo'lda">Qo'lda</option>
        <option value="shablon">Shablon</option>
      </Select>
      <TextArea
        value={isTemplate ? smsText : smsText}
        onChange={(e: any) => !isTemplate && setSmsText(e.target.value)} // Allows editing if not a template
        disabled={isTemplate}
        placeholder={isTemplate ? "" : "SMS matnini yozing..."}
      />
      <Button onClick={handleSend}>Jo'natish</Button>
    </Container>
  );
};

export default Sms;
