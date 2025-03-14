// src/components/WalletModal/WalletModal.tsx
import React from 'react'
import { Modal } from '../UI'
import { WalletList } from './WalletList'
import { NetworkSelector } from './NetworkSelector'
import { AccountInfo } from './AccountInfo'
import { useWallet } from '../../hooks/usewallet' // Make sure the file name casing matches

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  // Get all wallet functionality from custom hook
  const {
    availableWallets,
    connect,
    disconnect,
    address,
    isConnected,
    connectionStatus,
    currentChain,
    availableChains,
    switchNetwork,
    isSwitchingNetwork
  } = useWallet()

  // Handle wallet connection
  const handleConnect = (connector: any) => {
    connect({ connector })
  }

  // Handle wallet disconnection
  const handleDisconnect = () => {
    disconnect()
  }

  // Handle network switching
  const handleSwitchNetwork = (chainId: number) => {
    if (switchNetwork) {
      switchNetwork(chainId)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Wallet Connection">
      {isConnected && address ? (
        <div className="space-y-6">
          <AccountInfo address={address} onDisconnect={handleDisconnect} />
          
          {/* Only show network selector if chain switching is available */}
          {switchNetwork && availableChains.length > 0 && (
            <NetworkSelector
              chains={availableChains}
              currentChain={currentChain}
              onSwitchNetwork={handleSwitchNetwork}
              isLoading={isSwitchingNetwork}
            />
          )}
        </div>
      ) : (
        <WalletList
          wallets={availableWallets}
          onConnect={handleConnect}
          connectionStatus={connectionStatus}
        />
      )}
    </Modal>
  )
}