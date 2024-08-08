import { FunctionComponent, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
    loading?: boolean
}

/**
 * Card Component with built-in loading effect.
 * @param param0 
 * @returns FunctionComponent describing the Card layout
 */
export const Card: FunctionComponent<CardProps> = ({children, loading}) => {
    return (
        <div className="p-6 bg-white shadow-md rounded-md">
        {loading ? (
            <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        ) : (
            children
        )}
    </div>
    )
}
