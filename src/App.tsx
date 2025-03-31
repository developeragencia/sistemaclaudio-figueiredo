
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { SidebarProvider } from './contexts/SidebarContext';
import { Toaster } from './components/ui/toaster';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gray-50"
        >
          <AppRoutes />
          <Toaster />
        </motion.div>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
