import React from 'react'
import Service from '../../../services/index';
import ENDPOINTS from '../../../services/endpoints';
import { useUserData } from '../../../context/currentUser';
import Navbar from '../../../layout/navbar';

const PortfolioComponent = () => {
    const { data, isLoading } = useUserData()
    const handleSendVerification = () => {
        data?.username
        data?.email
        const values = {
            username: data?.username,
            email: data?.email
        }
        Service.post(ENDPOINTS.VERIFY_USER, values)
    }


    const UserLogin = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <p>{data?.email}</p>
                <p>{data?.status}</p>
            </div>
        )
    }


    const AdminOnly = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }
        if (data?.role === 'admin') {
            return (
                <div>
                    <button className='btn'>Delete User</button>
                    <button className='btn'>Update User</button>

                </div>
            )
        } else {
            return <div>You are {data?.roles[0].name}</div>
        }
    }

    const UserVerified = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }
        if (data?.status === 'Active') {
            return (
                <div>
                    <p>{data?.email}</p>
                    <p>{data?.status}</p>
                    <p>{data?.roles[0].name}</p>
                    <p>{data?.uuid}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>{data?.email}</p>
                    <p>{data?.status}</p>
                    <p>Check your email to verify your account</p>
                    <button className={data?.status === 'Active' ? "hidden" : "btn"} onClick={() => {
                        handleSendVerification()
                    }} >Resend it</button>

                </div>
            )
        }
    }



    return (
        <>
            <Navbar bSubN="Portfolio" />
            <div className='grid border border-red-500 grid-cols-3 gap-4'>
                <div>
                    <p>This can be seen by any user login</p>
                    <UserLogin />

                </div>
                <div>
                    <p>This can be seen by only  user verified</p>
                    <UserVerified />
                </div>
                <div>
                    <p>this can be seen only be admin</p>
                    <AdminOnly />
                </div>
            </div>
        </>
    )
}

export default PortfolioComponent