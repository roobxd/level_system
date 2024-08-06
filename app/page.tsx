import { FormEvent } from "react";

export default function Home() {

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")
    const password = formData.get("password")

  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-purple-700">
      <h2 className="font-bold text-4xl text-white pb-8">Glitchy</h2>
      <div className="flex items-center h-auto flex-col bg-white shadow-md rounded-md p-4">
        <form className="flex flex-col items-center">
          <div className="flex items-start flex-col p-4">
            <h6>Username</h6>
            <input className="border-2 rounded-md" name="email"/>
          </div>
          <div className="flex items-start flex-col p-4">
          <h6>Password</h6>
            <input className="border-2 rounded-md" name="password"/>
          </div>
          <button className="w-1/2  bg-purple-700 rounded-md hover:bg-purple-500 ease-in-out">
            <h6 className="text-white p-1">Login</h6>
          </button>
        </form>
      </div>
    </main>
  );
}
