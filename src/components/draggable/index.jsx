import { request } from "@/shared/api/request";
import { DragSortTable } from "@ant-design/pro-components/es";
import { message } from "antd";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "",
    dataIndex: "sort",
    width: 150,
    className: "drag-visible",
  },
  {
    title: "ID",
    dataIndex: "key",
    width: 150,
    className: "drag-visible",
  },
  {
    title: "Kategoriya nomi",
    dataIndex: "name",
    className: "drag-visible",
  },
];

const CategoryOrders = () => {
  const [dataa, setDataa] = useState([]);
  const [dataSource, setDataSource] = useState([...dataa]);
  useEffect(() => {
    const getData = async () => {
      const response = await request.get("/category/list");
      setDataa(response.data);
      setDataSource(
        response.data.map((item) => ({
          key: item.id.toString(),
          name: item.name_uz,
        }))
      );
    };
    getData();
  }, []);
  const handleDragSortEnd = async (beforeIndex, afterIndex, newDataSource) => {
    console.log(beforeIndex, afterIndex, dataSource.length);
    console.log(
      "self",
      dataSource[beforeIndex],
      "bitta oldingi",
      dataSource[
        afterIndex === dataSource.length - 2
          ? dataSource.length - 2
          : afterIndex - 1
      ]?.key
    );
    setDataSource(newDataSource);
    const response = await request.post(
      "admin/category/" + dataSource[beforeIndex]?.key + "/ordering",
      {
        above_category:
          dataSource[
            afterIndex === dataSource.length - 2
              ? dataSource.length - 2
              : afterIndex - 1
          ]?.key,
      }
    );
    if (response.status === 200) {
      message.success("O'zgartirildi");
    } else {
      message.error("Xatolik");
    }
  };

  return (
    <DragSortTable
      headerTitle="Kategoriyalarni ketma-ketligini o'zgartirish"
      columns={columns}
      rowKey="key"
      search={false}
      pagination={false}
      dataSource={dataSource}
      dragSortKey="sort"
      onDragSortEnd={handleDragSortEnd}
    />
  );
};
export default CategoryOrders;
