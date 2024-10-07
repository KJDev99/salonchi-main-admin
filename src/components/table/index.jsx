import { Table } from "antd";
import PropTypes from "prop-types";
import { TableWrapper } from "./style";

export const CustomTable = ({ columns, data, loading, ...props }) => {
  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        {...props}
      />
    </TableWrapper>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  style: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};
