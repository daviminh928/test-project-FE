'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/utils/api';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(name, email);
      router.push('/search');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dog Finder</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded w-80 mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded w-80 mb-4"
      />
      <button
        onClick={handleLogin}
        className="p-2 bg-blue-500 text-white rounded w-80"
      >
        Login
      </button>
    </div>
  );
}
