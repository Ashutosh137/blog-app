"use client";
import Button from '@/UI/button';
import Heading from '@/UI/heading';
import Input from '@/UI/input';
import React, { FormEvent, useEffect, useState } from 'react';
import { AppDispatch, RootState } from "@/Redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/Redux/Authslice/Authslice';
import Error from '@/UI/Error';
import { useRouter } from 'next/navigation';
import Loading from '@/UI/loading';
import Link from 'next/link';

function Page() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useRouter();
  const { error, isLogin, status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: Email, password: Password }));
  };

  useEffect(() => {
    if (isLogin) {
      navigate.push('/');
    }
  }, [isLogin, navigate]);

  return (
    <div className="max-w-screen-md mx-auto bg-bgSecondary border border-primary p-6 py-12 rounded-xl mt-10 shadow-lg">
      <Heading label='Login' />
      {status === "loading" && <Loading />}
      <form onSubmit={handleLogin} className='p-4 border border-gray-600 rounded-lg shadow-md'>
        <Error error={error as string} />
        <div className="mb-4">
          <Input
            label='Email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <Input
            minLength={6}
            label='Password'
            name='password'
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder="Enter your password"
          />
        </div>
        <Button
          type='submit'
          label='Login'
        />
        <br />
        <div className="mt-10">

        <Link href={'/register'} className='text-gray-300 text-base p-2 pt-16 text-center ' >Not Sign-up Yet?</Link>
        </div>
      </form>
    </div>
  );
}

export default Page;
