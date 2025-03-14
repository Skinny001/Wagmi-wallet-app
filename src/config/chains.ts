// src/hooks/useWallet.ts
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains'
export const supportedChains = [mainnet, polygon, optimism, arbitrum, base]

// Updated imports for wagmi v2
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi'

export const useWallet = () => {
  const { connectors, connect, status, error } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { chains, switchChain, isPending: isSwitchingNetwork } = useSwitchChain()

  // Find current chain object from chainId
  const currentChain = supportedChains.find(chain => chain.id === chainId)

  // Filter available wallets
  const availableWallets = connectors.filter(
    connector => connector.type === 'injected' || connector.type === 'coinbaseWallet'
  )

  return {
    availableWallets,
    connect,
    disconnect,
    address,
    isConnected,
    connectionStatus: status,
    connectionError: error,
    currentChain,
    availableChains: chains,
    switchNetwork: switchChain, 
    isSwitchingNetwork
  }
}