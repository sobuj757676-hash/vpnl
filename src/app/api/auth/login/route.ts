import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyPassword } from '@/lib/auth'
import { createSessionJwt } from '@/lib/jwt'
import { z } from 'zod'
import { logger } from '@/lib/logger'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const parsed = loginSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    const user = await prisma.adminUser.findUnique({
      where: { email },
    })

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await verifyPassword(password, user.passwordHash)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Mandatory TOTP: everyone must either verify or set up TOTP
    const requiresTotp = true

    // Issue a temporary token indicating TOTP is needed
    const token = await createSessionJwt({
      userId: user.id,
      email: user.email,
      totpVerified: false,
    })

    const response = NextResponse.json({
      success: true,
      requiresTotp,
      totpSetupRequired: !user.totpEnabled,
      message: user.totpEnabled ? 'TOTP verification required' : 'TOTP setup required',
    })

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    return response
  } catch (error) {
    logger.error('Login error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
