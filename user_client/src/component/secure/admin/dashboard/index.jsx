import moment from 'moment'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Navbar from '../../../../layout/navbar'
import Service from '../../../../services'
import ENDPOINTS from '../../../../services/endpoints'
import { BookV, CoinsV, PersonV, ShoppingCartV, WorldV } from '../../../_modules/_vetors'

const AdminDashboard = () => {

    const [isClick, setIsClick] = useState(false)

    const fetchUsers = async () => {
        const { data, error } = await Service.get(ENDPOINTS.GET_USERS);
        if (error) {
            return error
        } else {
            return data;
        }
    }

    const { data, isLoading } = useQuery('users', fetchUsers);

    if (isLoading) {
        return <div>Loading...</div>
    }
    console.log("Data", data)

    const AllUsers = data?.map((user, index) => {
        return (
            <tr className=' border-t border-gray-500 border-opacity-50 cursor-pointer' key={index}>
                <td className='flex items-center space-x-3'>
                    <PersonV className='w-6 h-6' />
                    <div>
                        <p className='font-mono'>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                </td>
                <td className=''>{user.role}</td>
                <td className='w-6 h-6'>{user.status}</td>
                <td className=' '>{moment(user.createdAt).format('LL')}</td>
                <td className='w-10'>edit</td>
            </tr>
        )
    })

    return (
        <>
            <Navbar bSubN="Admin Dashboard" />
            <p className='p-4 text-xl font-medium'>Dashboard</p>
            <div className='flex flex-col space-y-4'>
                <div className='grid xl:grid-cols-4 grid-cols-2 gap-3 justify-center items-center'>
                    <div className='flex flex-col p-4 shadow-xl bg-gray-900 rounded-lg'>
                        <div className='flex justify-between m-2 space-y-2'>
                            <div>
                                <p>Today's money</p>
                                <p className='text-xl font-mono'>555,533,460 Ugx</p>
                            </div>
                            <div className='rounded-full flex items-center justify-center w-12 h-12 bg-gradient-to-r from-sky-800 to-sky-300'>
                                <CoinsV className='w-6 h-6' />
                            </div>
                        </div>
                        <div><span className='text-green-500'>+55% </span>Since Yesterday</div>

                    </div>
                    <div className='flex flex-col p-4 shadow-xl bg-gray-900 rounded-lg'>
                        <div className='flex justify-between m-2 space-y-2'>
                            <div>
                                <p>Today's users</p>
                                <p className='text-xl font-mono'>2,000</p>
                            </div>
                            <div className='rounded-full flex items-center justify-center w-12 h-12 bg-gradient-to-r from-zinc-600 to-green-300'>
                                <WorldV className='w-6 h-6' />
                            </div>
                        </div>
                        <div><span className='text-red-500'>-4% </span>Since Yesterday</div>

                    </div>
                    <div className='flex flex-col p-4 shadow-xl bg-gray-900 rounded-lg'>
                        <div className='flex justify-between m-2 space-y-2'>
                            <div>
                                <p>New clients</p>
                                <p className='text-xl font-mono'>{data.length}</p>
                            </div>
                            <div className='rounded-full flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-300 to-sky-600'>
                                <BookV className='w-6 h-6' />
                            </div>
                        </div>
                        <div><span className='text-green-500'>+22% </span>Since Yesterday</div>

                    </div>

                    <div className='flex flex-col p-4 shadow-xl bg-gray-900 rounded-lg'>
                        <div className='flex justify-between m-2 space-y-2'>
                            <div>
                                <p>Sales</p>
                                <p className='text-xl font-mono'>555,533,460 Ugx</p>
                            </div>
                            <div className='rounded-full flex items-center justify-center w-12 h-12 bg-gradient-to-r from-sky-700 to-stone-600'>
                                <ShoppingCartV className='w-6 h-6' />
                            </div>
                        </div>
                        <div><span className='text-green-500'>+55%</span>Since Yesterday</div>

                    </div>
                </div>
                <div className='p-4 bg-gray-800 rounded-lg shadow-xl'>
                    <p>Users Table</p>
                    <table className="text-gray-200 w-full table-compact">
                        <thead>
                            <tr>
                                <th className='text-left'>Name</th>
                                <th className='text-left'>Role</th>
                                <th className='text-left'>Status</th>
                                <th className='text-left'>Join on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AllUsers}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )


}

export default AdminDashboard