import React from 'react'

const DepositComponent = () => {
    return (
        <div className='p-8 mt-12 shadow-md dark:text-gray-300 text-gray-600 dark:bg-gray-900 bg-gray-50 rounded-xl'>
            <p className='text-2xl'>Balance : $0.00</p>

            <div className='mt-8'>
                <label className="label" htmlFor="username">
                    <span className="label-text text-gray-300">Enter amount <label className="text-red-500">*</label></span>
                </label>
                <input
                    className='border p-2'
                    type='number'

                />
                <buton className="p-3 text-gray-50 rounded-md bg-[#2e6a5c]">Add</buton>
            </div>
        </div >
    )
}

export default DepositComponent