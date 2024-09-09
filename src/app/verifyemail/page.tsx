'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error: any) {
            console.error(error.response?.data || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");
        setToken(urlToken || "");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Verify Your Email</h1>
                <div className="text-center mb-4">
                    {token ? (
                        <p className="text-lg text-gray-700">Token:  <span className="block mt-2 bg-gray-200 p-2 rounded-lg text-sm font-mono overflow-x-auto whitespace-nowrap">
                            {token}
                        </span></p>
                    ) : (
                        <p className="text-lg text-gray-700">No token provided.</p>
                    )}
                </div>

                <button
                    onClick={verifyUserEmail}
                    disabled={loading || verified}
                    className={`w-full py-2 px-4 font-semibold text-white rounded-lg focus:outline-none ${verified ? 'bg-green-400 cursor-not-allowed' : loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} ${loading ? 'opacity-50' : ''}`}
                >
                    {loading ? 'Verifying...' : verified ? 'Verified' : 'Verify Email'}
                </button>

                {verified && (
                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold text-green-600">Email Verified Successfully!</h2>

                        <Link href="/login" className="mt-2 text-blue-500 hover:underline">
                            Proceed to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
