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
        <button onClick={handleLogout} className="rounded-md hover:bg-purple-500 ease-in-out transition-colors duration-300 text-white p-2">
            Logout
        </button>
    )
}