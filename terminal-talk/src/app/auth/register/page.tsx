'use client';
import React from 'react';

export default function Register Page() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ←────────────────────── LEFT FORM ──────────────────────→ */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          {/* Heading */}
          <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
            Create an account
          </h1>

          {/* Google button */}
          <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-50 transition">
            {/* Google Icon */}
            <svg
              className="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
            >
              {/* …SVG paths… */}
            </svg>
            Sign up with Google
          </button>
          <p className="text-xs text-gray-500 mb-4">
            By clicking “Sign up with Google” I agree to the{' '}
            <a href="#" className="underline text-gray-700">
              Terms of Service
            </a>
            , acknowledge the{' '}
            <a href="#" className="underline text-gray-700">
              Privacy Policy
            </a>
            , and consent to receive updates.
          </p>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <span className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-400 text-sm">
              Or continue with email
            </span>
            <span className="flex-grow border-t border-gray-300" />
          </div>

          {/* Email/Password form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <input
                id="updates"
                type="checkbox"
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="updates" className="select-none">
                I want to receive updates and promotional emails.
              </label>
            </div>

            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="terms" className="select-none">
                I agree to the{' '}
                <a href="#" className="underline text-gray-700">
                  Terms of Service
                </a>{' '}
                &{' '}
                <a href="#" className="underline text-gray-700">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-full font-medium mt-4 transition disabled:opacity-50"
            >
              Sign up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already registered?{' '}
            <a href="/login" className="underline text-purple-600">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* ←──────────────────── RIGHT HERO + CARDS ───────────────────→ */}
      <div className="flex-1 hidden md:block relative bg-gradient-to-br from-black-100 to-blue-200 overflow-hidden"></div>
    </div>
  );
}
