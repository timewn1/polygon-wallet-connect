import React, { useState } from 'react';
import { ethers, parseUnits } from 'ethers';
import { useTranslation } from 'react-i18next';

import SMD from '../blockchain/smd.json';

import { useEthersSigner } from '../blockchain/ethers';
import { toast } from 'react-toastify';

const TokenTransfer = () => {
    const { t } = useTranslation();

    const signer = useEthersSigner();

    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('0');

    const transferSMD = async () => {
        try {
            if (!signer) {
                toast.info(t('Please connect your wallet!'));
                return;
            }
            if (!receiver) {
                toast.error(t("Please input correct address!"));
                return;
            }
            if (!amount) {
                toast.error(t("Please input correct amount!"));
                return;
            }

            if (receiver && amount) {
                const tokenContract = new ethers.Contract(SMD.address, SMD.abi, signer);

                if (tokenContract) {
                    const tx = await tokenContract.transfer(receiver, parseUnits(amount, 18));
                    const receipt = await tx.wait();

                    if (receipt.status === 1) {
                        toast.success(t('Successfully transfered!'));

                        setAmount('0');
                        setReceiver('');
                    } else {
                        toast.error(t("Transfer failed!"));
                    }
                } else {
                    toast.error(t("Transfer failed!"));
                }
            }
        } catch (err) {
            console.error(err);
            toast.error(t("Transfer failed!"));
        }
    }

    return (
        <div className='md:flex md:justify-between justify-center gap-5 mt-2 mb-3 md:pr-[30px] pr-0 '>
            <div className='flex flex-col md:justify-start justify-center items-start mx-5 md:mx-0'>
                <div className='w-[100%] md:w-[auto]'>
                    <p className='text-start'>{t('Send to')}</p>
                    <input className='md:w-[240px]  w-[100%] border rounded-md px-[10px] py-[7px] text-[16px] outline-none' type='text' placeholder='Enter address reciever' value={receiver} onChange={(e) => { setReceiver(e.target.value) }} />
                </div>
                <div className='mt-4 w-[100%] md:w-[auto]'>
                    <p className='text-start'>{t('Amount')}</p>
                    <input className='md:w-[240px] w-[100%] border rounded-md px-[10px] py-[7px] text-[16px] outline-none' type='text' placeholder='Enter SMD Amount' value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                </div>
                <div className='w-[100%] md:w-[auto]'>
                    <button className='mt-5 w-[150px] rounded-md px-[20px] font-bold py-[10px] bg-[#11D6B2] hover:bg-[#309e8a] text-white' onClick={transferSMD}>{t('Transfer SMD')}</button>
                </div>
            </div>
            <div className='md:block hidden'>
                <h3 className='text-start text-18px font-bold'>{t('How to transfer SMD')}</h3>
                <p className='text-start leading-5'>1. {t('Connect Metamask')}</p>
                <p className='text-start leading-5'>2. {t('Input correct address & amount')}</p>
                <p className='text-start leading-5'>3. {t('Check input')}</p>
                <p className='text-start leading-5'>4. {t('Open Metamask')}</p>
                <p className='text-start leading-5'>5. {t('Check address & confirm')}</p>
                <img className='ml-5 mt-2 w-[105px]' src='/img/metamask-transaction.png' alt='metamask transaction' />
            </div>
            <div className='md:block md:mt-0 mt-10'>
                <h2 className='font-bold text-[16px]'>SMD</h2>
                <h3 className='font-bold text-[13px] -mt-1'>{t('runs on')}</h3>
                <div className='flex justify-center'>
                    <img className='-mt-3 ' src='/img/polygon.png' alt='polygon' />
                </div>
                <p className='text-[14px] font-semibold text-black/80'>{t('Polygon (MATIC) required to transfer SMD')}</p>
            </div>
        </div>
    )
}

export default TokenTransfer;