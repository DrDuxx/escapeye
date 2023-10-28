import { QueryClient } from "react-query";

let queryClient = null;
function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          notifyOnChangeProps: "tracked",
          retry: false,
          staleTime: Infinity,
        },
      },
    });
  }
  return queryClient;
}

export default getQueryClient;
