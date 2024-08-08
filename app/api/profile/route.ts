import { verifyToken } from "@/app/util/server/jwt";
import prismaClient from "@/app/util/server/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET request handler for the profile route
 * @param request 
 * @returns an truncated version of the user withholding the password and id.
 */
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("session");
        
        if(!token) {
            return NextResponse.json({error: "No token passed"}, { status: 401})
        }

        const userInfo = await verifyToken(token.value);

        if(!userInfo) {
            return NextResponse.json({error: "Invalid token passed"}, { status: 401})
        }

        const user = await prismaClient.user.findUnique({where: {id: userInfo.id}})

        if(!user) {
            return NextResponse.json({error: "No user found"}, { status: 401})
        }

        // Truncate the user object so that trUser only contains all other properties except password and id
        const {password, id, ...trUser} = user;

        return NextResponse.json({user: trUser}, {status: 200})
    }  catch(error) {
        console.error("Error in profile handler:", error);
        return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
}