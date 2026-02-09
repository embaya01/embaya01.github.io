import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SECRET = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "fallback-secret-key-change-me"
)

const ADMIN_USERNAME = "Admin"
const ADMIN_PASSWORD = "123456789e"

export async function verifyCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(SECRET)
  return token
}

export async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_session")?.value
    if (!token) return false
    await jwtVerify(token, SECRET)
    return true
  } catch {
    return false
  }
}
