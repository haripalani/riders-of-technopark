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

const StorySchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    image: String,
    imageSide: { type: String, enum: ['left', 'right'], default: 'right' }
}, { _id: false });

const ContentSchema = new mongoose.Schema({
    _id: String,
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
        }],
        story: [StorySchema],
        storyCloser: {
            subtitle: String,
            title: String,
            footer: String
        }
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
}, { timestamps: true, strict: false, collection: 'content' });

// Force refresh of the model to avoid stale schemas in HMR
if (mongoose.models.Content) {
    delete mongoose.models.Content;
}

export default mongoose.model('Content', ContentSchema);
