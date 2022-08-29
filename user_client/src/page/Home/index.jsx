import React from 'react'
import HomeComponent from '../../component/home'
import Navbar from '../../layout/navbar'

const HomePage = () => {
    return (
        <>
            <Navbar bSubN="Companies" />
            <HomeComponent />
        </>
    )
}

export default HomePage