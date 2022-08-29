import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buyIndex, changeIndex, RandomIndex, sellIndex, changeIndexPercentage } from '../../helpers/randomIndex';

const Board = () => {
    const [indexGenerator, setIndexGenerator] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setInterval(() => {

            setIndexGenerator(sellIndex());
        }, 1000);
        return () => { clearInterval(timer) }
    }, [])

    const board = [
        {
            symbol: 'BL',
            name: 'Blackstone 1',
            buy: sellIndex(),
            sell: buyIndex(),
            change: changeIndex(),
            percentage: changeIndexPercentage(),
            sector: 'Technology'
        },
        {
            symbol: 'BL',
            name: 'Blackstone 2',
            buy: sellIndex(),
            sell: buyIndex(),
            change: changeIndex(),
            percentage: changeIndexPercentage(),
            sector: 'Technology'
        },
        {
            symbol: 'BL',
            name: 'Blackstone 3',
            buy: buyIndex(),
            sell: sellIndex(),
            change: changeIndex(),
            percentage: changeIndexPercentage(),
            sector: 'Technology'
        },
        {
            symbol: 'BL',
            name: 'Blackstone 4',
            buy: buyIndex(),
            sell: sellIndex(),
            change: changeIndex(),
            percentage: changeIndexPercentage(),
            sector: 'Technology'
        },
        {
            symbol: 'BL',
            name: 'Blackstone 5',
            buy: buyIndex(),
            sell: sellIndex(),
            change: changeIndex(),
            percentage: changeIndexPercentage(),
            sector: 'Technology'
        },
        {
            symbol: 'BL',
            name: 'Blackstone 6',
            buy: buyIndex(),
            sell: sellIndex(),
            change: changeIndex(),
            percentage: changeIndexPercentage(),
            sector: 'Technology'
        }
    ]
    const displayBoard = board.map((data, index) => {

        return (
            <tr className='text-center border-t hover:bg-gray-900 hover:translate-y-1 hover:transition-transform  duration-200 border-gray-700 border-opacity-80 cursor-pointer' key={index} onClick={() => {
                navigate(`/company/${data.name}`)
            }}>
                <td className='hidden lg:table-cell'>{data.symbol}</td>
                <td className='text-left'>{data.name}</td>
                <td className='p-4'>{data.buy}</td>
                <td className=' '>{data.sell}</td>
                <td className={data.change >= 1.00 ? 'text-green-500' : 'text-red-500'}>{data.change} ({data.percentage})%</td>
                <td className='w-10 hidden lg:table-cell'>{data.sector}</td>
            </tr>
        )
    })

    return (
        <div className="bg-gray-800 shadow-lg border-2 border-gray-700 py-4 rounded-xl">
            <table className="text-gray-200 w-full table-compact">
                <thead>
                    <tr>
                        <th className='w-2 max-w-[1rem] hidden lg:table-cell'>Symbole</th>
                        <th className='w-36 text-left'>Name</th>
                        <th className='w-10 text-green-500  '>buy</th>
                        <th className='w-10 text-red-500'>sell</th>
                        <th className='w-10'>Changes(Shs)</th>
                        <th className='w-10 hidden lg:table-cell'>Sector</th>
                    </tr>
                </thead>
                <tbody>
                    {displayBoard}
                </tbody>
            </table>
        </div>
    )
}

export default Board