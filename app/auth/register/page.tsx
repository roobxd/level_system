'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, FunctionComponent, useState } from "react";
/**
 * Register Screen component, navigated to from the login screen.
 * @returns FunctionComponent describing screen layout
 */
const Register: FunctionComponent = () => {
    const router = useRouter();
    const [errorText, setErrorText] = useState<string | null>(null);
  
    /**
     * Register handler for whenever the register form is submitted
     * @param event 
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
  
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const json = await res.json();
  
      // Redirect towards the profile page whenever register returns a success status
      if (res.ok) {
        router.replace("/profile");
      } else {
        setErrorText(json.error || "Something went wrong! Please try again.");
      }
    }
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="font-bold text-4xl text-white pb-8">Gleetchy</h2>
        <div className="flex flex-col items-center bg-white shadow-md rounded-md p-4">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            {errorText && <h4 className="text-red-500">{errorText}</h4>}
            <div className="flex flex-col p-4">
              <label htmlFor="email" className="text-black">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="border-2 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col p-4">
              <label htmlFor="password" className="text-black">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="border-2 rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              className="w-1/2 bg-purple-700 rounded-md hover:bg-purple-500 ease-in-out transition-colors duration-300"
            >
              <h6 className="text-white p-2">Register</h6>
            </button>
            <Link
              href="/auth/login"
              className="mt-4"
            >
              <h6 className="text-gray-400">Login</h6>
            </Link>
          </form>
        </div>
      </main>
    );
}

export default Register;