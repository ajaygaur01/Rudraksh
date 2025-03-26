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
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 5,
    category: ["Rudraksha"]
  },
  {
    name: "2 Mukhi Rudraksha",
    description: "The 2 Mukhi Rudraksha represents Ardhanarishvara, the union of Lord Shiva and Goddess Parvati. It symbolizes harmony, unity, and balance. This bead is believed to strengthen relationships, bring emotional stability, and enhance interpersonal bonds in both personal and professional life.",
    price: 3000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 20,
    category: ["Rudraksha"]
  },
  {
    name: "3 Mukhi Rudraksha",
    description: "The 3 Mukhi Rudraksha is associated with Lord Agni (Fire) and represents the past, present, and future. It is believed to cleanse sins from previous births, boost self-confidence, and help the wearer overcome stress, fear, and guilt. It is known for bringing clarity and peace of mind.",
    price: 2500,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 30,
    category: ["Rudraksha"]
  },
  {
    name: "4 Mukhi Rudraksha",
    description: "The 4 Mukhi Rudraksha is ruled by Lord Brahma, the creator of the universe. It enhances knowledge, creativity, and communication skills. This bead is highly beneficial for students, teachers, and professionals seeking wisdom and mental clarity. It also aids in self-expression and intellectual growth.",
    price: 1800,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 25,
    category: ["Rudraksha"]
  },
  {
    name: "5 Mukhi Rudraksha",
  description: "The 5 Mukhi Rudraksha is the most common bead and represents Lord Shiva in the form of Kalagni Rudra. It is known for bringing inner peace, spiritual growth, and mental clarity. This bead is widely used for meditation and helps regulate blood pressure, stress, and anxiety levels.",
    price: 1200,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 50,
    category: ["Rudraksha"]
  },
  {
    name: "6 Mukhi Rudraksha",
    description: "The 6 Mukhi Rudraksha is associated with Lord Kartikeya and enhances willpower, courage, and discipline. It is known for its ability to remove laziness and strengthen decision-making skills. This bead is beneficial for individuals seeking career growth and personal development.",
    price: 1800,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 22,
    category: ["Rudraksha"]
  },
  {
    name: "7 Mukhi Rudraksha",
    description: "The 7 Mukhi Rudraksha is ruled by Goddess Lakshmi, the deity of wealth and prosperity. It is believed to attract financial growth, remove hardships, and bring good fortune. This bead is ideal for business professionals and those seeking stability in their financial and personal life.",
    price: 4000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 18,
    category: ["Rudraksha"]
  },
  {
    name: "8 Mukhi Rudraksha",
    description: "The 8 Mukhi Rudraksha is ruled by Lord Ganesha, the remover of obstacles. This bead is believed to bring success, stability, and inner strength. It is highly beneficial for individuals facing hardships in their professional or personal life, helping them overcome challenges with wisdom and resilience.",
    price: 5500,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 15,
    category: ["Rudraksha"]
  },
  {
    name: "9 Mukhi Rudraksha",
    description: "The 9 Mukhi Rudraksha is associated with Goddess Durga and represents divine energy. It is known for bestowing power, fearlessness, and dynamism. Wearing this bead enhances one’s ability to face difficult situations and conquer negativity with confidence.",
    price: 7000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 12,
    category: ["Rudraksha"]
  },
  {
    name: "10 Mukhi Rudraksha",
    description: "The 10 Mukhi Rudraksha is ruled by Lord Vishnu and protects the wearer from negative energies and external influences. It is believed to provide peace of mind, resolve legal issues, and safeguard against malevolent forces.",
    price: 9000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 10,
    category: ["Rudraksha"]
  },
  {
    name: "11 Mukhi Rudraksha",
    description: "The 11 Mukhi Rudraksha is linked to Lord Hanuman and bestows immense physical and mental strength. It helps in enhancing self-discipline, willpower, and focus, making it highly beneficial for athletes, leaders, and spiritual practitioners.",
    price: 12000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 8,
    category: ["Rudraksha"]
  },
  {
    name: "12 Mukhi Rudraksha",
    description: "The 12 Mukhi Rudraksha is governed by Lord Surya (the Sun God) and enhances leadership qualities, confidence, and charisma. It is often worn by individuals in authoritative positions to gain success and command respect.",
    price: 15000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 6,
    category: ["Rudraksha"]
  },
  {
    name: "13 Mukhi Rudraksha",
    description: "The 13 Mukhi Rudraksha is associated with Lord Indra and Kamadeva. It is known to enhance charisma, attraction, and persuasive abilities. This bead is highly beneficial for individuals in leadership roles, public speaking, and those seeking success in relationships and career endeavors.",
    price: 18000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 5,
    category: ["Rudraksha"]
  },
  {
    name: "14 Mukhi Rudraksha",
    description: "The 14 Mukhi Rudraksha is known as Deva Mani and is considered one of the most powerful beads. It is believed to enhance intuition, decision-making abilities, and protection from negative influences. This bead is highly recommended for individuals in business, leadership, and those seeking spiritual awakening.",
    price: 25000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 4,
    category: ["Rudraksha"]
  },
  {
    name: "15 Mukhi Rudraksha",
    description: "The 15 Mukhi Rudraksha is associated with Lord Pashupatinath, a form of Lord Shiva. It is known to bring emotional balance, clarity of thoughts, and detachment from material desires. Wearing this bead helps in developing compassion, inner peace, and spiritual growth.",
    price: 30000,
  image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
  stock: 3,
    category: ["Rudraksha"]
  },
  {
    name: "16 Mukhi Rudraksha",
  description: "The 16 Mukhi Rudraksha is ruled by Lord Mahamrityunjaya Shiva and is considered a protector from untimely death and misfortunes. It is believed to bring immense strength, courage, and stability in life. This bead is ideal for those facing challenges, fear, and seeking divine protection.",
    price: 35000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 2,
    category: ["Rudraksha"]
  },
  {
  name: "17 Mukhi Rudraksha",
    description: "The 17 Mukhi Rudraksha is associated with Lord Vishwakarma and is known to bring wealth, fortune, and success in business endeavors. It helps the wearer in achieving their goals with determination and confidence. This bead is recommended for entrepreneurs and those seeking prosperity.",
    price: 45000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 2,
    category: ["Rudraksha"]
  },
  {
    name: "18 Mukhi Rudraksha",
    description: "The 18 Mukhi Rudraksha is ruled by Goddess Bhumi Devi, the Earth Goddess. It is known for its ability to bring stability, patience, and prosperity. This bead is beneficial for individuals involved in real estate, agriculture, or land-related businesses, ensuring long-term success and abundance.",
    price: 50000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 1,
    category: ["Rudraksha"]
  },
  {
    name: "19 Mukhi Rudraksha",
    description: "The 19 Mukhi Rudraksha is associated with Lord Narayana and is known for fulfilling desires and bestowing immense wealth. It enhances self-confidence, leadership skills, and provides divine grace to the wearer. This bead is ideal for individuals seeking recognition and financial stability.",
    price: 60000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 1,
    category: ["Rudraksha"]
  },
  {
    name: "20 Mukhi Rudraksha",
    description: "The 20 Mukhi Rudraksha is ruled by Lord Brahma and represents the infinite knowledge of the cosmos. It enhances intellectual abilities, creativity, and spiritual awakening. This bead is beneficial for researchers, scientists, scholars, and those seeking ultimate wisdom and enlightenment.",
    price: 75000,
    image: [
      "/images/Collections/Rudraksha/8Mukhi.webp",
      "/images/Collections/Rudraksha/8Mukhi.webp"
    ],
    stock: 1,
    category: ["Rudraksha"]
  },
  {
    name: "1 Mukhi Rudraksha Bracelet",
    description:
      "The 1 Mukhi Rudraksha Bracelet is ruled by Lord Shiva and symbolizes the attainment of supreme consciousness. It enhances focus, meditation, and spiritual enlightenment, and helps to overcome material desires.",
    price: 15000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 5,
    category: ["Bracelets"],
  },
  {
    name: "2 Mukhi Rudraksha Bracelet",
    description:
      "The 2 Mukhi Rudraksha Bracelet represents unity and harmony. Ruled by Lord Ardhanarishvara, it strengthens relationships, brings balance, and helps in overcoming duality.",
    price: 12000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 4,
    category: ["Bracelets"],
  },
  {
    name: "3 Mukhi Rudraksha Bracelet",
    description:
      "The 3 Mukhi Rudraksha Bracelet represents the trinity of Lord Agni. It helps in overcoming past karma, boosts confidence, and burns negativity from one’s aura.",
    price: 10000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 7,
    category: ["Bracelets"],
  },
  {
    name: "4 Mukhi Rudraksha Bracelet",
    description:
      "The 4 Mukhi Rudraksha Bracelet is ruled by Lord Brahma and enhances creativity, intelligence, and communication skills. It is ideal for students, writers, and professionals.",
    price: 9500,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 6,
    category: ["Bracelets"],
  },
  {
    name: "5 Mukhi Rudraksha Bracelet",
    description:
      "The 5 Mukhi Rudraksha Bracelet is ruled by Lord Kalagni and represents health and well-being. It helps in controlling blood pressure, improving focus, and bringing inner peace.",
    price: 5000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 10,
    category: ["Bracelets"],
  },
  {
    name: "6 Mukhi Rudraksha Bracelet",
    description:
      "The 6 Mukhi Rudraksha Bracelet is ruled by Lord Kartikeya. It enhances willpower, focus, and confidence. It is beneficial for students and those aiming for leadership roles.",
    price: 8000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 8,
    category: ["Bracelets"],
  },
  {
    name: "7 Mukhi Rudraksha Bracelet",
    description:
      "The 7 Mukhi Rudraksha Bracelet is ruled by Goddess Mahalakshmi. It brings prosperity, wealth, and success in ventures. It is ideal for those seeking financial stability.",
    price: 9500,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 7,
    category: ["Bracelets"],
  },
  // ... Add similar entries for 8-20 Mukhi Rudraksha Bracelets
  {
    name: "20 Mukhi Rudraksha Bracelet",
    description:
      "The 20 Mukhi Rudraksha Bracelet is ruled by Lord Brahma and represents the infinite knowledge of the cosmos. It enhances intellectual abilities, creativity, and spiritual awakening. This bead is beneficial for researchers, scientists, scholars, and those seeking ultimate wisdom and enlightenment.",
    price: 85000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 2,
    category: ["Bracelets"],
  },
  {
    name: "8 Mukhi Rudraksha Bracelet",
    description:
      "The 8 Mukhi Rudraksha Bracelet is ruled by Lord Ganesha and removes obstacles. It promotes success, wisdom, and new beginnings.",
    price: 12000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 6,
    category: ["Bracelets"],
  },
  {
    name: "9 Mukhi Rudraksha Bracelet",
    description:
      "The 9 Mukhi Rudraksha Bracelet is ruled by Goddess Durga. It empowers the wearer with energy, courage, and fearlessness.",
    price: 14000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 5,
    category: ["Bracelets"],
  },
  {
    name: "10 Mukhi Rudraksha Bracelet",
    description:
      "The 10 Mukhi Rudraksha Bracelet is ruled by Lord Vishnu. It protects the wearer from negative energies and brings peace and harmony.",
    price: 20000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 4,
    category: ["Bracelets"],
  },
  {
    name: "11 Mukhi Rudraksha Bracelet",
    description:
      "The 11 Mukhi Rudraksha Bracelet is ruled by Lord Hanuman. It provides protection, strength, and courage to overcome challenges.",
    price: 25000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 3,
    category: ["Bracelets"],
  },
  {
    name: "12 Mukhi Rudraksha Bracelet",
    description:
      "The 12 Mukhi Rudraksha Bracelet is ruled by Lord Surya. It brings fame, vitality, and leadership qualities to the wearer.",
    price: 30000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 4,
    category: ["Bracelets"],
  },
  {
    name: "13 Mukhi Rudraksha Bracelet",
    description:
      "The 13 Mukhi Rudraksha Bracelet is ruled by Lord Indra. It enhances charisma, confidence, and material wealth.",
    price: 35000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 2,
    category: ["Bracelets"],
  },
  {
    name: "14 Mukhi Rudraksha Bracelet",
    description:
      "The 14 Mukhi Rudraksha Bracelet is ruled by Lord Hanuman. It brings courage, clarity, and fearlessness.",
    price: 45000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 3,
    category: ["Bracelets"],
  },
  {
    name: "15 Mukhi Rudraksha Bracelet",
    description:
      "The 15 Mukhi Rudraksha Bracelet is ruled by Lord Pashupatinath. It helps with emotional balance, love, and compassion.",
    price: 50000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 2,
    category: ["Bracelets"],
  },
  {
    name: "16 Mukhi Rudraksha Bracelet",
    description:
      "The 16 Mukhi Rudraksha Bracelet is ruled by Lord Mahamrityunjaya. It protects against diseases, negativity, and misfortunes.",
    price: 60000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 2,
    category: ["Bracelets"],
  },
  {
    name: "17 Mukhi Rudraksha Bracelet",
    description:
      "The 17 Mukhi Rudraksha Bracelet is ruled by Lord Vishwakarma. It enhances creativity, success, and wealth.",
    price: 70000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 2,
    category: ["Bracelets"],
  },
  {
    name: "18 Mukhi Rudraksha Bracelet",
    description:
      "The 18 Mukhi Rudraksha Bracelet is ruled by Mother Earth. It brings stability, grounding, and prosperity.",
    price: 75000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 1,
    category: ["Bracelets"],
  },
  {
    name: "19 Mukhi Rudraksha Bracelet",
    description:
      "The 19 Mukhi Rudraksha Bracelet is ruled by Lord Narayan. It brings abundance, success, and fulfillment of desires.",
    price: 80000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 1,
    category: ["Bracelets"],
  },

  {
    name: "Tulsi Mala Bracelet",
    description:
      "The Tulsi Mala Bracelet is made from sacred Tulsi wood beads. It is believed to provide protection, spiritual growth, and peace of mind. It is widely worn for its religious significance and natural healing properties.",
    price: 700,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 20,
    category: ["Bracelets"],
  },
  {
    name: "Sphatik (Crystal) Bracelet",
    description:
      "The Sphatik Bracelet is made of natural crystal beads. It enhances mental clarity, calms the mind, and reduces stress. It is ideal for meditation and attracting positive energy.",
    price: 1500,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 15,
    category: ["Bracelets"],
  },
  {
    name: "Red Sandalwood Bracelet",
    description:
      "The Red Sandalwood Bracelet is known for its soothing fragrance and calming properties. It is often used for meditation and promoting inner peace.",
    price: 1200,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 18,
    category: ["Bracelets"],
  },
  {
    name: "Tiger Eye Stone Bracelet",
    description:
      "The Tiger Eye Stone Bracelet provides protection, courage, and confidence. It is a popular choice for those looking to overcome fears and boost their decision-making abilities.",
    price: 2500,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 12,
    category: ["Bracelets"],
  },
  {
    name: "Black Onyx Bracelet",
    description:
      "The Black Onyx Bracelet is a powerful stone for grounding and protection. It helps absorb negative energies and provides emotional strength.",
    price: 2200,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 15,
    category: ["Bracelets"],
  },
  {
    name: "Lava Stone Bracelet",
    description:
      "The Lava Stone Bracelet is made of porous volcanic rock beads. It promotes grounding, calming, and emotional balance. Essential oils can also be used with this bracelet for aromatherapy.",
    price: 1800,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 10,
    category: ["Bracelets"],
  },
  {
    name: "Green Aventurine Bracelet",
    description:
      "The Green Aventurine Bracelet is a stone of luck, prosperity, and new beginnings. It is a favorite among those seeking growth and opportunities in life.",
    price: 2800,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 10,
    category: ["Bracelets"],
  },
  {
    name: "Amethyst Stone Bracelet",
    description:
      "The Amethyst Bracelet is widely worn for its calming and healing properties. It helps in stress relief, improving focus, and enhancing spiritual awareness.",
    price: 3200,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 8,
    category: ["Bracelets"],
  },
  {
    name: "Navratna Bracelet",
    description:
      "The Navratna Bracelet consists of nine precious gemstones that represent the nine planets. It is believed to bring balance, prosperity, and protection to the wearer.",
    price: 8500,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 6,
    category: ["Bracelets"],
  },
  {
    name: "Rose Quartz Bracelet",
    description:
      "The Rose Quartz Bracelet is the stone of love and compassion. It enhances self-love, strengthens relationships, and promotes emotional healing.",
    price: 3000,
    image: [
      "/images/Collections/Rudraksha/bracelets.webp",
      "/images/Collections/Rudraksha/bracelets.webp",
    ],
    stock: 10,
    category: ["Bracelets"],
  },

  //.......................................//
  {
    name: "Ruby (Manik) Stone",
    description:
      "Ruby is associated with the Sun and is believed to enhance confidence, courage, and leadership qualities. It is also known for bringing prosperity and vitality to the wearer.",
    price: 12000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 10,
   category: ["StonesAndMalas"],
  },
  {
    name: "Blue Sapphire (Neelam) Stone",
    description:
      "Blue Sapphire is associated with Saturn and is believed to bring protection, wealth, and success to the wearer. It is a powerful gemstone for those seeking fast results.",
    price: 20000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 8,
   category: ["StonesAndMalas"],
  },
  {
    name: "Emerald (Panna) Stone",
    description:
      "Emerald is associated with Mercury and enhances intellect, communication skills, and creative expression. It is widely worn by professionals and students.",
    price: 15000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 12,
   category: ["StonesAndMalas"],
  },
  {
    name: "Yellow Sapphire (Pukhraj) Stone",
    description:
      "Yellow Sapphire is associated with Jupiter and is known to bring wisdom, prosperity, and marital bliss. It is often recommended for financial stability.",
    price: 18000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 9,
   category: ["StonesAndMalas"],
  },
  {
    name: "Red Coral (Moonga) Stone",
    description:
      "Red Coral is associated with Mars and is believed to enhance physical strength, courage, and vitality. It is often worn for overcoming obstacles.",
    price: 8000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 14,
   category: ["StonesAndMalas"],
  },
  {
    name: "Hessonite (Gomed) Stone",
    description:
      "Hessonite is associated with Rahu and is known for removing negative energies and boosting success in career and business.",
    price: 11000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 7,
   category: ["StonesAndMalas"],
  },
  {
    name: "Cat’s Eye (Lehsunia) Stone",
    description:
      "Cat’s Eye is associated with Ketu and is believed to bring protection, intuition, and spiritual enlightenment to the wearer.",
    price: 9000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 6,
   category: ["StonesAndMalas"],
  },
  {
    name: "Pearl (Moti) Stone",
    description:
      "Pearl is associated with the Moon and is known for enhancing emotional stability, peace of mind, and creativity.",
    price: 5000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 15,
   category: ["StonesAndMalas"],
  },
  {
    name: "Amethyst Stone",
    description:
      "Amethyst is a calming stone that aids in stress relief, mental clarity, and spiritual growth. It is ideal for meditation.",
    price: 3200,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 20,
   category: ["StonesAndMalas"],
  },
  {
    name: "Citrine Stone",
    description:
      "Citrine is known as the stone of abundance and positivity. It attracts wealth, success, and joy.",
    price: 3000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 18,
   category: ["StonesAndMalas"],
  },

  {
    name: "Tulsi Mala",
    description:
      "Tulsi Mala is considered sacred in Hinduism and is believed to provide spiritual upliftment, protection, and peace of mind.",
    price: 700,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 25,
  category: ["StonesAndMalas"],
  },
  {
    name: "Rudraksha Mala",
    description:
      "The Rudraksha Mala is made of sacred Rudraksha beads and is known for its spiritual and healing properties. It enhances focus and meditation.",
    price: 1200,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 20,
  category: ["StonesAndMalas"],
  },
  {
    name: "Sphatik Mala",
    description:
      "The Sphatik Mala is made of crystal beads and is widely used for meditation and spiritual growth. It brings calmness and clarity to the mind.",
    price: 1500,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 15,
  category: ["StonesAndMalas"],
  },
  {
    name: "Navratna Mala",
    description:
      "The Navratna Mala consists of nine precious stones representing the nine planets. It is believed to bring balance, prosperity, and good health.",
    price: 8500,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 6,
  category: ["StonesAndMalas"],
  },
  {
    name: "Sandalwood Mala",
    description:
      "The Sandalwood Mala is known for its soothing fragrance and is often used for meditation and spiritual practices.",
    price: 1000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 18,
  category: ["StonesAndMalas"],
  },
  {
    name: "Tiger Eye Mala",
    description:
      "The Tiger Eye Mala is known for its grounding properties and is believed to provide courage, focus, and clarity.",
    price: 2000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 10,
  category: ["StonesAndMalas"],
  },
  {
    name: "Lotus Seed Mala",
    description:
      "The Lotus Seed Mala is a symbol of purity and enlightenment. It is often used in meditation and chanting.",
    price: 900,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 22,
  category: ["StonesAndMalas"],
  },
  {
    name: "Lava Stone Mala",
    description:
      "The Lava Stone Mala is made of volcanic rock beads and is used for grounding and calming purposes. It is also great for aromatherapy.",
    price: 1800,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 12,
  category: ["StonesAndMalas"],
  },
  {
    name: "Chandan Mala",
    description:
      "The Chandan Mala is made from sandalwood beads and is highly valued for its spiritual benefits and calming effect.",
    price: 1300,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 20,
  category: ["StonesAndMalas"],
  },
  {
    name: "Rose Quartz Mala",
    description:
      "The Rose Quartz Mala is the stone of love and compassion. It is widely used for emotional healing and improving relationships.",
    price: 2500,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 10,
  category: ["StonesAndMalas"],
  },
  {
    name: "Rose Quartz Mala",
    description:
      "The Rose Quartz Mala is the stone of love and compassion. It is widely used for emotional healing and improving relationships.",
    price: 2500,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 10,
  category: ["StonesAndMalas"],
  },



  {
    name: "1 to 14 Mukhi combination(Indonesian beads)",
    description:
      "This 1 to 14 mukhi mala is made up of 16 different Mukhi Rudraksha beads such as 1 to 14 Mukhi, Gauri Shankar, and Ganesha Rudraksha beads.This combination mala is one of the most powerful mala combinations.",
    price: 14000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 10,
    category: ["Combination"],
  },
  {
    name: "1 - 14 Mukhi Rudraksha Mala combination - Nepali",
    description:
      "This 1 to 14 mukhi mala is made up of 16 different Mukhi Rudraksha beads such as 1 to 14 Mukhi, Gauri Shankar, and Ganesha Rudraksha beads.This combination mala is one of the most powerful mala combinations.",
    price: 99000,
    image: [
      "/images/Collections/Rudraksha/crystal.jpg",
      "/images/Collections/Rudraksha/crystal.jpg",
    ],
    stock: 10,
    category: ["Combination"],
  },
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
