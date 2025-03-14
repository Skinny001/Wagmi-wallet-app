import React, { useState } from 'react'
import { WagmiConfig } from 'wagmi'
import { createConfig, http } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains'
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors'
import { WalletModal } from './components/WalletModal'
import { Button } from './components/UI'

const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, base],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  connectors: [
    // injected(),
    coinbaseWallet({ appName: 'My Wallet App' }),
    walletConnect({ 
      projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '' 
    }),
  ],
})

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <WagmiConfig config={config}>
      <div className="min-h-screen bg-red-300 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Wallet Connection Demo</h1>
          <p className="text-gray-600 mb-6 text-center">
            Connect your wallet to interact with blockchain applications
          </p>
          
          <Button onClick={openModal} className="w-full">
            Connect Wallet
          </Button>
        </div>

        <WalletModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </WagmiConfig>
  )
}

export default App