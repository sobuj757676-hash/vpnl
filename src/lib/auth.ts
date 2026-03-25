import * as bcrypt from 'bcrypt'
import * as OTPAuth from 'otpauth'

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

// TOTP utilities
export const generateTotpSecret = (): string => {
  const secret = new OTPAuth.Secret({ size: 20 })
  return secret.base32
}

export const generateTotpUri = (secret: string, email: string): string => {
  const totp = new OTPAuth.TOTP({
    issuer: 'VPN Admin Panel',
    label: email,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  })
  return totp.toString()
}

export const verifyTotpCode = (secret: string, token: string): boolean => {
  const totp = new OTPAuth.TOTP({
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  })

  const delta = totp.validate({ token, window: 1 })
  return delta !== null
}
