import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prismaClient from '@/app/util/server/prisma';
import { setSession } from '@/app/util/server/setSession';

/**
 * POST Request Handler for the login route
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: "No email or password was given." }, { status: 400 });
    }
    
    const user = await prismaClient.user.findUnique({ where: { email } });
    
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
    }
    
    // Compare the two passwords
    const passwordComparison = await bcrypt.compare(password, user.password);
    
    if (!passwordComparison) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
    }
    
    const response = await setSession(user.id);

    return NextResponse.json({ user: { id: user.id } }, {status: 200, headers: response.headers });
    
  } catch (error) {
    console.error("Error in login handler:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}