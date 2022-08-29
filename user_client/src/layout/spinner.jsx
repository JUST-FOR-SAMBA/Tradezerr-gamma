import React from 'react'
import { TbFidgetSpinner } from "react-icons/tb";

const Spinner = ({ className }) => {
    return (
        <div className='flex justify-center items-center'>
            <TbFidgetSpinner className={className} />
        </div>
    )
}

export default Spinner