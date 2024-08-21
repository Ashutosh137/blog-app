"use client"
import Button from '@/UI/button'
import Error from '@/UI/Error'
import Heading from '@/UI/heading'
import Input from '@/UI/input'
import { register } from '@/Redux/Authslice/Authslice'
import { AppDispatch, RootState } from '@/Redux/store'
import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Page() {
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const { error } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()
    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(register({ email: Email, password: Password, name: Name }))

    }
    return (
        <div className="max-w-screen-lg mx-auto mt-5">
            <Heading label='register' />
            <form onSubmit={handleLogin} className='p-2 container max-w-screen-sm mx-auto'>
                <Error error={error as string} />
                <Input label='Name' type='Name' onChange={(e) => setName(e.target.value)} value={Name} />
                <Input label='email' type='email' onChange={(e) => setEmail(e.target.value)} value={Email} />
                <Input label='password' name='password' value={Password} onChange={(e) => setPassword(e.target.value)} type='password' />
                <Button type='submit' label='login' />
            </form>
        </div>
    )
}

export default Page