import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";
import {DEFAULT_SERIALIZE_OPTIONS}  from "@/app/util/server/setSession";
/**
 * POST Request handler for the logout route
 * @param request 
 * @returns  set of expired cookies in order to log the user out.
 */
export async function POST(request: NextRequest) {
    try {
        // Replace the current cookies with an expired set using the Set-Cookies header in order to log the user out.
        const serialized = serialize('session', '', {...DEFAULT_SERIALIZE_OPTIONS, expires: new Date(0)});

        const response = NextResponse.json({message: "Succesfully logged out!"}, {status: 200});

        response.headers.set("Set-Cookie", serialized);

        return response;
    } catch (error) {
        console.error("Error in logout handler:", error);
        return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
}