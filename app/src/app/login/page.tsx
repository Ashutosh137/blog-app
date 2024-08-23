"use client"
import Button from '@/UI/button'
import Heading from '@/UI/heading'
import Input from '@/UI/input'
import React, { FormEvent, useEffect, useState } from 'react'
import { AppDispatch, RootState } from "@/Redux/store"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/Redux/Authslice/Authslice'
import Error from '@/UI/Error'
import { useRouter } from 'next/navigation'
import Loading from '@/UI/loading'

function Page() {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const navigate = useRouter()
  const { error, isLogin, status } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login({ email: Email, password: Password }))
  }

  useEffect(() => {
    if (isLogin) {
      navigate.push('/')
    }
  }, [isLogin])

  return (
    <div className="max-w-screen-lg mx-auto  border border-primary p-5 py-10 rounded-md mt-5">
      <Heading label='login' />
      {status === "loading" && <Loading/>}
      <form onSubmit={handleLogin} className='p-2 container max-w-screen-sm mx-auto'>
        <Error error={error as string} />
        <Input label='email' type='email' onChange={(e) => setEmail(e.target.value)} value={Email} />
        <Input label='password' name='password' value={Password} onChange={(e) => setPassword(e.target.value)} type='password' />
        <Button type='submit' label='login' />
      </form>
    </div>
  )
}

export default Page