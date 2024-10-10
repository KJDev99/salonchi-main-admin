import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useSearchParams = () => {
  const { search } = useLocation();
  const initial_params = new URLSearchParams(search);
  const [params, setParams] = useState({
    page: initial_params.has("page") ? Number(initial_params.get("page")) : 1,
    limit: 20,
  });

  return {
    params,
    setParams,
  };
};
