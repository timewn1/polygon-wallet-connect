import React, { useState } from 'react';
import { ethers, parseUnits } from 'ethers';

import SMD from '../blockchain/smd.json';

import { useEthersSigner } from '../blockchain/ethers';
import { toast } from 'react-toastify';

const TokenTransfer = () => {
    const signer = useEthersSigner();

    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('0');

    const transferSMD = async () => {
        try {
            if (!signer) {
                toast.info('Please connect your wallet!');
                return;
            }
            if (!receiver) {
                toast.error("Please input correct address!");
                return;
            }
            if (!amount) {
                toast.error("Please input correct amount!");
                return;
            }

            if (receiver && amount) {
                const tokenContract = new ethers.Contract(SMD.address, SMD.abi, signer);

                if (tokenContract) {
                    const tx = await tokenContract.transfer(receiver, parseUnits(amount, 18));
                    const receipt = await tx.wait();

                    if (receipt.status === 1) {
                        toast.success('Successfully transfered!');

                        setAmount('0');
                        setReceiver('');
                    } else {
                        toast.error("Transfer failed!");
                    }
                } else {
                    toast.error("Transfer failed!");
                }
            }
        } catch (err) {
            console.error(err);
            toast.error("Transfer failed!");
        }
    }

    return (
        <div className='flex justify-between gap-5 mt-2 mb-3 pr-[55px]'>
            <div className='flex flex-col justify-start items-start'>
                <div >
                    <p className='text-start'>Send to</p>
                    <input className='w-[240px] border rounded-md px-[10px] py-[7px] text-[16px] outline-none' type='text' placeholder='Enter address reciever' value={receiver} onChange={(e) => { setReceiver(e.target.value) }} />
                </div>
                <div className='mt-4'>
                    <p className='text-start'>Amount</p>
                    <input className='w-[240px] border rounded-md px-[10px] py-[7px] text-[16px] outline-none' type='text' placeholder='Enter SMD Amount' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                </div>
                <button className='mt-5 w-[150px] rounded-md px-[20px] font-bold py-[10px] bg-[#11D6B2] hover:bg-[#309e8a] text-white' onClick={transferSMD}>Transfer SMD</button>
            </div>
            <div>
                <h3 className='text-start text-18px font-bold'>How to transfer SMD</h3>
                <p className='text-start leading-5'>1. Connect Metamask</p>
                <p className='text-start leading-5'>2. Input correct address & amount</p>
                <p className='text-start leading-5'>3. Check input</p>
                <p className='text-start leading-5'>4. Open Metamask</p>
                <p className='text-start leading-5'>5. Check address & confirm</p>
                <img className='ml-5 mt-2 w-[105px]' src='/img/metamask-transaction.png' alt='metamask transaction' />
            </div>
            <div>
                <h2 className='font-bold text-[16px]'>SMD</h2>
                <h3 className='font-bold text-[13px] -mt-1'>runs on</h3>
                <div className='flex justify-center'>
                    <img className='-mt-3 ' src='/img/polygon.png' alt='polygon' />
                </div>
                <p className='text-[14px] font-semibold text-black/80'>Polygon (MATIC) required to transfer SMD</p>
            </div>
        </div>
    )
}

export default TokenTransfer;