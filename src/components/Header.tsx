import React, { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi'

import Container from './Container';
import ConnectButton from './buttons/ConnectButton';
import { WalletModal } from './modals/WalletModal';

const Header = () => {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const { isConnected } = useAccount();

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        if (isConnected) {
            disconnect();
        } else {
            setShowModal(true);
        }
    }

    return (
        <div className="h-[60px] shadow-md fixed w-screen top-0 left-0">
            <Container>
                <div className="flex justify-between items-center h-full">
                    <div className="text-2xl font-[700] text-red-500">LOGO</div>
                    <div>
                        <ConnectButton text={!address ? 'Connect Wallet' : 'Disconnect'} handleClick={handleClick} />
                    </div>
                </div>
                {
                    showModal && <WalletModal close={() => setShowModal(false)} />
                }
            </Container>
        </div>
    )
}

export default Header;