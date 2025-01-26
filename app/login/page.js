'use client';
import { login } from '@/actions/admin-auth-action';
import { useActionState } from 'react';

export default function LoginPage() {

  const [actionState, dispatch] = useActionState(login,{});
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-gray-700 p-8 rounded shadow-2xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          <span className="text-[#ef233c]">SHOPPY</span>CART Admin
        </h1>
        <form action={dispatch}>
          {actionState.errors?.general && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
              {actionState.errors.general}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name='email'
              id="email"
              className={`mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                actionState.errors?.email ? 'border-red-500' : 'border-gray-300'
              } text-black`}
              placeholder="Enter your email"
              required
            />
            {actionState.errors?.email && (
              <p className="text-red-500 text-sm mt-1">{actionState.errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name='password'
              className={`mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                actionState.errors?.password ? 'border-red-500' : 'border-gray-300'
              } text-black`}
              placeholder="Enter your password"
              required
            />
            {actionState.errors?.password && (
              <p className="text-red-500 text-sm mt-1">{actionState.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            {actionState.isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
