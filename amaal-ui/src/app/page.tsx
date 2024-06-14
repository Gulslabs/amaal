"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  // TODO: Uncomment below code to enable SSO(Single Sign On)
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(`Token in landing page: ${token}`);
  //   if (token) {
  //     router.push("/amaal");
  //   }
  // });
  const handleLocalLogin = () => {
    alert("Default login not implemented. Use Google authentication");
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form method="POST" action="/api/auth/login">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={handleLocalLogin}
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">or</p>
          <button
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            onClick={() =>
              router.push("http://localhost:3001/api/auth/google/login")
            }
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}
