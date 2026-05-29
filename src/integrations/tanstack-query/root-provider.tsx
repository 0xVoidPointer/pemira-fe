import { QueryClient } from "@tanstack/react-query";

let _client: QueryClient | null = null;

function getClient() {
  if (_client) return _client;
  _client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
  return _client;
}

export function getContext() {
  return { queryClient: getClient() };
}
