import { ReactComponent as IconCategory } from "@/assets/category.svg";
import { ReactComponent as IconOrders } from "@/assets/orders.svg";
import { ReactComponent as IconUser } from "@/assets/user.svg";
import { ReactComponent as IconLogout } from "@/assets/logout.svg";
import { ReactComponent as IconInventory } from "@/assets/inventory.svg";
// import { ReactComponent as SillerIcon } from "@/assets/siller.svg";
import {
  FolderOutlined,
  PhoneOutlined,
  SettingFilled,
  TeamOutlined,
} from "@ant-design/icons";
import { GiCarousel } from "react-icons/gi";
import { AiOutlineCodeSandbox } from "react-icons/ai";

export const useMenu = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const admin = user?.is_superuser;
  const worker = user?.is_worker;

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const superadminItems = [
    getItem("Statistikalar", "admin/statistics", <IconInventory />),
    getItem("Maxsulotlar", "admin/products", <IconInventory />),
    getItem("Hodimlar", "admin/staff", <IconUser />),
    // getItem("Sotuvchi Adminlar", "admin/seller-admins", <SillerIcon />),
    getItem("Mijozlar bazasi", "admin/customer-base", <SettingFilled />),
    getItem("Harajatlar", "admin/expenses", <IconInventory />),
    // getItem("Optom mijozlar", "admin/wholesale-customers", <IconInventory />),
    getItem("Sozlamalar", "admin/settings", <SettingFilled />),
    getItem("Chiqish", "logout", <IconLogout />),
  ];

  const workerItems = [
    getItem("Kutilayotgan buyurtmalar", "admin/orders-waiting", <IconOrders />),
    getItem("Buyurtmalar", "admin/orders", <IconOrders />),
    getItem(
      "Kuryerga chiqarilganlar",
      "admin/on-the-way-orders",
      <IconOrders />
    ),
    getItem("Qayta aloqa", "admin/re-call", <PhoneOutlined />),
    getItem("Arxiv", "admin/archive", <FolderOutlined />),
    getItem("Kutilayotgan leadlar", "admin/waiting-leads", <TeamOutlined />),
    getItem("Leadlar", "admin/leads", <TeamOutlined />),
    // getItem("Xabar jo'natish", "admin/sms", <PhoneOutlined />),
    getItem("Ishchilar", "admin/workers", <TeamOutlined />),
    getItem("Sozlamalar", "admin/settings", <SettingFilled />),
    getItem("Chiqish", "logout", <IconLogout />),
  ];

  const warehouseItems = [
    getItem("Kategoriyalar", "admin/categories", <IconCategory />),
    getItem("Maxsulotlar", "admin/products", <IconInventory />),
    getItem(
      "Qabul qilingan buyurtmalar",
      "admin/accepted-orders",
      <IconOrders />
    ),
    getItem("Slider", "admin/slider", <GiCarousel />),
    // getItem("Box", "admin/box", <AiOutlineCodeSandbox />),
    getItem("Sozlamalar", "admin/settings", <SettingFilled />),
    getItem("IKPU", "admin/ikpu", <AiOutlineCodeSandbox />),
    getItem("Chiqish", "logout", <IconLogout />),
  ];

  const PERMISSIONS = admin
    ? superadminItems
    : worker
    ? workerItems
    : warehouseItems;

  return {
    items: PERMISSIONS,
  };
};
