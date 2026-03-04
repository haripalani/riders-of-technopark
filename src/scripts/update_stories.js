import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://harisami73_db_user:2zWnQDNQqQmHN1WM@ridersoftechnopark.vmwj2qw.mongodb.net/rot_website?appName=ridersoftechnopark";

async function updateStories() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        const db = mongoose.connection.db;
        const collection = db.collection('content');

        const doc = await collection.findOne();
        if (!doc) {
            console.log('No content document found.');
            return;
        }

        const newStory = [
            {
                id: 1,
                title: "THE GENESIS",
                content: "It wasn't a boardroom meeting that started it all. It was a simple message in a corporate chat: 'Anyone up for a Sunday ride?' Four techies showed up. No egos, just engines.",
                image: "/assets/images/story/story_1.png",
                imageSide: "right"
            },
            {
                id: 2,
                title: "THE FIRST GEAR",
                content: "Our early rides were exploration. Finding hidden trails in the Western Ghats while discussing the latest framework updates. We realized the road speaks deeper than any code.",
                image: "/assets/images/story/story_2.png",
                imageSide: "left"
            },
            {
                id: 3,
                title: "THE CODE OF DISCIPLINE",
                content: "As we grew, we brought our engineer mindsets to the road. Precision in every turn. Safety in every mile. We aren't just riders; we're a disciplined, syncronized formation.",
                image: "/assets/images/story/story_3.png",
                imageSide: "right"
            },
            {
                id: 4,
                title: "THE R.O.T BROTHERHOOD",
                content: "Beyond the helmets, we found family. When a member's bike breaks down at 2 AM on a forest trail, 10 heads turn back. We never leave a brother behind. That's our core.",
                image: "/assets/images/story/story_4.png",
                imageSide: "left"
            },
            {
                id: 5,
                title: "TECHIE BY DAY, RIDER BY HEART",
                content: "Our helmets hide the faces of developers, architects, and designers. But the road doesn't care about your job title. It only cares about how you handle the next curve.",
                image: "/assets/images/story/story_5.png",
                imageSide: "right"
            },
            {
                id: 6,
                title: "THE NEVER-ENDING HIGHWAY",
                content: "With 300+ members and 1K+ Instagram followers, the journey has only just begun. The horizon is always calling, and our engines are always ready for the next adventure.",
                image: "/assets/images/story/story_6.png",
                imageSide: "left"
            }
        ];

        const newStats = [
            { label: "COMMUNITY", value: "300+ MEMBERS" },
            { label: "FOLLOWERS", value: "1K+ INSTAGRAM" },
            { label: "PASSION", value: "PURE ADRENALINE" }
        ];

        await collection.updateOne(
            { _id: doc._id },
            {
                $set: {
                    "about.story": newStory,
                    "about.stats": newStats
                }
            }
        );

        console.log('Story updated successfully in the database.');
        process.exit(0);
    } catch (error) {
        console.error('Update failed:', error);
        process.exit(1);
    }
}

updateStories();
