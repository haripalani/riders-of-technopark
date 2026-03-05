import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Registration from '../../../models/Registration';

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        // Basic validation
        const requiredFields = ['name', 'dob', 'bloodGroup', 'company', 'designation', 'phone', 'emergencyContact', 'motorcycle', 'experience'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Field ${field} is required` },
                    { status: 400 }
                );
            }
        }

        const registration = await Registration.create(body);

        return NextResponse.json(
            { message: 'Registration submitted successfully', id: registration._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { error: 'Failed to submit registration: ' + error.message },
            { status: 500 }
        );
    }
}
