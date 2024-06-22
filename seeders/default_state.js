import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const states = [
    { name: 'Baja Importancia' },
    { name: 'Mediana Importancia' },
    { name: 'Alta Importancia' },
    { name: 'Prioritario' },
    { name: 'Urgente' },
  ];

  for (const state of states) {
    await prisma.state.create({
      data: state,
    });
  }

  console.log('Todos los estados han sido creados correctamente.');

}

export default main;


