import React from 'react'
import { Modal } from '../UI'
import { WalletList } from './WalletList'
import { NetworkSelector } from './NetworkSelector'
import { AccountInfo } from './AccountInfo'
import { useWallet } from '../../hooks/usewallet'

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

  // Convert readonly arrays to mutable
  const mutableChains = [...availableChains]
  const mutableWallets = [...availableWallets]

  const handleConnect = (connector: any) => {
    connect({ connector })
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const handleSwitchNetwork = async (chainId: number) => {
    try {
      if (typeof switchNetwork === "function") {
        await switchNetwork({ chainId }) // Ensure switchNetwork is async
        console.log("Switched to:", chainId)
      }
    } catch (error: unknown) {
      console.error("Network switch failed:", error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Wallet Connection">
      {isConnected && address ? (
        <div className="space-y-6">
          <AccountInfo address={address} onDisconnect={handleDisconnect} />

          {/* Display current chain ID */}
          <div className="bg-gray-800 p-3 rounded-lg text-center text-gray-300">
            <span className="font-mono text-sm">
              Current Chain ID: {currentChain?.id || "Unknown"}
            </span>
          </div>

          {/* Only show network selector if chain switching is available */}
          {typeof switchNetwork === "function" && mutableChains.length > 0 && (
            <NetworkSelector
              chains={mutableChains}
              currentChain={currentChain}
              onSwitchNetwork={handleSwitchNetwork}
              isLoading={isSwitchingNetwork}
            />
          )}
        </div>
      ) : (
        <WalletList
          wallets={mutableWallets}
          onConnect={handleConnect}
          connectionStatus={connectionStatus}
        />
      )}
    </Modal>
  )
}
