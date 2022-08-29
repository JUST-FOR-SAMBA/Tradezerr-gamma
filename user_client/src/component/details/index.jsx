import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { fetchRealTimeData, sendRandomData } from '../../helpers/randomIndex'
import Navbar from '../../layout/navbar'
import { orderToggle } from '../../lib/atoms'
import ApexChart from '../_modules/chart'
import OrderModel from '../_modules/models/order'

const DetailsComponent = () => {
    const [realTimeBid, setRealTimeBid] = useState();
    const { id } = useParams()

    useEffect(() => {
        const time = setInterval(() => {
            const data = fetchRealTimeData()
            data.then((data) => {
                setRealTimeBid(data);
            }
            )

        }, 10000);
        return () => { clearInterval(time) }
    }, [])

    useEffect(() => {
        const time = setInterval(() => {
            sendRandomData()
        }, 120000);
        return () => { clearInterval(time) }

    }, [])

    const [isDisplayed, setIsDisplayed] =
        useRecoilState(orderToggle);
    const toggleHide = () => {
        setIsDisplayed(!isDisplayed)
    }

    return (
        <>
            <Navbar bSubN={id} />
            <p className='text-xl text-gray-50 p-4'>{id}</p>
            <div className='shadow-md text-gray-50 text-center md:text-left bg-gray-900 p-4 rounded-lg'>
                <div className='flex flex-col md:flex-row items-center space-y-2 justify-between'>
                    <p className='md:text-lg w-full uppercase font-mono'>Market trading price</p>
                    <div className='w-full max-w-[24rem] flex justify-center border rounded-lg gap-2'>
                        <button className='p-2'>Real-time</button>
                        <button className='p-2'>Today</button>
                        <button className='p-2'>Week</button>
                        <button className='p-2'>Month</button>
                        <button className='p-2'>Year</button>
                    </div>
                </div>
                <ApexChart data={realTimeBid?.slice(-6)} />
            </div>
            <div className=' flex flex-col gap-4 mt-4'>
                <div className='relative bg-gray-900 flex justify-center p-2 rounded-lg items-center'>
                    <button className=' p-2 bg-green-800 m-2 w-20 rounded-lg' onClick={() => {
                        toggleHide()
                    }}> Buy</button>
                    <OrderModel />
                </div>
                <div className=' grid gap-5  grid-cols-1 md:grid-cols-2'>
                    <div className='p-8 rounded-lg bg-gray-900'>
                        <p className='font-mono font-medium uppercase text-gray-50'>Your Tradables shares</p>
                        <p className='text-gray-400 text-sm'>You don't have any shares</p>

                    </div>
                    <div className='p-8 rounded-lg bg-gray-900'>
                        <p className='font-mono font-medium uppercase text-gray-50'>Active Trades</p>
                        <p className='text-gray-400 text-sm'>You don't have any shares</p>

                    </div>
                </div>
            </div>

        </>
    )
}

export default DetailsComponent