// src/hooks/useWallet.ts
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { supportedChains } from '../config/chains' // Assuming you have this in a separate file

export const useWallet = () => {
  const { connectors, connect, status, error } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { chains, switchChain, isPending: isSwitchingNetwork } = useSwitchChain()

  // Find the current chain object using chainId
  const currentChain = supportedChains.find(chain => chain.id === chainId)

  return {
    availableWallets: connectors,
    connect,
    disconnect,
    address,
    isConnected,
    connectionStatus: status,
    connectionError: error,
    currentChain, // This is now the chain object we found above
    availableChains: chains,
    switchNetwork: switchChain, // Renamed but still exported as switchNetwork for compatibility
    isSwitchingNetwork
  }
}