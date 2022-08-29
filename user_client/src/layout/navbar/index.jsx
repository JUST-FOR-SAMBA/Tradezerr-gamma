import React from 'react'
import { EditV, LayerV, PersonV, ShareV, TimesV } from '../../component/_modules/_vetors'
import Humbugger from './humbugger'
import { Link, useNavigate } from "react-router-dom"
import getCurrentUser from '../../helpers/currentUser'
import LocalStorage from '../../helpers/localStorage'
const Navbar = ({ bSubN }) => {
    const id = getCurrentUser();
    const navigate = useNavigate()
    return (
        <div className='flex justify-between p-4 items-center'>
            <div className="text-gray-200 breadcrumbs">
                <ul>
                    <li>
                        <Link to='/'>
                            <p className=''>Home</p>
                        </Link>
                    </li>
                    <li>
                        <p className=''>{bSubN}</p>
                    </li>
                </ul>
            </div>
            <div className='flex space-x-5'>
                <div className='flex items-center'>
                    <Humbugger />
                </div>

                <div className="dropdown dropdown-end ">
                    <div tabIndex={0} className='flex items-center space-x-3 cursor-pointer'>
                        <PersonV className='lg:w-10 lg:h-10 w-6 h-6' />
                    </div>

                    <div>
                        {id ? (
                            <ul tabIndex="0" className={`text-gray-300 dropdown-content bg-gray-900 p-6 flex flex-col justify-center space-y-2 rounded-lg w-56 mt-2`}>
                                <li className="p-4 border-b border-gray-400 border-opacity-30 justify-center space-y-2 items-center flex flex-col">
                                    <PersonV className='w-20 h-20' />
                                    <div className='text-center'>
                                        <p className='uppercase'>{id.username}</p>
                                        <p className="">{id.email}</p>
                                    </div>
                                </li>
                                <Link to={id.role === "admin" ? "/admin/dashboard" : "/my-account/edit-account/"}>
                                    <li className='transition-transform flex items-center justify-start space-x-2 duration-200 hover:translate-x-1 cursor-pointer hover:bg-opacity-50 rounded-lg py-1'>
                                        <EditV />
                                        <p>{id.role === "admin" ? "Admin Dashboard" : "Edit Profile"}</p>
                                    </li>
                                </Link>
                                <li className='transition-transform flex items-center justify-start space-x-2 duration-200 hover:translate-x-1 cursor-pointer hover:bg-opacity-50 rounded-lg py-1'>
                                    <LayerV />
                                    <p>My shares</p>
                                </li>


                                <label htmlFor="my-modal-3" className="transition-transform duration-200 items-center justify-start space-x-2 hover:translate-x-1 modal-button flex cursor-pointer rounded-lg text-red-500 py-1" >
                                    <ShareV className='rotate-90' />
                                    <p>Logout</p>
                                </label>

                            </ul>
                        ) : (
                            <ul tab className={` dropdown-content text-gray-300 bg-gray-900 p-6 flex flex-col justify-center space-y-2 rounded-lg w-52 mt-2`}>
                                <li className="p-4 border-b justify-center space-y-2 items-center flex flex-col">
                                    <PersonV className='w-20 h-20' />
                                </li>
                                <Link to='/login'>
                                    <li className='transition-transform flex items-center justify-center space-x-2 duration-200 hover:translate-x-1 cursor-pointer hover:bg-opacity-50 rounded-lg py-1'>
                                        <p className='font-mono'>Sign in</p>
                                    </li>
                                </Link>

                            </ul>
                        )}
                    </div>

                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />

                    <div className="modal font-mono ">
                        <div className=" p-8 rounded-md text-gray-200 bg-gray-900 relative">
                            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">
                                <TimesV />
                            </label>
                            <h3 className="font-bold text-xl">⚠️ Logout </h3>
                            <p className="py-8">Are you sure you want to log out?</p>
                            <div className='w-full flex justify-end'>
                                <label htmlFor="my-modal-3" className="p-2 cursor-pointer shadow-md rounded-md bg-red-500 bg-opacity-80" onClick={
                                    () => {
                                        LocalStorage.removeToken()
                                        navigate(0)
                                    }
                                }>
                                    Logout
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar