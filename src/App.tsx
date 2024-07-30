import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi';

import './App.css';

import Home from './pages/Home';

import Header from './components/Header';

import { config } from './config/wagmi';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </Router>
  );
}

export default App;
