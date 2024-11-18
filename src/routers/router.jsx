/* eslint-disable react-refresh/only-export-components */
import { ROUTER } from "@/constants/router";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRouter } from "./private/private";
import WorkersTable from "@/pages/workers";

const Auth = lazy(async () => await import("@/pages/auth"));
const Products = lazy(async () => await import("@/pages/products"));
const NotFound = lazy(async () => await import("@/pages/404"));
const Staff = lazy(async () => await import("@/pages/staff"));
const StaffCrud = lazy(async () => await import("@/pages/staff/crud"));
const Roles = lazy(async () => await import("@/pages/roles"));
const Categories = lazy(async () => await import("@/pages/categories"));
const CategoryOrders = lazy(async () => await import("@/pages/category-order"));
const SubCategories = lazy(async () => await import("@/pages/subcategories"));
const Orders = lazy(async () => await import("@/pages/orders"));
const OrderDetail = lazy(async () => await import("@/pages/orders/detail"));
const OrdersWaiting = lazy(async () => await import("@/pages/orders-waiting"));
const Sms = lazy(async () => await import("@/pages/sms"));
const Leads = lazy(async () => await import("@/pages/leads"));
const WaitingLeads = lazy(async () => await import("@/pages/waiting-leads"));
const OrderDetailWaiting = lazy(
  async () => await import("@/pages/orders-waiting/detail")
);
const Statistics = lazy(async () => await import("@/pages/statistics"));
const CreateCategory = lazy(
  async () => await import("@/pages/categories/crud")
);
const CreateSubCategory = lazy(
  async () => await import("@/pages/subcategories/crud")
);
const CreateProducts = lazy(async () => await import("@/pages/products/crud"));
const Settings = lazy(async () => await import("@/pages/settings"));
const Archive = lazy(async () => await import("@/pages/archive"));
const AcceptedOrders = lazy(
  async () => await import("@/pages/accepted-orders")
);
const AcceptedOrderDetail = lazy(
  async () => await import("@/pages/accepted-orders/details")
);
const OnTheWayOrders = lazy(
  async () => await import("@/pages/ontheway-orders")
);
const ReCall = lazy(async () => await import("@/pages/re-call"));
const OrderOntheWayDetails = lazy(
  async () => await import("@/pages/ontheway-orders/details")
);
const ReCallOrderDetails = lazy(
  async () => await import("@/pages/re-call/details")
);
const ArchiveOrderDetails = lazy(
  async () => await import("@/pages/archive/details")
);
const LeadWaiting = lazy(async () => await import("@/pages/leads/detail"));

const Slider = lazy(async () => await import("@/pages/slider"));
const CreateBanner = lazy(async () => await import("@/pages/slider/crud"));

// const Box = lazy(async () => await import("@/pages/box"));
// const CreateBox = lazy(async () => await import("@/pages/box/create"));

const Customerbase = lazy(async () => await import("@/pages/customer-base"));

const Expenses = lazy(async () => await import("@/pages/expenses"));

const WholesaleCustomers = lazy(
  async () => await import("@/pages/wholesale-customers")
);

const SellerAdmins = lazy(async () => await import("@/pages/seller-admins"));
const SellerView = lazy(async () => await import("@/pages/seller-view"));

const Ikpu = lazy(async () => await import("@/pages/ikpu"));

