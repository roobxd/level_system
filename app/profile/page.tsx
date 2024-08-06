'use client'
import useSWR from "swr"
import fetcher from "../util/client/fetcher"
import { User } from "@prisma/client"


export default function Profile() {
    const {data, error} = useSWR<{user: User}>('./api/profile', fetcher)

    
    return (
        <div className="flex flex-col min-h-screen p-12 bg-purple-700">
            <div className="flex flex-row mb-8 min-w-max justify-between">
                <h2 className="font-semi-bold text-5xl">Profile</h2>
                <button className="flex ">
                    <h2 className="font-semi-bold text-1xl">Logout</h2>
                </button>
            </div>
            <div className="flex flex-col p-4 rounded-md bg-white">
                <h2 className="font-semi-bold text-3xl text-black">Information</h2>
                
            </div>
        </div>
    )
}