import React from 'react';
import { Button } from '../UI';

interface AccountInfoProps {
  address: string;
  onDisconnect: () => void;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({ address, onDisconnect }) => {
  // Format address for display (e.g., 0x123...abc)
  const formatAddress = (address: string) =>
    `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  // Copy address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(address)
      .then(() => alert('Address copied to clipboard'))
      .catch(err => console.error('Could not copy address: ', err));
  };

  return (
    <div className="p-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Wallet Connected</h3>
        <Button 
          variant="outline" 
          onClick={onDisconnect} 
          className="text-sm border border-gray-500 text-gray-300 hover:bg-gray-700 px-3 py-1 rounded-lg"
        >
          Disconnect
        </Button>
      </div>

      {/* Address Display */}
      <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-600">
        <span className="font-mono text-lg">{formatAddress(address)}</span>
        <button
          onClick={copyAddress}
          className="text-gray-400 hover:text-white transition"
          title="Copy address"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
