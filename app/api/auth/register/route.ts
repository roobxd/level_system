import { generateToken } from "@/app/util/server/jwt";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie"
import { hash } from "bcrypt";
import prismaClient from "@/app/util/server/prisma";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if(!email || !password) {return new Response(JSON.stringify({error: "No email or password was given."}), {status: 400})}

        const hPassword = await hash(password, 10)


        const user = await prismaClient.user.create({
            data: {
                email,
                password: hPassword
            }
        })

        const token = generateToken({id: user.id})
        const response = NextResponse.json({ token });

        response.headers.set('Set-Cookie', serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60,
            path: '/',
          }));
         
        return response

    } catch(error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}