import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error?.response?.status === 401) {
        window.location.href = "/";
      }
      if (error?.response?.data?.detail) {
        console.log(error?.response?.data?.detail);
      } else {
        console.log(error?.message);
      }
    },
  }),
});
