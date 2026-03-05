import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Registration from '../../../../models/Registration';

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const exportAll = searchParams.get('export') === 'true';

        if (exportAll) {
            const allRegistrations = await Registration.find().sort({ createdAt: -1 });
            return NextResponse.json(allRegistrations);
        }

        const skip = (page - 1) * limit;

        const [registrations, total] = await Promise.all([
            Registration.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Registration.countDocuments()
        ]);

        return NextResponse.json({
            registrations,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        console.error('Admin Fetch Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch registrations' },
            { status: 500 }
        );
    }
}

// Handler for status updates or deletions
export async function PATCH(request) {
    try {
        await connectDB();
        const { id, status } = await request.json();

        const registration = await Registration.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!registration) {
            return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
        }

        return NextResponse.json(registration);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        await Registration.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
