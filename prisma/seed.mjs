import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.productDetails.createMany({
    data: [
      {
        name: '2 Mukhi Rudraksha',
        description: 'This 2 Mukhi Rudraksha mala with 108+1 beads is one the most popular mala for Jaap, manifestation, and affirmations.Chanting a Rudraksha mala 108 times gives you a tremendous amount of positive energy and mental peace',
        price: 2500,
        image: ['https://cdn.dhanshreegems.com/catalog/product/cache/8149aed7859d8780e5e94637f828c068/r/u/rud13406.jpg',
         "https://originalrudraksha.com/cdn/shop/products/2-mukhi-min.jpg?v=1698390654&width=1445"
        ],        
        stock : 50,
        category:["Rudraksha"]
        
      },
      {
        name: '1 Mukhi rudraksha',
        description: 'Natural light brown color 1 face Rudraksha from South India.In 1 Mukhi Rudraksha, you will get to see 1 natural partition or cut on the surface of Rudraksha.',
        price: 2000,
        image: ['https://bharatbliss.com/wp-content/uploads/2021/11/Ek-Mukhi-Rudraksha.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAa5p0zL-ohGKVvoO6cJRErZ7BexETpKw-LKX-8kNWkR1szTIR4wIiwY4AxU82tVnCnXc&usqp=CAU'
        ],        
        stock : 22,
        category:["Rudraksha"]
      },
      {
        name: '7 chakra rudraksha',
        description: '7 Chakra Rudraksha Mala for mind, body and Chakra Healing.There are a total of 114 Chakras in a human body out of which 7 are main chakras also known as Kundalini or energy channels. 99.9% of the people in this world die without unblocking even their 1st chakra. ',
        price: 799,
        image: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD7yk8DDHvtipsn3oC5PdycvVbdJJYhbU2jmXZfJrIvLuAmGyQLuqzYWU8ezU-JcQqXgI&usqp=CAU',
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxDmHgX-e6uuGEiLRybm8cRzDhvM1AhI7S1jE3bnvvntuga4VZNYduDwJnNbt-yOMsVfA&usqp=CAU"
        ],        
        stock : 22,
        category:["Rudraksha"]
      },
      {
        name: '4 Mukhi Rudraksha',
        description: 'This 4 Mukhi Rudraksha mala with108+1 beads is one the most popular mala for Jaap, manifestation, and affirmations.',
        price: 1800,
        image: ['https://rudradivine.com/cdn/shop/products/61WQbJj993L._UX679.jpg?v=1672238749',
          "https://5.imimg.com/data5/LT/BW/UG/SELLER-8384540/j-500x500.jpg"
        ],        
        stock : 22,
        category:["Rudraksha"]
      },
      {
        name: '5 mukhi rudraksha',
        description: 'Chanting a Rudraksha mala 108 times gives you the tremendious amount of positive energy and mental peace.',
        price: 599,
        image: ['https://i0.wp.com/poojasamagristore.in/wp-content/uploads/2021/05/5-mukhi.jpg?fit=1000%2C1000&ssl=1',
          "https://5.imimg.com/data5/SELLER/Default/2023/5/307591169/SN/KE/XM/93919071/5-mukhi-rudraksha-500x500.jpg"
        ],        
        stock : 22,
        category:["Rudraksha"]
      },
      {
        name: '6 Mukhi Rudraksha',
        description: 'This 6 Mukhi Rudraksha mala with108+1 beads is one the most popular mala for Jaap, manifestation, and affirmations.',
        price: 1800,
        image: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQAspqP1_JAh3KCAupPqhkOXymMLGNtWsnOQ&s',
          "https://4.imimg.com/data4/BW/JX/GLADMIN-33798764/6-chah-mukhi-rudraksh-indonesian-origin-500x500.jpg"
        ],        
        stock : 22,
        category:["Rudraksha"]
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
