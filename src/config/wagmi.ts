import { http, createConfig } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { metaMask, walletConnect } from 'wagmi/connectors'

const projectId = '83b112271e30206fd11c60f4f9521337'

export const config = createConfig({
    chains: [polygon],
    connectors: [
        metaMask(),
        walletConnect({ projectId }),
    ],
    transports: {
        [polygon.id]: http()
    },
})

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}