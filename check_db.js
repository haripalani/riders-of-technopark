const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://harisami73_db_user:2zWnQDNQqQmHN1WM@ridersoftechnopark.vmwj2qw.mongodb.net/?appName=ridersoftechnopark";

async function checkData() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db('test'); // Check if it's 'test' or 'ridersoftechnopark'
        const collection = database.collection('contents'); // Mongoose usually plurals

        const contents = await collection.find({}).toArray();
        console.log('Documents found:', contents.length);
        if (contents.length > 0) {
            const first = contents[0];
            console.log('Rides type:', typeof first.rides);
            console.log('Rides value preview:', JSON.stringify(first.rides).substring(0, 100));

            if (typeof first.rides === 'string') {
                console.log('Rides IS A STRING. Attempting to parse...');
                try {
                    const parsed = JSON.parse(first.rides);
                    console.log('Parsed successfully. Length:', parsed.length);
                } catch (e) {
                    console.log('Failed to parse rides string:', e.message);
                }
            }
        }

    } finally {
        await client.close();
    }
}

checkData();
