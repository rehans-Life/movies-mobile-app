import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import errorHandler from '../utils/errorHandler';
import {APIError} from '../utils/api';

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
      mutationCache: new MutationCache({
        onError: error => errorHandler(error as AxiosError<APIError>),
      }),
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
