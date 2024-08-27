"use client"
import Button from '@/UI/button'
import React from 'react'
import { CiShare1 } from 'react-icons/ci'

function Share({ Blogid, title }: { Blogid: string, title: string }) {
    const handleshare = () => [
        window.navigator.share({
            title: title,
            text: title,
            url: `${window.origin}/Blog/${Blogid}`,
        })
    ]
    return (
        <Button icon={<CiShare1 />} onClick={handleshare} label='Share' />
    )
}

export default Share