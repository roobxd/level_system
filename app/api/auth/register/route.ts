import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import prismaClient from "@/app/util/server/prisma";
import { setSession } from "@/app/util/server/setSession";

/**
 * POST request handler for my registration route
 * @param request 
 * @returns the user's ID alongside a JWT token in the headers for future authentication
 */
export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new NextResponse(JSON.stringify({ error: "No email or password was given." }), { status: 400 });
        }

        const hPassword = await hash(password, 10);

        const user = await prismaClient.user.create({
            data: {
                email,
                password: hPassword
            }
        });

        const response = await setSession(user.id);

        return NextResponse.json({ user: { id: user.id } }, { headers: response.headers });
    } catch (error) {
        console.error("Error in register handler:", error);
        return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
}
