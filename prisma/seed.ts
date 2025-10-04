import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@blvkdot.ng';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMeNow_2025';
  const adminHash = await argon2.hash(adminPassword);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { 
      email: adminEmail, 
      password: adminHash, 
      role: 'ADMIN' 
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);

  // Create demo attendant
  const attendantEmail = 'attendant@blvkdot.ng';
  const attendantPassword = 'DemoAttendant2025!';
  const attendantHash = await argon2.hash(attendantPassword);

  const attendant = await prisma.user.upsert({
    where: { email: attendantEmail },
    update: {},
    create: { 
      email: attendantEmail, 
      password: attendantHash, 
      role: 'ATTENDANT' 
    },
  });

  console.log(`✅ Demo attendant created: ${attendant.email}`);

  // Create default campaign
  const campaign = await prisma.campaign.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Follow Us Promo',
      type: 'FOLLOW_US',
      status: 'ACTIVE',
      startsAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    },
  });

  console.log(`✅ Campaign created: ${campaign.name}`);

  // Generate sample promo codes
  const sampleCodes = [
    'BLVK-FOLLOW-001',
    'BLVK-FOLLOW-002', 
    'BLVK-FOLLOW-003',
    'BLVK-FOLLOW-004',
    'BLVK-FOLLOW-005',
  ];

  for (const code of sampleCodes) {
    await prisma.promoCode.upsert({
      where: { code },
      update: {},
      create: {
        code,
        campaignId: campaign.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    });
  }

  console.log(`✅ ${sampleCodes.length} sample codes created`);

  // Create some sample scan events
  const sampleScans = [
    { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)', deviceId: 'iphone-123' },
    { userAgent: 'Mozilla/5.0 (Android 10; Mobile)', deviceId: 'android-456' },
    { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', deviceId: 'desktop-789' },
  ];

  for (const scan of sampleScans) {
    await prisma.scanEvent.create({
      data: {
        campaignId: campaign.id,
        userAgent: scan.userAgent,
        deviceId: scan.deviceId,
        ipHash: 'sample-ip-hash',
      },
    });
  }

  console.log(`✅ ${sampleScans.length} sample scan events created`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📋 Login Credentials:');
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);
  console.log(`Attendant: ${attendantEmail} / ${attendantPassword}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });