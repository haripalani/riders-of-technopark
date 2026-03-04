const mongoose = require('mongoose');
const uri = "mongodb+srv://harisami73_db_user:2zWnQDNQqQmHN1WM@ridersoftechnopark.vmwj2qw.mongodb.net/?appName=ridersoftechnopark";

async function checkData() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const Content = mongoose.models.Content || mongoose.model('Content', new mongoose.Schema({}, { strict: false }));

        const doc = await Content.findOne().lean();
        if (!doc) {
            console.log('No documents found in Content collection');
            return;
        }

        console.log('Document ID:', doc._id);
        console.log('Rides type:', typeof doc.rides);
        console.log('Is Rides array?', Array.isArray(doc.rides));

        if (typeof doc.rides === 'string') {
            console.log('Rides is a STRING. Value:', doc.rides.substring(0, 100));
        } else if (Array.isArray(doc.rides)) {
            console.log('Rides is an ARRAY. First element type:', typeof doc.rides[0]);
            console.log('First element:', JSON.stringify(doc.rides[0]));
        } else {
            console.log('Rides is neither string nor array. Type:', typeof doc.rides);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

checkData();
