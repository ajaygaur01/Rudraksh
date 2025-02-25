import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.productDetails.createMany({
    data: [
      {
        name: '2 Mukhi Rudraksha',
        description: 'This is a great product',
        price: 19.99,
        image: ['https://via.placeholder.com/150',],        
        stock : 22
      },
      {
        name: 'Product 2',
        description: 'Another great product',
        price: 29.99,
        image: ['https://via.placeholder.com/150',],        
        stock : 22
      },
      {
        name: 'Product 1',
        description: 'This is a great product',
        price: 19.99,
        image: ['https://via.placeholder.com/150',],        
        stock : 22
      },
      {
        name: 'Product 1',
        description: 'This is a great product',
        price: 19.99,
        image: ['https://via.placeholder.com/150',],        
        stock : 22
      },
      {
        name: 'Product 1',
        description: 'This is a great product',
        price: 19.99,
        image: ['https://via.placeholder.com/150',],        
        stock : 22
      },
      {
        name: 'Product 1',
        description: 'This is a great product',
        price: 19.99,
        image: ['https://via.placeholder.com/150',],        
        stock : 22
      },
      {
        name: 'Product 1',
        description: 'This is a great product',
        price: 19.99,
        image: ['https://via.placeholder.com/150',],        
        stock : 22
      },
      {
        name: 'Product 1',
        description: 'This is a great product',
        price: 19.99,
        image: ['https://via.placeholder.com/150',],        
        stock : 22
      },
      {
        name: 'Product 1',
        description: 'This is a great product',
        price: 19.99,
        image: ['https://via.placeholder.com/150',],        
        stock : 22
      },
      {
        name: 'Product 1',
        description: 'This is a great product',
        price: 19.99,
        image: ['https://via.placeholder.com/150',],        
        stock : 22
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
