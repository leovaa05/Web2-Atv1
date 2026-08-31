// src/seed-teste.js
// Script de seed usado como alternativa ao Prisma Studio,
// que apresentou erro 403 (studio.js) no ambiente do Codespace.

import prisma from './config/database.js';

async function main() {
  // Busca o professor se já existir, senão cria
  let professor = await prisma.user.findUnique({
    where: { email: 'professor@teste.com' },
  });

  if (!professor) {
    professor = await prisma.user.create({
      data: {
        nome: 'Prof. Teste',
        email: 'professor@teste.com',
        papel: 'PROFESSOR',
      },
    });
  }

  const materia = await prisma.subject.create({
    data: {
      nome: 'Matemática',
      professorId: professor.id,
    },
  });

  const questao = await prisma.question.create({
    data: {
      enunciado: 'Quanto é 2 + 2?',
      dificuldade: 1,
      respostaCorreta: '4',
      disciplinaId: materia.id,
      autorId: professor.id,
    },
  });

  console.log('Professor:', professor);
  console.log('Matéria criada:', materia);
  console.log('Questão criada:', questao);
}

main()
  .catch((error) => {
    console.error('Erro ao criar dados de teste:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());