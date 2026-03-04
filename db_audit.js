import mongoose from 'mongoose';

// Define the exact schema used in the app (flexible version)
const ContentSchema = new mongoose.Schema({
    hero: Object,
    about: Object,
    features: Object,
    rides: Array,
    faq: Object,
    cta: Object,
    footer: Object
}, { timestamps: true, strict: false });

const MONGODB_URI = "mongodb+srv://harisami73_db_user:2zWnQDNQqQmHN1WM@ridersoftechnopark.vmwj2qw.mongodb.net/?appName=ridersoftechnopark";

async function audit() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        const Content = mongoose.model('Content', ContentSchema);

        const count = await Content.countDocuments();
        console.log(`Total documents in 'contents' collection: ${count}`);

        const allDocs = await Content.find().sort({ updatedAt: -1 });
        allDocs.forEach((doc, i) => {
            const data = doc.toObject();
            console.log(`\n--- Document ${i + 1} (ID: ${data._id}) ---`);
            console.log(`Updated At: ${data.updatedAt}`);
            console.log(`Keys: ${Object.keys(data).join(', ')}`);
            console.log(`Rides count: ${data.rides ? data.rides.length : 'MISSING'}`);
            if (data.rides && data.rides.length > 0) {
                console.log(`Sample ride title: ${data.rides[0].title}`);
            }
        });

        process.exit(0);
    } catch (error) {
        console.error('Audit failed:', error);
        process.exit(1);
    }
}

audit();
