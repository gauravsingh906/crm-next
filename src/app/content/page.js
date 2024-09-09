'use client';
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                {/* Dashboard Overview Card */}
                <div className="bg-blue-50 p-6 rounded-md shadow-sm mb-4">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-2">Dashboard Overview</h2>
                    <p className="text-gray-600">
                        View insights with various charts including product growth, bar charts, pie charts, and line charts.
                        You can also filter the data based on different time selections.
                    </p>
                </div>

                {/* Protected Routes Card */}
                <div className="bg-gray-50 p-6 rounded-md shadow-sm mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Protected Routes</h2>
                    <p className="text-gray-600">
                        The <strong>/profile</strong> route is protected by middleware and requires login. Access this route
                        after logging in to view your profile details.
                    </p>
                </div>

                {/* Login Button */}
                <div className="mb-8 text-center">
                    <Link href="/login">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Go to Login Page
                        </button>
                    </Link>
                </div>

                {/* Merged Details Section into Three Cards */}
                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-md shadow-sm">
                        <h2 className="text-xl font-semibold text-blue-700">Authentication Functions</h2>
                        <p className="text-gray-600">
                            <strong>Login Function:</strong> Authenticates users by verifying credentials and returning an authentication token.
                            <br />
                            <strong>Registration Function:</strong> Registers new users by storing their information and hashed password.
                            <br />
                            <strong>Password Reset Function:</strong> Allows users to reset their password by generating a reset token and updating the password.
                        </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-md shadow-sm">
                        <h2 className="text-xl font-semibold text-purple-700">Session and Authorization</h2>
                        <p className="text-gray-600">
                            <strong>Session Management:</strong> Manages user sessions and keeps track of authentication state.
                            <br />
                            <strong>Authorization Middleware:</strong> Protects routes and resources from unauthorized access based on tokens or user roles.
                            <br />
                            <strong>Logout Function:</strong> Ends the user session and clears authentication tokens.
                        </p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-md shadow-sm">
                        <h2 className="text-xl font-semibold text-orange-700">Email Verification</h2>
                        <p className="text-gray-600">
                            Confirms the user’s email address by sending a verification link or code and validating it.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
