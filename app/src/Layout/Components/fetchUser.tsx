"use client"
import { axiosInstance } from "@/Axios/config";
import { useEffect, useState } from "react";
import Users from "../UI/User";

function FetchUser({ id, ui }: { id: string, ui: "small" | "large" }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance(`/auth/profile/${id}`)
                const { user } = response.data
                setUser(user);
            } catch (error: any) {
                setError(error.message);
            }
        }
        fetchUser()

    }, [])
    return (
        <>
            {user && <Users user={user} size={ui} />}
        </>
    )
}

export default FetchUser