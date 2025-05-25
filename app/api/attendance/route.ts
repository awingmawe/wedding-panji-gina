/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all attendances
export async function GET() {
  try {
    const attendances = await prisma.attendance.findMany({
      include: {
        guest: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(attendances)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch attendances' },
      { status: 500 }
    )
  }
}

// POST create new attendance
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { guestId, nama, konfirmasi, jumlahTamu } = body

    const attendance = await prisma.attendance.create({
      data: {
        guestId,
        nama,
        konfirmasi,
        jumlahTamu,
      },
      include: {
        guest: true,
      },
    })

    return NextResponse.json(attendance, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create attendance' },
      { status: 500 }
    )
  }
}
