/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination as AntdPagination } from "antd";
import PropTypes from "prop-types";
import { Wrapper } from "./style";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Pagination = ({ total, params, setParams }) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let queryParams = "?page=" + params.page;
    navigate({
      pathname: location.pathname,
      search: queryParams,
    });
  }, [params]);
  return (
    <Wrapper>
      <AntdPagination
        defaultCurrent={params.page}
        current={params.page}
        total={total}
        pageSize={20}
        value={params}
        onChange={(e) =>
          setParams({
            page: e,
            limit: 20,
          })
        }
        showSizeChanger={false}
      />
    </Wrapper>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  setParams: PropTypes.any,
  params: PropTypes.any,
};
