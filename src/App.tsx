
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { SidebarProvider } from './contexts/SidebarContext';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppRoutes />
        <Toaster />
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
