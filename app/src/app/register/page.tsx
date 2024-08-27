"use client";
import Button from '@/UI/button';
import Error from '@/UI/Error';
import Heading from '@/UI/heading';
import Input from '@/UI/input';
import { register } from '@/Redux/Authslice/Authslice';
import { AppDispatch, RootState } from '@/Redux/store';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/UI/loading';
import Link from 'next/link';

function Page() {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const { error, status } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Email && Password && Name) {
            dispatch(register({ email: Email, password: Password, name: Name }));
        }
    };

    return (
        <div className="max-w-screen-md mx-auto  border border-primary p-6 py-12 rounded-xl mt-10 shadow-lg">
            <Heading label='Register' />
            {status === "loading" && <Loading />}
            <form onSubmit={handleRegister} className='p-6  border border-gray-600 rounded-lg shadow-md'>
                <Error error={error as string} />
                <div className="mb-4">
                    <Input
                        label='Name'
                        required
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={Name}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-4">
                    <Input
                        label='Email'
                        required
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={Email}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <Input
                        label='Password'
                        minLength={6}
                        required
                        name='password'
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder="Enter your password"
                    />
                </div>
                <Button
                    type='submit'
                    label='Register'
                />
                <div className="mt-8 text-center">
                        <Link href='/login' className='text-gray-300 capitalize text-base hover:text-gray-100 transition duration-300'>
                            Already have an account?
                        </Link>
                </div>
            </form>
        </div>
    );
}

export default Page;
