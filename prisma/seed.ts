import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const doctor = await prisma.doctor.create({
    data: {
      name: "Josue",
      email: "josueruiz@ufm.edu",
      phone: "52095960",
      specialty: "Cardiologo",
      avatarUrl: "https://media.licdn.com/dms/image/v2/D4E03AQE5VTgOHnQr9g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1666300173077?e=1732147200&v=beta&t=I1TNIJUlWghZQxb9niR1PKKHnEzXcBjPUhdSrVBq54s" // Reemplaza esto con una URL real
    },
  })

  console.log({ doctor })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
