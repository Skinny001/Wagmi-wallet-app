import React from 'react'
import { type Config } from 'wagmi'
import { Button } from '../UI'

// Use the chain type from the Config
type Chain = Config['chains'][number]

interface NetworkSelectorProps {
  chains: Chain[]
  currentChain?: Chain
  onSwitchNetwork: (chainId: number) => void
  isLoading: boolean
}

export const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  chains,
  currentChain,
  onSwitchNetwork,
  isLoading
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">Networks</h3>
      <div className="grid grid-cols-2 gap-3">
        {chains.map((chain) => (
          <Button
            key={chain.id}
            onClick={() => onSwitchNetwork(chain.id)}
            disabled={currentChain?.id === chain.id || isLoading}
            variant={currentChain?.id === chain.id ? 'primary' : 'outline'}
            className="flex items-center justify-center text-sm"
          >
            {chain.name}
          </Button>
        ))}
      </div>
    </div>
  )
}