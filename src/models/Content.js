import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
    hero: {
        backgroundImage: String,
        tagline: String,
        title: String,
        subtitle: String
    },
    about: {
        ridersImage: String,
        title: String,
        description1: String,
        description2: String,
        stats: [{
            label: String,
            value: String
        }]
    },
    features: {
        title: String,
        subtitle: String,
        values: [{
            title: String,
            desc: String,
            icon: String
        }]
    },
    rides: [{
        id: Number,
        title: String,
        location: String,
        date: String,
        image: String,
        type: String
    }],
    faq: {
        title: String,
        subtitle: String,
        questions: [{
            id: Number,
            question: String,
            answer: String
        }]
    },
    cta: {
        backgroundImage: String,
        title: String,
        titleAccent: String,
        subtitle: String,
        description: String,
        buttonText: String,
        footerText: String
    },
    footer: {
        tagline: String,
        description: String,
        location: String,
        city: String,
        schedule: String,
        socialLinks: {
            instagram: String,
            facebook: String,
            email: String,
            phone: String
        }
    }
}, { timestamps: true, strict: false });

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);
