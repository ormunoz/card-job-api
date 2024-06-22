import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'Super Administrador' },
    { name: 'Administrador' },
    { name: 'Moderador' },
    { name: 'User' },
  ];

  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });
  }
  console.log('Todos los roles han sido creados correctamente.');
}

export default main;
