import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function syncContent() {
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env.local');
        }
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        const { siteContent } = await import('../data/content.js');

        const db = mongoose.connection.db;
        const collection = db.collection('content');

        console.log('Wiping existing content documents...');
        await collection.deleteMany({});

        console.log('Syncing siteContent to database...');

        // Remove _id from siteContent if it exists to avoid conflicts
        const contentToSync = { ...siteContent };
        delete contentToSync._id;

        await collection.replaceOne(
            { _id: 'site-content' },
            contentToSync,
            { upsert: true }
        );

        console.log('Database synchronized successfully with src/data/content.js');
        process.exit(0);
    } catch (error) {
        console.error('Sync failed:', error);
        process.exit(1);
    }
}

syncContent();
