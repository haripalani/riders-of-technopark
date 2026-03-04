import mongoose from 'mongoose';
import Content from './src/models/Content.js';

const MONGODB_URI = "mongodb+srv://harisami73_db_user:2zWnQDNQqQmHN1WM@ridersoftechnopark.vmwj2qw.mongodb.net/?appName=ridersoftechnopark";

async function check() {
    try {
        await mongoose.connect(MONGODB_URI);
        const content = await Content.findOne().sort({ updatedAt: -1 });
        console.log('--- DATABASE CONTENT KEYS ---');
        console.log(Object.keys(content.toObject()));
        console.log('--- RIDES TYPE ---');
        console.log(Array.isArray(content.rides) ? 'Array' : typeof content.rides);
        console.log('--- RIDES COUNT ---');
        console.log(content.rides ? content.rides.length : 'N/A');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

check();
