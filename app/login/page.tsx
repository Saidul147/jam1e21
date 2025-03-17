"use client"
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Logga in</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-gray-600 mb-1">Användarnamn eller E-post</label>
            <input
              type="email"
              className="w-full px-4 text-gray-700 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-600 mb-1">Lösenord</label>
            <input
              type="password"
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Link href="/subscription" className="w-full"> 
              <button
                type="submit"
                className=" bg-blue-500 cursor-pointer w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Logga in
              </button>
            </Link>
            <Link href="/signup" className=" w-full">
              <button
                type="button"
                className=" bg-gray-200 w-full cursor-pointer py-2 px-4 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-all duration-300"
              >
                Registrera
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
