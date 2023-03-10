import Head from 'next/head'
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Home() {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <>
      <Head>
        <title>Test Schemas</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/" />
      </Head>

      <main className='p-[5%]'>
        <div className="flex justify-left">
          <form className="w-screen md:w-96 mx-auto">

            <h1 className="text-2xl font-bold my-4">Sign up for an account</h1>

            <div className="my-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="fullName">Full Name</label>
              <input className="border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="fullName" type="text" name="fullName" placeholder='Enter your fullname' />
            </div>

            <div className="my-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="lastname">Last Name</label>
              <input className="border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" name="lastname" placeholder='Enter your lastname' />
            </div>

            <div className="my-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
              <input className="border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" placeholder='Enter your email address' />
            </div>

            <div className="my-2 relative">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
              <input
                className="border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder=''
              />
              <div className="absolute inset-y-0 top-8 text-lg right-3 flex items-center">
                {showPassword ? (
                  <FaEyeSlash
                    className="text-gray-500 cursor-pointer"
                    onClick={handleTogglePassword}
                  />
                ) : (
                  <FaEye
                    className="text-gray-500 cursor-pointer"
                    onClick={handleTogglePassword}
                  />
                )}
              </div>
            </div>

            <button className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline my-2" type="submit">
              Sign Up
            </button>

          </form>
        </div>
      </main>
    </>
  )
}
