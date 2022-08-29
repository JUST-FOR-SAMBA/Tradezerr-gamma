import React from 'react'

const MySharesComponent = () => {
    return (
        <div className='flex gap-12 p-8 flex-col'>
            <div className='grid gap-4 lg:grid-cols-2 grid-cols-1'>
                <div className='border-2 dark:border-gray-800 bg-gray-900 text-gray-600 dark:text-gray-400 shadow- flex flex-col justify-center rounded-xl gap-4 items-center p-8'>
                    <p className='lg:text-3xl'>Assets value</p>
                    <p className='lg:text-5xl'>$0.00</p>
                    <p>current market value of your shares</p>

                </div>
                <div className='border-2 dark:border-gray-800 bg-gray-900 text-gray-600 dark:text-gray-400 shadow- flex flex-col justify-center rounded-xl gap-4 items-center p-8'>
                    <p className='lg:text-3xl'>Projected values</p>
                    <p className='lg:text-5xl'>$0.00</p>
                    <p>Total of all shares you have for sale in trading</p>

                </div>
            </div>
            <div className='border-2 dark:border-gray-800 bg-gray-900 rounded-xl text-gray-600 dark:text-gray-400 shadow- gap-4 items-center p-12'>
                <p className='uppercase font-mono font-bold text-xl '>Your available shares</p>
                <p>You don't have shares</p>
            </div>
            <div className='border-2 dark:border-gray-800 bg-gray-900 rounded-xl text-gray-600 dark:text-gray-400 shadow- gap-4 items-center p-12'>
                <p className='uppercase font-mono font-bold text-xl'>Active trades</p>
                <p>You don't have orders awaiting matching</p>
            </div>
        </div>
    )
}

export default MySharesComponent