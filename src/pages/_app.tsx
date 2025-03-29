import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../styles/theme';
import { AuthProvider } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
} 