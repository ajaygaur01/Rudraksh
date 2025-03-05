import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.productDetails.createMany({
    data: [
      {
    name: "1 Mukhi Rudraksha",
    description: "The 1 Mukhi Rudraksha is the rarest and most powerful bead, symbolizing the pure consciousness of Lord Shiva. It is believed to bestow immense spiritual growth, enlightenment, and detachment from materialistic desires. This bead is highly revered for its ability to enhance meditation, focus, and divine wisdom.",
    price: 50000,
    image: [
      "https://example.com/1-mukhi-1.jpg",
      "https://example.com/1-mukhi-2.jpg"
    ],
    stock: 5,
    category: ["Rudraksha"]
  },
  {
    name: "2 Mukhi Rudraksha",
    description: "The 2 Mukhi Rudraksha represents Ardhanarishvara, the union of Lord Shiva and Goddess Parvati. It symbolizes harmony, unity, and balance. This bead is believed to strengthen relationships, bring emotional stability, and enhance interpersonal bonds in both personal and professional life.",
    price: 3000,
    image: [
      "https://example.com/2-mukhi-1.jpg",
      "https://example.com/2-mukhi-2.jpg"
    ],
    stock: 20,
    category: ["Rudraksha"]
  },
  {
    name: "3 Mukhi Rudraksha",
    description: "The 3 Mukhi Rudraksha is associated with Lord Agni (Fire) and represents the past, present, and future. It is believed to cleanse sins from previous births, boost self-confidence, and help the wearer overcome stress, fear, and guilt. It is known for bringing clarity and peace of mind.",
    price: 2500,
    image: [
      "https://example.com/3-mukhi-1.jpg",
      "https://example.com/3-mukhi-2.jpg"
    ],
    stock: 30,
    category: ["Rudraksha"]
  },
  {
    name: "4 Mukhi Rudraksha",
    description: "The 4 Mukhi Rudraksha is ruled by Lord Brahma, the creator of the universe. It enhances knowledge, creativity, and communication skills. This bead is highly beneficial for students, teachers, and professionals seeking wisdom and mental clarity. It also aids in self-expression and intellectual growth.",
    price: 1800,
    image: [
      "https://example.com/4-mukhi-1.jpg",
      "https://example.com/4-mukhi-2.jpg"
    ],
    stock: 25,
    category: ["Rudraksha"]
  },
  {
    name: "5 Mukhi Rudraksha",
  description: "The 5 Mukhi Rudraksha is the most common bead and represents Lord Shiva in the form of Kalagni Rudra. It is known for bringing inner peace, spiritual growth, and mental clarity. This bead is widely used for meditation and helps regulate blood pressure, stress, and anxiety levels.",
    price: 1200,
    image: [
      "https://example.com/5-mukhi-1.jpg",
      "https://example.com/5-mukhi-2.jpg"
    ],
    stock: 50,
    category: ["Rudraksha"]
  },
  {
    name: "6 Mukhi Rudraksha",
    description: "The 6 Mukhi Rudraksha is associated with Lord Kartikeya and enhances willpower, courage, and discipline. It is known for its ability to remove laziness and strengthen decision-making skills. This bead is beneficial for individuals seeking career growth and personal development.",
    price: 1800,
    image: [
      "https://example.com/6-mukhi-1.jpg",
      "https://example.com/6-mukhi-2.jpg"
    ],
    stock: 22,
    category: ["Rudraksha"]
  },
  {
    name: "7 Mukhi Rudraksha",
    description: "The 7 Mukhi Rudraksha is ruled by Goddess Lakshmi, the deity of wealth and prosperity. It is believed to attract financial growth, remove hardships, and bring good fortune. This bead is ideal for business professionals and those seeking stability in their financial and personal life.",
    price: 4000,
    image: [
      "https://example.com/7-mukhi-1.jpg",
      "https://example.com/7-mukhi-2.jpg"
    ],
    stock: 18,
    category: ["Rudraksha"]
  },
  {
    name: "8 Mukhi Rudraksha",
    description: "The 8 Mukhi Rudraksha is ruled by Lord Ganesha, the remover of obstacles. This bead is believed to bring success, stability, and inner strength. It is highly beneficial for individuals facing hardships in their professional or personal life, helping them overcome challenges with wisdom and resilience.",
    price: 5500,
    image: [
      "https://example.com/8-mukhi-1.jpg",
      "https://example.com/8-mukhi-2.jpg"
    ],
    stock: 15,
    category: ["Rudraksha"]
  },
  {
    name: "9 Mukhi Rudraksha",
    description: "The 9 Mukhi Rudraksha is associated with Goddess Durga and represents divine energy. It is known for bestowing power, fearlessness, and dynamism. Wearing this bead enhances one’s ability to face difficult situations and conquer negativity with confidence.",
    price: 7000,
    image: [
      "https://example.com/9-mukhi-1.jpg",
      "https://example.com/9-mukhi-2.jpg"
    ],
    stock: 12,
    category: ["Rudraksha"]
  },
  {
    name: "10 Mukhi Rudraksha",
    description: "The 10 Mukhi Rudraksha is ruled by Lord Vishnu and protects the wearer from negative energies and external influences. It is believed to provide peace of mind, resolve legal issues, and safeguard against malevolent forces.",
    price: 9000,
    image: [
      "https://example.com/10-mukhi-1.jpg",
      "https://example.com/10-mukhi-2.jpg"
    ],
    stock: 10,
    category: ["Rudraksha"]
  },
  {
    name: "11 Mukhi Rudraksha",
    description: "The 11 Mukhi Rudraksha is linked to Lord Hanuman and bestows immense physical and mental strength. It helps in enhancing self-discipline, willpower, and focus, making it highly beneficial for athletes, leaders, and spiritual practitioners.",
    price: 12000,
    image: [
      "https://example.com/11-mukhi-1.jpg",
      "https://example.com/11-mukhi-2.jpg"
    ],
    stock: 8,
    category: ["Rudraksha"]
  },
  {
    name: "12 Mukhi Rudraksha",
    description: "The 12 Mukhi Rudraksha is governed by Lord Surya (the Sun God) and enhances leadership qualities, confidence, and charisma. It is often worn by individuals in authoritative positions to gain success and command respect.",
    price: 15000,
    image: [
      "https://example.com/12-mukhi-1.jpg",
      "https://example.com/12-mukhi-2.jpg"
    ],
    stock: 6,
    category: ["Rudraksha"]
  },
  {
    name: "13 Mukhi Rudraksha",
    description: "The 13 Mukhi Rudraksha is associated with Lord Indra and Kamadeva. It is known to enhance charisma, attraction, and persuasive abilities. This bead is highly beneficial for individuals in leadership roles, public speaking, and those seeking success in relationships and career endeavors.",
    price: 18000,
    image: [
      "https://example.com/13-mukhi-1.jpg",
      "https://example.com/13-mukhi-2.jpg"
    ],
    stock: 5,
    category: ["Rudraksha"]
  },
  {
    name: "14 Mukhi Rudraksha",
    description: "The 14 Mukhi Rudraksha is known as Deva Mani and is considered one of the most powerful beads. It is believed to enhance intuition, decision-making abilities, and protection from negative influences. This bead is highly recommended for individuals in business, leadership, and those seeking spiritual awakening.",
    price: 25000,
    image: [
      "https://example.com/14-mukhi-1.jpg",
      "https://example.com/14-mukhi-2.jpg"
    ],
    stock: 4,
    category: ["Rudraksha"]
  },
  {
    name: "15 Mukhi Rudraksha",
    description: "The 15 Mukhi Rudraksha is associated with Lord Pashupatinath, a form of Lord Shiva. It is known to bring emotional balance, clarity of thoughts, and detachment from material desires. Wearing this bead helps in developing compassion, inner peace, and spiritual growth.",
    price: 30000,
  image: [
      "https://example.com/15-mukhi-1.jpg",
      "https://example.com/15-mukhi-2.jpg"
    ],
  stock: 3,
    category: ["Rudraksha"]
  },
  {
    name: "16 Mukhi Rudraksha",
  description: "The 16 Mukhi Rudraksha is ruled by Lord Mahamrityunjaya Shiva and is considered a protector from untimely death and misfortunes. It is believed to bring immense strength, courage, and stability in life. This bead is ideal for those facing challenges, fear, and seeking divine protection.",
    price: 35000,
    image: [
      "https://example.com/16-mukhi-1.jpg",
      "https://example.com/16-mukhi-2.jpg"
    ],
    stock: 2,
    category: ["Rudraksha"]
  },
  {
  name: "17 Mukhi Rudraksha",
    description: "The 17 Mukhi Rudraksha is associated with Lord Vishwakarma and is known to bring wealth, fortune, and success in business endeavors. It helps the wearer in achieving their goals with determination and confidence. This bead is recommended for entrepreneurs and those seeking prosperity.",
    price: 45000,
    image: [
      "https://example.com/17-mukhi-1.jpg",
      "https://example.com/17-mukhi-2.jpg"
    ],
    stock: 2,
    category: ["Rudraksha"]
  },
  {
    name: "18 Mukhi Rudraksha",
    description: "The 18 Mukhi Rudraksha is ruled by Goddess Bhumi Devi, the Earth Goddess. It is known for its ability to bring stability, patience, and prosperity. This bead is beneficial for individuals involved in real estate, agriculture, or land-related businesses, ensuring long-term success and abundance.",
    price: 50000,
    image: [
      "https://example.com/18-mukhi-1.jpg",
      "https://example.com/18-mukhi-2.jpg"
    ],
    stock: 1,
    category: ["Rudraksha"]
  },
  {
    name: "19 Mukhi Rudraksha",
    description: "The 19 Mukhi Rudraksha is associated with Lord Narayana and is known for fulfilling desires and bestowing immense wealth. It enhances self-confidence, leadership skills, and provides divine grace to the wearer. This bead is ideal for individuals seeking recognition and financial stability.",
    price: 60000,
    image: [
      "https://example.com/19-mukhi-1.jpg",
      "https://example.com/19-mukhi-2.jpg"
    ],
    stock: 1,
    category: ["Rudraksha"]
  },
  {
    name: "20 Mukhi Rudraksha",
    description: "The 20 Mukhi Rudraksha is ruled by Lord Brahma and represents the infinite knowledge of the cosmos. It enhances intellectual abilities, creativity, and spiritual awakening. This bead is beneficial for researchers, scientists, scholars, and those seeking ultimate wisdom and enlightenment.",
    price: 75000,
    image: [
      "https://example.com/20-mukhi-1.jpg",
      "https://example.com/20-mukhi-2.jpg"
    ],
    stock: 1,
    category: ["Rudraksha"]
  }
    ],
  });

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
