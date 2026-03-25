import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyTotpCode } from '@/lib/auth'
import { verifySessionJwt, createSessionJwt } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json({ error: 'TOTP token is required' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifySessionJwt(sessionCookie.value)

    if (!payload || !payload.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.adminUser.findUnique({
      where: { id: payload.userId },
    })

    if (!user || !user.totpSecret) {
      return NextResponse.json({ error: 'TOTP is not configured for this user' }, { status: 400 })
    }

    const isValid = verifyTotpCode(user.totpSecret, token)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid TOTP token' }, { status: 400 })
    }

    // Update IP and timestamp, and enable TOTP if it wasn't already
    const forwardedFor = req.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'

    const updateData: {
      lastLoginAt: Date
      lastLoginIp: string
      totpEnabled?: boolean
    } = {
      lastLoginAt: new Date(),
      lastLoginIp: ip,
    }

    if (!user.totpEnabled) {
      updateData.totpEnabled = true
    }

    await prisma.adminUser.update({
      where: { id: user.id },
      data: updateData,
    })

    // Issue new token with totpVerified: true
    const newSessionToken = await createSessionJwt({
      userId: user.id,
      email: user.email,
      totpVerified: true,
    })

    const response = NextResponse.json({
      success: true,
      message: 'TOTP verification successful',
    })

    // Update session cookie
    response.cookies.set({
      name: 'admin_session',
      value: newSessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    return response
  } catch (error) {
    console.error('TOTP verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
