import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { username: 'admin' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@abadalshams.com',
        password: hashedPassword,
        role: 'admin'
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@abadalshams.com');
    console.log('👤 Username: admin');
    console.log('🔑 Password: admin123');
    console.log('\n⚠️  Please change the password after first login!');
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
