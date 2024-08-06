import prismaClient from "@/app/util/prisma";

const bcrypt = require("bcrypt")

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if(!email || !password) {return new Response(JSON.stringify({error: "No email or password was given."}), {status: 400})}

        const user = await prismaClient.user.findUnique({ where: {email}});

        const passwordComparison = bcrypt.compare(password, user?.password)

        if(!passwordComparison || !user) { return new Response(JSON.stringify({error: "Invalid credentials"}), {status: 400})}


        return new Response(JSON.stringify({jwt: ""}), {status: 200})

    } catch(error) {

    }
}