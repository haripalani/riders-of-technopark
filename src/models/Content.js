import mongoose from 'mongoose';

const RideSchema = new mongoose.Schema({
    id: Number,
    title: String,
    location: String,
    date: String,
    image: String,
    type: String
}, { _id: false });

const QuestionSchema = new mongoose.Schema({
    id: Number,
    question: String,
    answer: String
}, { _id: false });

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
    rides: [RideSchema],
    faq: {
        title: String,
        subtitle: String,
        questions: [QuestionSchema]
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

// Force refresh of the model to avoid stale schemas in HMR
if (mongoose.models.Content) {
    delete mongoose.models.Content;
}

export default mongoose.model('Content', ContentSchema);
