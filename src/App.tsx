import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from './store';

import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

import { config } from './config/wagmi';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
  
  return (
    <Provider store={store}>
      <Router>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </QueryClientProvider>
        </WagmiProvider>
        <ToastContainer position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;
