import React from 'react'

const WalletComponent = () => {
    return (
        <div className='flex flex-col'>
            <div className="grid xl:grid-cols-2 grid-cols-1">
                <div>
                    <p>Account Value</p>
                    <p>$0.00</p>
                    <p>Total account value,combining projected,available cash and assets</p>
                </div>
                <div>
                    <p>Cash</p>
                    <p>$0.00</p>
                    <p>Spendable,withdrawable cash in your wallet</p>
                </div>

            </div>
            <div className='flex justify-around'>
                <p>withdraw</p>
                <p>Deposit</p>

            </div>
            <div>
                <p className='text-xl'>Recent Transactions</p>
                <div className=' border-t-2 border-gray-400 border-opacity-50'>
                    <p>No transaction found</p>
                </div>
            </div>
        </div>
    )
}

export default WalletComponent