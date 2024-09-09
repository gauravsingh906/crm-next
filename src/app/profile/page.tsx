'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface UserData {
    _id: string;
    email: string;
    username: string;
    isAdmin: boolean;
    isVerified: boolean;
}

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState<UserData | null>(null);

    const getUserDetails = async () => {
        try {
            const response = await axios.get<{ data: UserData }>("/api/users/me");
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Failed to fetch user details");
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log("logout", response.data);
            toast.success("Logout successful! Redirecting...");
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (err: any) {
            console.error("Logout failed", err);
            toast.error("Logout failed: " + err.message);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-4">Profile</h1>
                {data ? (
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-medium">User ID:</h2>
                            <p className="text-gray-700">{data._id}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-medium">Email:</h2>
                            <p className="text-gray-700">{data.email}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-medium">Username:</h2>
                            <p className="text-gray-700">{data.username}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-medium">Verified:</h2>
                            <p className={`text-gray-700 ${data.isVerified ? 'text-green-500' : 'text-red-500'}`}>
                                {data.isVerified ? 'Verified' : 'Not Verified'}
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-medium">Admin:</h2>
                            <p className={`text-gray-700 ${data.isAdmin ? 'text-green-500' : 'text-red-500'}`}>
                                {data.isAdmin ? 'Yes' : 'No'}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={logout}
                            className="w-full py-2 px-4 font-semibold text-white rounded-lg bg-red-500 hover:bg-red-800 focus:outline-none"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-700">Loading...</p>
                )}
            </div>
        </div>
    );
}
