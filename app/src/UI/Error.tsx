import React from 'react'

function Error({ error }: { error: string }) {
    return (
        <p className='text-base text-center capitalize font-semibold text-red-500'>{error}</p>
    )
}

export default Error