import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChartV, CreditCardV, DollarV, LayerV, PersonV, ShareV, TargetV, TradezerrLogo } from '../../component/_modules/_vetors'
import CloseToggle from './close';
import { Link, useLocation } from "react-router-dom"
import getCurrentUser from '../../helpers/currentUser';
import { useRecoilState } from 'recoil';
import { toggleSidebar } from '../../lib/atoms';
const Sidebar = () => {
    const [isToogleDisplayed, setIsToogleDisplayed] =
        useRecoilState(toggleSidebar);

    const openSidebar = () => {
        setIsToogleDisplayed(!isToogleDisplayed);
    }

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const id = getCurrentUser();

    const pathName = {
        profile: '/my-account/edit-account',
        withdraw: '/withdraw-page',
        login: '/login',
        deposit: '/deposit-page/',
        wallet: '/wallet',
        myShares: '/licenses'
    }

    return (
        <div className='flex bg-gray-50 dark:text-gray-300 dark:bg-gray-900 shadow-sm h-[30rem] overflow-y-scroll no-scrollbar xl:h-max rounded-lg flex-col p-4'>
            <CloseToggle />
            <Link to="/">
                <div className={`flex items-center p-4 space-x-1  `} onClick={() => {
                    openSidebar()
                }} >
                    <TradezerrLogo className="w-10 h-10" />
                    <p className='font-medium'>Tradezerr</p>
                </div>
            </Link>
            <div className="flex text-gray-600 p-1 space-x-4" >
                <p className='text-lg'>•</p>
                <p>Manage</p>
            </div>
            <Link to={pathName.myShares}>
                <div className={`${pathname === pathName.myShares ? "text-green-300 dark:text-[#2e6a5c]" : ""} flex p-1 my-2 space-x-4 transition-transform duration-200 hover:translate-x-1`} onClick={() => {
                    openSidebar()
                }}>
                    <LayerV className='lg:w-6 lg:h-6 w-4 h-4' />
                    <p>Shares</p>
                </div>
            </Link>
            <Link to={pathName.wallet}>
                <div className={`${pathname === pathName.wallet ? "text-green-300 dark:text-[#2e6a5c]" : ""} flex p-1 my-2 space-x-4 transition-transform duration-200 hover:translate-x-1`} onClick={() => {
                    openSidebar()
                }}>
                    <DollarV className='lg:w-6 lg:h-6 w-4 h-4' />
                    <p>Wallet</p>
                </div>
            </Link>
            <Link to={pathName.deposit}>
                <div className={`${pathname === pathName.deposit ? "text-green-300 dark:text-[#2e6a5c]" : ""} flex p-1 my-2 space-x-4 transition-transform duration-200 hover:translate-x-1`} onClick={() => {
                    openSidebar()
                }}>
                    <CreditCardV className='lg:w-6 lg:h-6 w-4 h-4' />
                    <p>Deposit</p>
                </div>
            </Link>
            <Link to="/withdraw-page">
                <div className={`${pathname === pathName.withdraw ? "text-green-300 dark:text-[#2e6a5c]" : ""} flex p-1 my-2 space-x-4 transition-transform duration-200 hover:translate-x-1`} onClick={() => {
                    openSidebar()
                }}>
                    <ShareV className='lg:w-6 lg:h-6 w-4 h-4' />
                    <p>Withdraw</p>
                </div>
            </Link>
            <div className="flex text-gray-600 p-1 space-x-4">
                <p className='text-lg'>•</p>
                <p>Account</p>
            </div>
            <Link to={pathName.profile}>
                <div className={`${pathname === pathName.portfolio ? "text-green-300 dark:text-[#2e6a5c]" : ""} flex p-1 my-2 transition-transform duration-200 hover:translate-x-1 space-x-4`} onClick={() => {
                    openSidebar()
                }}>
                    <ChartV className='lg:w-6 lg:h-6 w-4 h-4 ' />
                    <p>Bank account</p>
                </div>
            </Link>
            <Link to={id ? pathName.profile : pathName.login}>

                <div className={`${pathname === pathName.login || pathname === pathName.profile ? "text-green-300 dark:text-[#2e6a5c]" : ""} flex items-center p-1 transition-transform duration-200 hover:translate-x-1 space-x-4`} onClick={() => {
                    openSidebar()
                }} >
                    <PersonV className='lg:w-6 lg:h-6 w-4 h-4' />
                    <p>{id ? 'Details' : 'Login'}</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar