import mongoose from 'mongoose';
import { siteContent } from '../data/content.js';

const MONGODB_URI = "mongodb+srv://harisami73_db_user:2zWnQDNQqQmHN1WM@ridersoftechnopark.vmwj2qw.mongodb.net/?appName=ridersoftechnopark";

const ContentSchema = new mongoose.Schema({
    hero: Object,
    about: Object,
    features: Object,
    rides: Array,
    faq: Object,
    cta: Object,
    footer: Object
}, { timestamps: true, strict: false });

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

async function migrate() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        console.log('Clearing existing content...');
        await Content.deleteMany({});

        console.log('Inserting new content...');
        console.log('Rides to insert:', siteContent.rides?.length || 0);

        const result = await Content.create(siteContent);
        console.log('Created document keys:', Object.keys(result.toObject()));

        console.log('Migration successful!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
