import React, { useState, useEffect } from 'react'
import { Connector, useConnect, useAccount } from 'wagmi';
import { BrowserProvider } from 'ethers';

export function WalletModal({ close }: any) {
  const {address} = useAccount();
  const { connectors, connect } = useConnect();

  const switchToPolygon = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    const polygonChainId = BigInt(137);

    if (network.chainId !== polygonChainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x89' }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x89',
                  chainName: 'Polygon Mainnet',
                  nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18,
                  },
                  rpcUrls: ['https://polygon-rpc.com/'],
                  blockExplorerUrls: ['https://polygonscan.com/'],
                },
              ],
            });
          } catch (addError) {
            console.error('Failed to add the Polygon network to MetaMask', addError);
          }
        } else {
          console.error('Failed to switch to the Polygon network', switchError);
        }
      }
    }
  };

  useEffect(() => {
    const connectWallet = async () => {
      switchToPolygon();
    };

    if (address) {
      connectWallet();
    }
  }, [address])

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-black/20">
      <div className="absolute p-4 w-full max-w-md max-h-full top-[15%] left-[50%] -translate-x-[50%]">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Connect Wallet
            </h3>
            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={close}>
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 flex flex-col w-full gap-1">
            {
              connectors.map((connector) => (
                connector.type !== 'injected' &&
                <WalletOption
                  key={connector.uid}
                  connector={connector}
                  onClick={() => connect({ connector })}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    ; (async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <button className="text-[#3B9CB7] hover:text-white border border-[#3B9CB7] hover:bg-[#3B9CB7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2" disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  )
}