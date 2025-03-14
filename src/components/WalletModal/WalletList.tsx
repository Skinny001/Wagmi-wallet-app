// src/components/WalletModal/WalletList.tsx
import React from 'react'
import { Connector } from 'wagmi'
import { Button } from '../UI'

interface WalletListProps {
  wallets: Connector[]
  onConnect: (connector: Connector) => void
  connectionStatus: string
}

/**
 * Display available wallets and handle connection
 */
export const WalletList: React.FC<WalletListProps> = ({ wallets, onConnect, connectionStatus }) => {
  // If no wallets are found
  if (wallets.length === 0) {
    return (
      <div className="p-4 text-center bg-gray-50 rounded-md">
        <p className="text-gray-700">No wallet extensions found. Please install a wallet like MetaMask.</p>
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline block mt-2"
        >
          Install MetaMask
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Available Wallets</h3>
      <div className="grid grid-cols-2 gap-3">
        {wallets.map((wallet) => (
          <Button
            key={wallet.id}
            onClick={() => onConnect(wallet)}
            className="flex items-center justify-center"
            isLoading={connectionStatus === 'connecting' && wallet.name === 'connecting'}
            variant="outline"
          >
            {/* Display wallet icon if available */}
            {wallet.icon && (
              <img
                src={wallet.icon}
                alt={`${wallet.name} icon`}
                className="w-6 h-6 mr-2"
              />
            )}
            {wallet.name}
          </Button>
        ))}
      </div>
    </div>
  )
}