import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { generateTotpSecret, generateTotpUri } from '@/lib/auth'
import { verifySessionJwt } from '@/lib/jwt'
import { cookies } from 'next/headers'

export async function POST() {
  try {
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

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.totpEnabled) {
      return NextResponse.json({ error: 'TOTP is already enabled' }, { status: 400 })
    }

    // Generate new secret
    const secret = generateTotpSecret()
    const uri = generateTotpUri(secret, user.email)

    // Save secret to database temporarily (will be enabled upon verification)
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { totpSecret: secret },
    })

    return NextResponse.json({
      success: true,
      secret,
      uri,
    })
  } catch (error) {
    console.error('TOTP setup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
