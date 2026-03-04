import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Content from '../../../models/Content';

// Triggering HMR

export async function GET() {
    try {
        await dbConnect();

        // Fetch the first (most recent) content document
        const content = await Content.findOne().sort({ updatedAt: -1 }).lean();

        if (!content) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 });
        }

        return NextResponse.json(content);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST for updating content (for future admin use)
export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Remove immutable fields to prevent errors when updating
        if (body._id) delete body._id;
        if (body.createdAt) delete body.createdAt;
        if (body.updatedAt) delete body.updatedAt;
        if (body.__v !== undefined) delete body.__v;

        const content = await Content.findOneAndUpdate({}, body, {
            upsert: true,
            returnDocument: 'after'
        });

        return NextResponse.json(content);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
