import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'adan.elarabi@gmail.com',
    password: 'DesMDPEnBlancCommeCaCestH0nteux!',
    Posts: {
      create: [
        {
          message:
            'The ultimate answer of life, the universe, and everything is 42. No matter what you say.',
        },
        {
          message:
            "I posted two things with my account, two, that's probably more than my grade on this project",
        },
      ],
    },
  },
  {
    email: 'whoareyou@whocares.notme',
    password: 'DesMDPEnBlancCommeCaCestVraimentH0nteux!',
    Posts: {
      create: [
        {
          message: 'Who are you? Who who? Who who? ',
        },
      ],
    },
  },
  {
    email: 'Heisenberg',
    password: 'DesMDPEnBlancCommeCaCestVraimentH0nteux!',
    Posts: {
      create: [
        {
          message: 'Say my name.',
        },
        {
          message: 'H-heisenberg',
        },
        {
          message: "You're godamn right.",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Adding some random stuff on the database.`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`New user with id: ${user.id}`);
  }
  console.log(`The random stuff has been added. Enjoy.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
