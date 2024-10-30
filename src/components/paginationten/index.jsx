/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination as AntdPagination } from "antd";
import PropTypes from "prop-types";
import { Wrapper } from "./style";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const PaginationTen = ({ total, params, setParams }) => {
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
        pageSize={10}
        value={params}
        onChange={(e) =>
          setParams({
            page: e,
            limit: 10,
          })
        }
        showSizeChanger={false}
      />
    </Wrapper>
  );
};

PaginationTen.propTypes = {
  total: PropTypes.number.isRequired,
  setParams: PropTypes.any,
  params: PropTypes.any,
};
