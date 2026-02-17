const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedNews() {
  try {
    console.log('🌱 Seeding news items...');

    const newsItems = [
      {
        content: 'Montessori + Reggio Emilia Inspired Learning — A unique blend of play-based and workstation-style education.',
        isActive: true,
        order: 1
      },
      {
        content: 'Explore Our Workstations! Art • Literacy • Science • Sensory • Math — hands-on learning at its best.',
        isActive: true,
        order: 2
      },
      {
        content: '✨ Registration Open for 2026–27! Give your child the best start—limited seats available. Enroll now and enjoy a special fee discount!',
        isActive: true,
        order: 3
      }
    ];

    for (const item of newsItems) {
      await prisma.news.create({
        data: item
      });
      console.log(`✅ Created news: ${item.content.substring(0, 50)}...`);
    }

    console.log('✨ News seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding news:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedNews();
