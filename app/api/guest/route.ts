/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all guests
export async function GET() {
  try {
    const guests = await prisma.guest.findMany({
      include: {
        attendances: true,
        messages: true,
      },
      orderBy: {
        id: 'asc',
      },
    })

    return NextResponse.json(guests)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch guests' },
      { status: 500 }
    )
  }
}

// POST create new guest
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nama, nickname } = body

    const guest = await prisma.guest.create({
      data: {
        nama,
        nickname,
      },
    })

    return NextResponse.json(guest, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create guest' },
      { status: 500 }
    )
  }
}
