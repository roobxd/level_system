'use client'

import { useRouter } from "next/navigation";
import { FormEvent, FunctionComponent, useState } from "react";

/**
 * Home Screen component, first component to be loaded upon arrival
 * @returns FunctionComponent describing screen layout
 */
const Home: FunctionComponent = () => {
  const router = useRouter();

  const [errorText, setErrorText] = useState<string | null>(null);

  /**
   * Login handler for whenever the login form is submitted
   * @param event 
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    // Move towards the profile screen whenever given a success status.
    if (res.ok) {
      router.push("/profile");
    } else {
      setErrorText(json.error || "Something went wrong! Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="font-bold text-4xl text-white pb-8">Glitchy</h2>
      <div className="flex flex-col items-center bg-white shadow-md rounded-md p-4">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          {errorText && <h4 className="text-red-500">{errorText}</h4>}
          <div className="flex flex-col p-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="border-2 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col p-4">
            <label htmlFor="password">Password</label>
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
            <h6 className="text-white p-2">Login</h6>
          </button>
          <button
            type="button"
            className="mt-4"
            onClick={() => router.push("auth/register")}
          >
            <h6 className="text-gray-400">Register</h6>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;