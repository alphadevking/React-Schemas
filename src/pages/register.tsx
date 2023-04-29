import Form from '@/sections/registrationForm'
import Head from 'next/head'
import React from 'react'

export default function CreateNewAccount() {
    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Create New Account</title>
                <link rel="icon" href="" />
            </Head>
            <main className="max-w-xl mx-auto w-full">
                <div className="flex justify-center my-12">
                    <div className="w-full lg:w-11/12 bg-white p-5 rounded-lg shadow-xl">
                        <h3 className="pt-4 text-2xl text-center font-bold">
                            Create New Account
                        </h3>
                        <Form />
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}