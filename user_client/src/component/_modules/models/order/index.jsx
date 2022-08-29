import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { orderToggle } from '../../../../lib/atoms'
import { TimesV } from '../../_vetors';

const OrderModel = () => {
    const [isDisplayed, setIsDisplayed] =
        useRecoilState(orderToggle);
    const toggleHide = () => {
        setIsDisplayed(!isDisplayed)
    }
    return (
        <div className={`bg-[#0f202f] ${isDisplayed ? 'hidden opacity-0 ' : 'bg-opacity-20 flex'} inset-0 w-full fixed  backdrop-filter flex justify-center items-center backdrop-blur-sm text-gray-200 h-screen`}>
            <div className='flex relative z-40 bg-[#0f202f] rounded-lg shadow-md border-2 border-gray-700 border-opacity-20 w-full max-w-[23.2rem] h-[20rem] flex-col'>
                <button className='m-2 p-2 self-end' onClick={() => {
                    toggleHide()
                }} >
                    <TimesV className='w-6 h-6' />
                </button>
                <div className='flex -mt-5 flex-col justify-center items-center space-y-2'>
                    <p>Current Market Price</p>
                    <p className='font-mono text-2xl'>$1,000.00</p>
                    <label>Number of shares to buy</label>
                    <input className='p-2 text-gray-700 rounded-lg' type='number' />
                    <label>Price per share</label>
                    <input className='p-2 rounded-lg text-gray-700' type='number' placeholder='0.54' />
                    <button className='p-2 w-20 bg-cyan-700 rounded-lg'>Buy</button>
                </div>
            </div>
        </div>
    )
}

export default OrderModel