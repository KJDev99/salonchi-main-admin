import styled from "styled-components";

export const TableWrapper = styled("div")`
  width: 100%;
  overflow-x: auto;
  .ant-table-row > tr > td {
    height: 5px;
    padding: 4px;
  }
  .ant-table-tbody .ant-table-cell {
    height: 10px !important;
    padding: 0 !important;
    p {
      margin: 0 !important;
    }
  }
`;
