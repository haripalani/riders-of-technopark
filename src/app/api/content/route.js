import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '../../../lib/mongodb';
import Content from '../../../models/Content';

export async function GET() {
    try {
        await dbConnect();

        console.log("API GET -> DB:", mongoose.connection.name);

        // Try finding by _id string
        let content = await Content.findOne({ _id: 'site-content' }).lean();

        if (!content) {
            console.log("Mongoose findOne({_id: 'site-content'}) failed, trying broad findOne...");
            content = await Content.findOne().sort({ updatedAt: -1 }).lean();
        }

        if (!content) {
            console.log("Mongoose broad findOne failed, trying raw driver on 'content' collection...");
            content = await mongoose.connection.db.collection('content').findOne({ _id: 'site-content' });
            if (!content) {
                content = await mongoose.connection.db.collection('content').findOne();
            }
        }

        if (!content) {
            console.log("Raw driver failed on 'content', trying 'contents'...");
            content = await mongoose.connection.db.collection('contents').findOne();
        }

        if (!content) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 });
        }

        // Use dynamic import for ES module compatibility
        const { siteContent } = await import('../../../data/content');

        // Deep merge logic for About section (where new fields were added)
        const mergedAbout = {
            ...siteContent.about,
            ...content.about,
            story: (content.about?.story && content.about.story.length >= 6)
                ? content.about.story
                : siteContent.about.story,
            storyCloser: content.about?.storyCloser || siteContent.about.storyCloser
        };

        const mergedContent = {
            ...siteContent,
            ...content,
            about: mergedAbout
        };

        return NextResponse.json(mergedContent);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        const updateData = { ...body };
        if (updateData._id) delete updateData._id;
        if (updateData.createdAt) delete updateData.createdAt;
        if (updateData.updatedAt) delete updateData.updatedAt;
        if (updateData.__v !== undefined) delete updateData.__v;

        // Use raw driver for update to be safe
        const result = await mongoose.connection.db.collection('content').findOneAndUpdate(
            { _id: 'site-content' },
            { $set: updateData },
            { upsert: true, returnDocument: 'after' }
        );

        return NextResponse.json(result.value || result);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
