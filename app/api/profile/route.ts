import { verifyToken } from "@/app/util/server/jwt";
import prismaClient from "@/app/util/server/prisma";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token");

        if(!token) {
            return NextResponse.json({error: "No token passed"}, { status: 401})
        }

        const userInfo = verifyToken(token.value);

        if(!userInfo) {
            return NextResponse.json({error: "Invalid token passed"}, { status: 401})
        }

        const user = await prismaClient.user.findUnique({where: {id: userInfo.id}})

        if(!user) {
            return NextResponse.json({error: "No user found"}, { status: 401})
        }
        const {password, id, ...obfUser} = user;

        return NextResponse.json({user: obfUser}, {status: 200})
    }  catch(error) {
        return NextResponse.json({ok: "!"}, {status: 400})
    }
}