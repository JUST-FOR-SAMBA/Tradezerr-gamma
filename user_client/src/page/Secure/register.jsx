import React from 'react'
import SignInComponent from '../../component/secure/sign-in'

export const RegisterPage = () => {
    return (
        <div className='mx-auto w-[90%] md:w-[80%] lg:w-[80%] xl:w-[60%] m-12 bg-gray-50 rounded-md'>
            <p className='text-center text-xl p-4 text-gray-700'>Sign up</p>
            <SignInComponent />
        </div>

    )
}
