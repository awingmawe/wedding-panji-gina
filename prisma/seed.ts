import { PrismaClient } from '@prisma/client'
import guestData from './guest.json'
import attendanceData from './attendance.json'
import messageData from './message.json'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.message.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.guest.deleteMany()

  // Seed guests
  for (const guest of guestData) {
    await prisma.guest.create({
      data: {
        id: guest.id,
        nama: guest.nama,
        nickname: guest.nickname,
      },
    })
  }

  // Seed attendances
  for (const attendance of attendanceData) {
    await prisma.attendance.create({
      data: {
        id: attendance.id,
        guestId: attendance.guest_id,
        nama: attendance.nama,
        konfirmasi: attendance.konfirmasi,
        jumlahTamu: attendance.jumlah_tamu,
      },
    })
  }

  // Seed messages
  for (const message of messageData) {
    await prisma.message.create({
      data: {
        id: message.id,
        guestId: message.guest_id,
        message: message.message,
        name: message.name,
      },
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
