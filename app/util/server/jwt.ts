import { SignJWT, jwtVerify, JWTPayload } from "jose";


// Custom Payload interface to match the return types
interface LevelJwtPayload extends JWTPayload {
  id: number
}

/**
 * Function to generate a new JWT Token
 * @param payload 
 * @returns a Promise containing the signed JWT token
 */
export const generateToken = async (payload: LevelJwtPayload): Promise<string> => {
  const secret = Buffer.from(process.env.JWT_SECRET || "", "utf-8");

  return await new SignJWT(payload) 
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
};

/**
 * Function to verify an incoming token against the secret.
 * @param token 
 * @returns The JWT Payload or null if verification fails
 */
export const verifyToken = async (token: string): Promise<LevelJwtPayload | null> => {
  try {
    const secret = Buffer.from(process.env.JWT_SECRET || "", "utf-8");

    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    console.log("Decoded Token:", payload);
    return payload as LevelJwtPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
