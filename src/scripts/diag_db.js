import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function diag() {
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env.local');
        }
        console.log('Connecting...');
        await mongoose.connect(MONGODB_URI);
        const db = mongoose.connection.db;

        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        for (const colName of collections.map(c => c.name)) {
            const count = await db.collection(colName).countDocuments();
            console.log(`Collection ${colName} has ${count} documents.`);
            const docs = await db.collection(colName).find({}).toArray();
            docs.forEach(d => {
                console.log(`Doc in ${colName}: ID=${d._id}, Keys=${Object.keys(d)}`);
                if (d.hero) console.log(`  hero.backgroundImage: ${d.hero.backgroundImage}`);
                if (d.data && d.data.hero) console.log(`  data.hero.backgroundImage: ${d.data.hero.backgroundImage}`);
            });
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

diag();
