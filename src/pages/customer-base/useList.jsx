import { Image } from "antd";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys";
import { useSearchParams } from "@/hooks/useSearchParams";
import { getCustomers } from "@/shared/modules/customer-list";
import { useQuery } from "@tanstack/react-query";

export const useList = () => {
  const { params, setParams } = useSearchParams();
  const {
    data: customerList = {
      count: 0,
      data: [],
    },
    isLoading,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.CUSTOMER_LIST, params],
    queryFn: () => getCustomers(params),
    select: (res) => {
      return {
        count: res?.data?.count,
        data: res?.data?.results,
      };
    },
  });

  const columns = [
    {
      title: "T/r",
      key: "row",
      render: (id, record, index) => (
        <p>{(params.page - 1) * params.limit + index + 1}</p>
      ),
    },
    {
      title: "Photo",
      key: "photo",
      render: (row) => {
        return row?.photo === null ? (
          <Image
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user"
            width={30}
          />
        ) : (
          <Image src={row?.photo} width={40} />
        );
      },
    },
    {
      title: "Ism va familiyasi",
      key: "firstname",
      dataIndex: "firstname",
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Manzili",
      key: "row",
      render: (row) => <p>{row?.address === null ? "-" : row?.address}</p>,
    },
  ];

  return {
    count: customerList.count,
    data: customerList.data,
    columns,
    params,
    isLoading,
    setParams,
  };
};
