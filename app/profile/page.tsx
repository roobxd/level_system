'use client'
import useSWR from "swr"
import fetcher from "../util/client/fetcher"
import { User } from "@prisma/client"
import {LogoutButton} from "./components/LogoutButton"
import {ProfileInformation} from "./components/ProfileInformation"
import { FunctionComponent } from "react"

/**
 * Profile Screen component - handles all profile related data
 * @returns FunctionComponent describing the profile page layout
 */
const Profile: FunctionComponent = () => {
    const {data, error} = useSWR<{user: Omit<User, "password" | "id">}>('./api/profile', fetcher)

    return (
        <>
            <div className="flex flex-row mb-8 min-w-max justify-between">
                <h2 className="font-semi-bold text-5xl text-white">Profile</h2>
                <LogoutButton/>
            </div>  

            <ProfileInformation profile={data?.user}/>
        
        </>
    )
}

export default Profile;