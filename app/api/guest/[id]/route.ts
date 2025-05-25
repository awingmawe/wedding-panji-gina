/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  params: {
    id: string
  }
}

// GET single guest
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const guest = await prisma.guest.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        attendances: true,
        messages: true,
      },
    })

    if (!guest) {
      return NextResponse.json({ error: 'Guest not found' }, { status: 404 })
    }

    return NextResponse.json(guest)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch guest' },
      { status: 500 }
    )
  }
}

// PUT update guest
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json()
    const { nama, nickname } = body

    const guest = await prisma.guest.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        nama,
        nickname,
      },
    })

    return NextResponse.json(guest)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update guest' },
      { status: 500 }
    )
  }
}

// DELETE guest
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await prisma.guest.delete({
      where: {
        id: parseInt(params.id),
      },
    })

    return NextResponse.json({ message: 'Guest deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete guest' },
      { status: 500 }
    )
  }
}
