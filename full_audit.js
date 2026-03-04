import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({}, { strict: false });
const MONGODB_URI = "mongodb+srv://harisami73_db_user:2zWnQDNQqQmHN1WM@ridersoftechnopark.vmwj2qw.mongodb.net/?appName=ridersoftechnopark";

async function audit() {
    try {
        await mongoose.connect(MONGODB_URI);
        const Content = mongoose.model('Content', ContentSchema, 'contents');
        const doc = await Content.findOne().sort({ updatedAt: -1 }).lean();

        if (!doc || !doc.rides) {
            console.log('No rides found');
            process.exit(0);
        }

        console.log(`Total Rides: ${doc.rides.length}`);
        doc.rides.forEach((ride, i) => {
            console.log(`${i + 1}. ID: ${ride.id} | Title: ${ride.title} | Date: ${ride.date}`);
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

audit();
