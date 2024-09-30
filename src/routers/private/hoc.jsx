import { ROUTER } from "@/constants/router";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

export const HocPrivate = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { pathname } = useLocation();

  if (!user?.access) {
    return <Navigate to={ROUTER.LOGIN} />;
  }
  if (pathname === ROUTER.ADMIN || pathname === ROUTER.ADMIN + "/") {
    return <Navigate to={ROUTER.ADMIN + "/" + ROUTER.PRODUCTS} />;
  }

  return <>{children}</>;
};

HocPrivate.propTypes = {
  children: PropTypes.element.isRequired,
};