export const router = createBrowserRouter([
  {
    path: ROUTER.LOGIN,
    element: <Auth />,
  },
  {
    path: ROUTER.ADMIN,
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTER.PRODUCTS,
        element: <Products />,
      },
      {
        path: ROUTER.PRODUCTS + ROUTER.CREATE,
        element: <CreateProducts />,
      },
      {
        path: ROUTER.PRODUCTS + ROUTER.EDIT + "/:id",
        element: <CreateProducts />,
      },
      {
        path: ROUTER.CATEGORIES,
        element: <Categories />,
      },
      {
        path: ROUTER.CATEGORIES_ORDERS,
        element: <CategoryOrders />,
      },
      {
        path: ROUTER.CATEGORIES + ROUTER.CREATE,
        element: <CreateCategory />,
      },
      {
        path: ROUTER.CATEGORIES + ROUTER.EDIT + "/:id",
        element: <CreateCategory />,
      },
      {
        path: ROUTER.CATEGORIES + ":id/" + ROUTER.SUBCATEGORIES,
        element: <SubCategories />,
      },
      {
        path: ROUTER.CATEGORIES + ":id/" + ROUTER.SUBCATEGORIES + ROUTER.CREATE,
        element: <CreateSubCategory />,
      },
      {
        path:
          ROUTER.CATEGORIES +
          ":id/" +
          ROUTER.SUBCATEGORIES +
          ROUTER.EDIT +
          "/:subid",
        element: <CreateSubCategory />,
      },
      {
        path: ROUTER.ORDERS,
        element: <Orders />,
      },
      {
        path: `${ROUTER.ORDERS}/` + ROUTER.DETAIL + "/:id",
        element: <OrderDetail />,
      },
      {
        path: ROUTER.ORDERS_WAITING,
        element: <OrdersWaiting />,
      },
      {
        path: `${ROUTER.ORDERS_WAITING}/` + ROUTER.DETAIL + "/:id",
        element: <OrderDetailWaiting />,
      },
      {
        path: ROUTER.ACCEPTED_ORDERS,
        element: <AcceptedOrders />,
      },
      {
        path: `${ROUTER.ACCEPTED_ORDERS}/` + ROUTER.DETAIL + "/:id",
        element: <AcceptedOrderDetail />,
      },
      {
        path: ROUTER.ONTHEWAY_ORDERS,
        element: <OnTheWayOrders />,
      },
      {
        path: `${ROUTER.ONTHEWAY_ORDERS}/` + ROUTER.DETAIL + "/:id",
        element: <OrderOntheWayDetails />,
      },
      {
        path: ROUTER.RE_CALL,
        element: <ReCall />,
      },
      {
        path: `${ROUTER.RE_CALL}/` + ROUTER.DETAIL + "/:id",
        element: <ReCallOrderDetails />,
      },
      {
        path: ROUTER.ARCHIVE,
        element: <Archive />,
      },
      {
        path: `${ROUTER.ARCHIVE}/` + ROUTER.DETAIL + "/:id",
        element: <ArchiveOrderDetails />,
      },
      {
        path: ROUTER.STATISTICS,
        element: <Statistics />,
      },
      {
        path: ROUTER.STAFF,
        element: <Staff />,
      },
      {
        path: ROUTER.STAFF + ROUTER.CREATE,
        element: <StaffCrud />,
      },
      {
        path: ROUTER.STAFF + ROUTER.EDIT + "/:id",
        element: <StaffCrud />,
      },
      {
        path: ROUTER.ROLES,
        element: <Roles />,
      },
      {
        path: ROUTER.SETTINGS,
        element: <Settings />,
      },
      {
        path: ROUTER.SLIDER,
        element: <Slider />,
      },
      {
        path: `${ROUTER.SLIDER}/` + ROUTER.CREATE,
        element: <CreateBanner />,
      },
      {
        path: `${ROUTER.SLIDER}/` + ROUTER.EDIT + "/:id",
        element: <CreateBanner />,
      },
      // {
      //   path: ROUTER.BOX,
      //   element: <Box />,
      // },
      // {
      //   path: `${ROUTER.BOX}/` + ROUTER.CREATE,
      //   element: <CreateBox />,
      // },
      // {
      //   path: `${ROUTER.BOX}/` + ROUTER.EDIT + "/:id",
      //   element: <CreateBox />,
      // },
      {
        path: `${ROUTER.LEADS}/`,
        element: <Leads />,
      },
      {
        path: `${ROUTER.LEADS}/` + ROUTER.DETAIL + "/:id",
        element: <LeadWaiting />,
      },
      {
        path: `${ROUTER.WAITING_LEADS}/`,
        element: <WaitingLeads />,
      },
      {
        path: `${ROUTER.SMS}/`,
        element: <Sms />,
      },
      {
        path: `${ROUTER.WORKERS}/`,
        element: <WorkersTable />,
      },
      {
        path: `${ROUTER.CUSTOMER_BASE}/`,
        element: <Customerbase />,
      },
      {
        path: `${ROUTER.EXPENSES}/`,
        element: <Expenses />,
      },
      {
        path: `${ROUTER.WHOLESALE_CUSTOMERS}/`,
        element: <WholesaleCustomers />,
      },
      {
        path: `${ROUTER.SELLER_ADMINS}/`,
        element: <SellerAdmins />,
      },
      {
        path: `${ROUTER.SELLER_VIEW}/:id`,
        element: <SellerView />,
      },
      {
        path: `${ROUTER.IKPU}/`,
        element: <Ikpu />,
      },
    ],
  },
  {
    path: ROUTER.NOT_FOUND,
    element: <NotFound />,
  },
]);
