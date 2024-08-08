import { CookieSerializeOptions, serialize } from "cookie";
import { generateToken } from "@/app/util/server/jwt";
import { NextResponse } from "next/server";

/**
 * Default serialization options
 */
const DEFAULT_SERIALIZE_OPTIONS: CookieSerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
}

/**
 * Function to set the session cookie to our JWT Token
 * @param userId 
 * @returns 
 */
async function setSession(userId: number): Promise<NextResponse> {
    const token = await generateToken({ id: userId, expires: 60 * 60 });
    
    const response = NextResponse.json({ success: true });
    
    const serialized = serialize('session', token, {...DEFAULT_SERIALIZE_OPTIONS, maxAge: 60*60});
    
    response.headers.set('Set-Cookie', serialized);
    
    return response;
  }

  export { DEFAULT_SERIALIZE_OPTIONS, setSession}

