import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your full name'],
        trim: true
    },
    dob: {
        type: Date,
        required: [true, 'Please provide your date of birth']
    },
    bloodGroup: {
        type: String,
        required: [true, 'Please specify your blood group']
    },
    company: {
        type: String,
        required: [true, 'Please provide your company name'],
        trim: true
    },
    designation: {
        type: String,
        required: [true, 'Please provide your professional designation'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide your WhatsApp number'],
        trim: true
    },
    emergencyContact: {
        name: {
            type: String,
            required: [true, 'Please provide an emergency contact name']
        },
        phone: {
            type: String,
            required: [true, 'Please provide an emergency contact number']
        }
    },
    motorcycle: {
        type: String,
        required: [true, 'Please specify your motorcycle model'],
        trim: true
    },
    experience: {
        type: String,
        required: [true, 'Please share your riding experience'],
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'joined', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Avoid re-compiling the model if it already exists
export default mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);
