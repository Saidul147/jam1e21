"use client"

import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Lösenorden matchar inte!");
            return;
        }
        console.log("Registered:", formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Registrera</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <div>
                        <label className="block text-gray-600 mb-1">Ditt namn</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Namn"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-gray-600 mb-1">E-post</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="E-post"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-gray-600 mb-1">Lösenord</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="block text-gray-600 mb-1">Confirm Lösenord</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Confirm Lösenord"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Register Button */}
                    <div className="flex justify-evenly">
                    <Link href="/login" className="">
                        <button
                            type="submit"
                            className=" bg-blue-500 cursor-pointer py-3 px-10 hover:bg-blue-600 text-white font-bold  rounded-lg transition-all duration-300"
                        >
                            Registrera
                        </button>
                    </Link>
                    <Link href="/login" className="">
                        <button
                            className=" bg-blue-500 cursor-pointer py-3 px-10 hover:bg-blue-600 text-white font-bold  rounded-lg transition-all duration-300"
                        >
                            Logga in
                        </button>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
