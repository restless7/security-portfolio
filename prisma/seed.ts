import { PrismaClient } from '@prisma/client';
import { mockVoters, mockInteractions, mockCampaigns, mockUsers } from '../app/operaciones/lib/mockData';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Seed Users
    for (const user of mockUsers) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }

    // Seed Voters
    // We need to batch this because there are 2500 voters
    console.log(`Seeding ${mockVoters.length} voters...`);

    // Use transaction/createMany for speed if possible, but location is Json
    // Voter model: location Json

    // Clean first to avoid duplicates if re-running
    await prisma.interaction.deleteMany();
    await prisma.voter.deleteMany();
    await prisma.campaign.deleteMany();

    await prisma.voter.createMany({
        data: mockVoters.map(v => ({
            id: v.id,
            externalId: v.externalId,
            namePseudo: v.namePseudo,
            age: v.age,
            gender: v.gender,
            address: v.address,
            neighborhood: v.neighborhood,
            location: v.location as any, // Json
            tags: v.tags,
            intentionScore: v.intentionScore,
            lastContact: v.lastContact ? new Date(v.lastContact) : null,
            phoneNumber: v.phoneNumber,
            email: v.email,
            consentFlag: v.consentFlag,
            createdAt: new Date(v.createdAt),
            updatedAt: new Date(v.updatedAt),
        }))
    });

    // Seed Interactions
    console.log(`Seeding ${mockInteractions.length} interactions...`);
    await prisma.interaction.createMany({
        data: mockInteractions.map(i => ({
            id: i.id,
            voterId: i.voterId,
            type: i.type,
            channel: i.channel,
            timestamp: new Date(i.timestamp),
            result: i.result,
            sentiment: i.sentiment,
            notes: i.notes,
            metadata: i.metadata as any,
            userId: i.userId,
            location: i.location as any,
            duration: i.duration,
        }))
    });

    // Seed Campaigns
    console.log(`Seeding ${mockCampaigns.length} campaigns...`);
    await prisma.campaign.createMany({
        data: mockCampaigns.map(c => ({
            id: c.id,
            name: c.name,
            description: c.description,
            startDate: new Date(c.startDate),
            endDate: c.endDate ? new Date(c.endDate) : null,
            status: c.status,
            targetArea: c.targetArea as any,
            createdAt: new Date(c.createdAt),
            updatedAt: new Date(c.updatedAt),
        }))
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
