import { DATE_FORMAT } from "@/constants/format";
import { getLeadRecords } from "@/shared/modules/roles";
import { Text } from "@/styles/global";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useLocation, useParams } from "react-router-dom";
import image1 from "@/assets/111.png";
import image2 from "@/assets/222.png";
import { Image } from "antd";
export const useList = () => {
  const { search } = useLocation();
  const { id } = useParams();
  const initial_params = new URLSearchParams(search);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: initial_params.has("limit")
      ? Number(initial_params.get("limit"))
      : 10,
  });
  const {
    data: records = {
      data: [],
      count: 0,
    },
    isLoading,
  } = useQuery({
    queryKey: ["get-role-list", params],
    queryFn: () => getLeadRecords(params, id),
    select: (res) => {
      return { data: res?.data?.results, count: res?.data?.count };
    },
  });

  // const { mutate } = useMutation((data) => deleteEmployee(data), {
  //   onSuccess: () => {
  //     refetch();
  //     api["success"]({
  //       message: "Success",
  //       description: "Hodim muvaffaqiyatli o`chirildi",
  //     });
  //   },
  // });

  // const handleEdit = (id) => {
  //   navigate(`edit/${id}`);
  // };

  // const handleDelete = (id) => {
  //   confirm({
  //     title: "Rostdan ham hodimni o`chirmoqchimisiz?",
  //     icon: <ExclamationCircleOutlined />,
  //     onOk() {
  //       mutate(id);
  //     },
  //     onCancel() {
  //       console.log("Cancel");
  //     },
  //     okButtonProps: {
  //       style: {
  //         background: "var(--main-red)",
  //       },
  //     },
  //   });
  // };

  const columns = [
    {
      title: "T/r",
      key: "row",
      render: (id, record, index) => (
        <p style={{ textAlign: "center" }}>
          {(params.page - 1) * params.limit + index + 1}
        </p>
      ),
    },
    {
      title: "Operator raqami",
      // dataIndex: "firstname",
      key: "row",
      render: (row) => (
        <>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {row?.caller?.length === 3 ? row?.caller : row?.callee}
          </Text>
        </>
      ),
    },
    {
      title: "Mijoz raqami",
      key: "row",
      render: (row) => (
        <>
          <Text>{row?.caller?.length === 3 ? row?.callee : row?.caller}</Text>
        </>
      ),
    },
    {
      title: "Vaqt",
      key: "row",
      render: (row) => (
        <>
          <Text>{dayjs(row.date).format(DATE_FORMAT)}</Text>
        </>
      ),
    },
    {
      title: "Qo'ngiroq turi",
      key: "row",
      render: (row) => (
        <div style={{ textAlign: "center" }}>
          {row?.caller?.length === 3 ? (
            <Image src={image1} style={{ height: "40px" }} />
          ) : (
            <Image src={image2} style={{ height: "40px" }} />
          )}
        </div>
      ),
    },
    {
      title: "Aloqa vaqti",
      key: "row",
      render: (row) => (
        <Text style={{ textAlign: "center" }}>
          {" "}
          {row?.dialog_duration} sekund
        </Text>
      ),
    },
    // {
    //   title: "Bekor qilinganlar",
    //   key: "row",
    //   render: (row) => (
    //     <Text className="cancelled-text">
    //       {row?.detail?.orders_count?.cancelled} ta
    //     </Text>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <ReactAudioPlayer
          style={{ width: "300px" }}
          src={record?.download_file}
          controls
        />
      ),
    },
  ];

  return {
    records,
    columns,
    isLoading,
    count: records.count,
    params,
    setParams,
  };
};
