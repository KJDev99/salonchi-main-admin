import { Table } from "antd";
import PropTypes from "prop-types";
import { TableWrapper } from "./style";

export const CustomTable = ({ columns, data, style, loading, ...props }) => {
  return (
    <TableWrapper>
      <Table
        style={style}
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
  columns: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  style: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};
