import { SignJWT, jwtVerify } from 'jose'

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set.')
  }
  return new TextEncoder().encode(process.env.JWT_SECRET)
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
