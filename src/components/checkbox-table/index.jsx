import { Table } from "antd";
import PropTypes from "prop-types";
import { TableWrapper } from "./style";

export const CustomCheckboxTable = ({
  columns,
  data,
  style,
  loading,
  selectedRowKeys,
  setSelectedRowKeys,
  ...props
}) => {
  const onSelectChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  return (
    <TableWrapper>
      <Table
        style={style}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowSelection={rowSelection}
        {...props}
      />
    </TableWrapper>
  );
};

CustomCheckboxTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  style: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  selectedRowKeys: PropTypes.array,
  setSelectedRowKeys: PropTypes.any,
};
