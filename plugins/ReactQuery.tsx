'use client';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface IReactQueryProps {
  children: React.ReactNode;
}

export const queryClient = new QueryClient();

const ReactQueryProvider: React.FC<IReactQueryProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
