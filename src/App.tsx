import { useState } from 'react'
import { WagmiConfig } from 'wagmi'
import { createConfig, http } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'
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
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-700 relative">
          {/* Floating Wallet Icon */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 p-3 rounded-full border border-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4h6a4 4 0 004-4v-2m1 0h2a2 2 0 100-4h-2m-2 0a2 2 0 110-4h2" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-4">Connect Your Wallet</h1>
          <p className="text-gray-400 text-center mb-6">
            Securely connect to blockchain applications in seconds.
          </p>
          
          <Button 
            onClick={openModal} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
          >
            Connect Wallet
          </Button>
        </div>

        <WalletModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </WagmiConfig>
  )
}

export default App
