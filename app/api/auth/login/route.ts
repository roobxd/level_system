import { generateToken } from "@/app/util/server/jwt";
import prismaClient from "@/app/util/server/prisma";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

const bcrypt = require("bcrypt")

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if(!email || !password) {return new NextResponse(JSON.stringify({error: "No email or password was given."}), {status: 400})}

        const user = await prismaClient.user.findUnique({ where: {email}});

        if(!user) { return NextResponse.json({ error: "Invalid credentials." }, { status: 400 }); }

        const passwordComparison = await bcrypt.compare(password, user?.password)

        if(!passwordComparison) { return NextResponse.json({ error: "Invalid credentials." }, { status: 400 }); }


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