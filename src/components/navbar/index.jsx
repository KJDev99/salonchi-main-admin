import { getUser } from "@/utils/user";
import { AccountCard, BellContainer, OrdersCard, Wrapper } from "./style";
import { GoBell } from "react-icons/go";
import { Avatar, Image } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getUserName } from "@/shared/modules/settings";
import { request } from "@/shared/api/request";
import { UserOutlined } from "@ant-design/icons";

export const Navbar = () => {
  const user = getUser();
  const admin = user?.is_superuser;
  const worker = user?.is_worker;

  const { data: updateUser = null } = useQuery({
    queryKey: ["get-user-info"],
    queryFn: getUserName,
    select: (res) => res?.data,
  });

  const { data: userInfo = null } = useQuery({
    queryKey: ["get-me-statistics"],
    queryFn: () => request("/admin/me/statistics"),
    select: (res) => res?.data,
    enabled: worker,
  });

  console.log(user, "user");

  return (
    <Wrapper>
      {admin && (
        <BellContainer>
          <GoBell />
          <div className="new-message">1</div>
        </BellContainer>
      )}

      {worker && (
        <OrdersCard>
          buyurtmalar
          <div className="order-count">{userInfo?.order?.count}ta</div>
        </OrdersCard>
      )}
      {worker && (
        <OrdersCard>
          maoshi
          <div className="order-count">{userInfo?.order?.salary} so`m</div>
        </OrdersCard>
      )}
      <AccountCard>
        <div className="user-name">{updateUser?.firstname}</div>
        {updateUser === null || user?.photo === "" ? (
          <Image
            src={updateUser?.photo || user?.photo}
            alt="people"
            width={40}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <Avatar icon={<UserOutlined style={{ fontSize: 16 }} />} />
        )}
      </AccountCard>
    </Wrapper>
  );
};
