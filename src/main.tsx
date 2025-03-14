import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Configure wagmi with viem's `http` transport
const wagmiConfig = createConfig({
  chains: [mainnet], 
  transports: {
    [mainnet.id]: http(), // Use viem's HTTP transport
  },
  autoConnect: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
