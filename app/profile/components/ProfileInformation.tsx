import { FunctionComponent } from "react";
import { Card } from "./Card";
import { User } from "@prisma/client";

// Additional props for screen data
interface ProfileInformationProps {
    profile?: Omit<User, "password" | "id" >
}


/**
 * Profile Information Screen - Handles all profile information data
 * @param param0 
 * @returns FunctionComponent describing the screen layout
 */
export const ProfileInformation: FunctionComponent<ProfileInformationProps> = ({profile}) => {
    
    return (
        <Card loading={profile === undefined}>
            {
                profile && (
                    <>
                        <h2 className="text-lg">Welcome, {profile.email}!</h2>

                        <div className="py-4">
                            <h3>You are currently level {profile.level}</h3>
                            <h3>You need {100 - profile.xp} more xp to level up!</h3>
                        </div>
                    </>
                )
            }
        </Card>
    )
}
