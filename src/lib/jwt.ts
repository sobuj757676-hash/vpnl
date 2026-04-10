import { SignJWT, jwtVerify } from 'jose'
import { env } from './env'

const getJwtSecret = () => {
  const secret = env.JWT_SECRET || process.env.JWT_SECRET || 'fallback_secret_for_build_only'
  return new TextEncoder().encode(secret)
}

const JWT_EXPIRES_IN = '1d'

export interface JwtPayload {
  userId: string
  email: string
  totpVerified: boolean
}

export const createSessionJwt = async (payload: JwtPayload): Promise<string> => {
  const jwt = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(getJwtSecret())

  return jwt
}

export const verifySessionJwt = async (token: string): Promise<JwtPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret())
    return payload as unknown as JwtPayload
  } catch {
    return null
  }
}
