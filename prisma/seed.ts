import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: hashedPassword,
    },
  });

  console.log(`Created user: ${user.email}`);

  const pet1 = await prisma.pet.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Max',
      species: 'Dog',
      age: 3,
      weight: 15.5,
      observations: 'Friendly and energetic',
      ownerId: user.id,
    },
  });

  console.log(`Created pet: ${pet1.name}`);

  const pet2 = await prisma.pet.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Luna',
      species: 'Cat',
      age: 2,
      weight: 4.2,
      observations: 'Calm and affectionate',
      ownerId: user.id,
    },
  });

  console.log(`Created pet: ${pet2.name}`);

  const appointment1 = await prisma.appointment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      date: new Date('2025-12-01T10:00:00Z'),
      service: 'Vaccination',
      observations: 'Annual vaccine',
      petId: pet1.id,
    },
  });

  console.log(`Created appointment for ${pet1.name}: ${appointment1.service}`);

  const appointment2 = await prisma.appointment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      date: new Date('2025-12-15T14:00:00Z'),
      service: 'General checkup',
      observations: 'Routine examination',
      petId: pet2.id,
    },
  });

  console.log(`Created appointment for ${pet2.name}: ${appointment2.service}`);

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

