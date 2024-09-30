import { DatePicker } from "antd";
import styled from "styled-components";

const { RangePicker } = DatePicker;

export const CustomCalendar = styled(DatePicker)`
  width: 100%;
  height: 35px;
  border: 1px solid #eee;
  margin: 4px 0px;
`;

export const DoubleDatePicker = styled(RangePicker)`
  width: 100%;
  height: 35px;
  border: 1px solid #eee;
  margin: 4px 0px;
`;
