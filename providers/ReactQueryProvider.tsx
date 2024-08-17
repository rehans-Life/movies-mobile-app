import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, {useState} from 'react';

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [queryClient] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onSuccess(data, query) {
          const meta = query.meta;
          const onSuccess = meta?.onSuccess;
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(data);
          }
        },
      }),
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
