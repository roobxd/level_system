'use client'
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

/**
 * Logout Button Component - handles all logout functionality.
 * @returns 
 */
export const LogoutButton: FunctionComponent = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
        });

        // Navigate to the base route whenever logged out
        if (res.ok) {
            router.replace('/');
        } else {
            console.error('Failed to log out');
        }
    };

    return (
        <button onClick={handleLogout} className="rounded-md text-white hover:text-transparent transition duration-150">
            Logout
        </button>
    )
}