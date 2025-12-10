// Content management data structure
export const siteContent = {
    hero: {
        backgroundImage: "https://images.unsplash.com/photo-1558981852-426c6c22a060?q=80&w=2070&auto=format&fit=crop",
        tagline: "TECHIE BY PROFESSION — RIDER BY PASSION",
        title: "RIDERS OF TECHNOPARK",
        subtitle: "Where code meets the open road. Join the brotherhood."
    },
    about: {
        ridersImage: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop",
        stats: [
            { label: "Active Riders", value: "250+" },
            { label: "Years Strong", value: "5+" },
            { label: "Rides Completed", value: "13" }
        ]
    },
    features: {
        title: "OUR CODE OF THE ROAD",
        subtitle: "These aren't just words. They're the foundation of who we are.",
        values: [
            {
                title: "DISCIPLINE",
                desc: "No reckless riding. No showboating. We ride smart, ride safe, ride together."
            },
            {
                title: "BROTHERHOOD",
                desc: "More than riders. We're family. We look out for each other on and off the road."
            },
            {
                title: "PASSION",
                desc: "It's not about the bike brand or engine size. It's about the love for the ride."
            },
            {
                title: "RESPECT",
                desc: "Respect the machine, the road, fellow riders, and the communities we ride through."
            }
        ]
    },
    rides: [
        {
            id: 1,
            title: "Munnar Highlands",
            location: "Kerala",
            date: "Jan 2025",
            image: "https://images.unsplash.com/photo-1596423736531-48d6849488db?q=80&w=800&auto=format&fit=crop",
            type: "Weekend Ride"
        },
        {
            id: 2,
            title: "Coastal Thunder",
            location: "Varkala",
            date: "Feb 2025",
            image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop",
            type: "Day Trip"
        },
        {
            id: 3,
            title: "Ghat Explorer",
            location: "Wayanad",
            date: "Mar 2025",
            image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?q=80&w=800&auto=format&fit=crop",
            type: "3 Days"
        },
        {
            id: 4,
            title: "Hill Station Run",
            location: "Kodaikanal",
            date: "Apr 2025",
            image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop",
            type: "Long Ride"
        }
    ],
    faq: {
        title: "Got Questions?",
        subtitle: "Everything you need to know about joining the R.O.T brotherhood",
        questions: [
            {
                id: 1,
                question: "Do I need to own a motorcycle to join R.O.T?",
                answer: "Not at all! While most of us ride, we welcome anyone passionate about motorcycles and the riding culture. You can join as an enthusiast, ride pillion with members, or work towards getting your own bike. Passion is the only requirement."
            },
            {
                id: 2,
                question: "What kind of rides do you organize?",
                answer: "We organize a variety of rides - from short weekend breakfast runs to multi-day interstate adventures. Our calendar includes coastal rides, hill station trips, heritage tours, and charity rides. Every ride is planned meticulously with safety as the top priority."
            },
            {
                id: 3,
                question: "Is there a specific bike brand or engine size requirement?",
                answer: "Absolutely not. Whether you ride a 100cc commuter or a 1000cc superbike, you're welcome. R.O.T is brand-agnostic. We believe in the spirit of riding, not the badge on your tank. Respect the machine, whatever it is."
            },
            {
                id: 4,
                question: "How do I join the club?",
                answer: "Start by attending one of our weekend rides or meet-ups at Technopark. Get to know the members, understand our code, and if you vibe with the brotherhood, you can officially join. We value quality over quantity, so we take time to build real connections."
            }
        ]
    },
    cta: {
        backgroundImage: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop",
        title: "READY TO RIDE",
        titleAccent: "WITH US?",
        subtitle: "The road is calling. The brotherhood is waiting.",
        description: "Based in Technopark, Trivandrum. We ride every weekend, explore every month, and build memories that last a lifetime.",
        buttonText: "JOIN THE BROTHERHOOD",
        footerText: "NO BIKE? NO PROBLEM. PASSION IS ALL YOU NEED."
    },
    footer: {
        tagline: "Kerala's Premier Tech Riders",
        description: "More than a riding club. We're a brotherhood of IT professionals who found freedom beyond the screen.",
        location: "Technopark Campus",
        city: "Trivandrum, Kerala",
        schedule: "Every Weekend",
        socialLinks: {
            instagram: "#",
            facebook: "#",
            email: "mailto:info@rot.com",
            phone: "tel:+91"
        }
    }
};

// Helper functions for localStorage management
export const loadContent = () => {
    if (typeof window === 'undefined') return siteContent;

    const saved = localStorage.getItem('rotContent');
    if (!saved) return siteContent;

    try {
        const savedContent = JSON.parse(saved);
        // Deep merge: ensure all new properties from siteContent exist
        return {
            hero: { ...siteContent.hero, ...savedContent.hero },
            about: { ...siteContent.about, ...savedContent.about },
            features: { ...siteContent.features, ...savedContent.features },
            rides: savedContent.rides || siteContent.rides,
            faq: {
                ...siteContent.faq,
                ...savedContent.faq,
                questions: savedContent.faq?.questions || siteContent.faq.questions
            },
            cta: { ...siteContent.cta, ...savedContent.cta },
            footer: {
                ...siteContent.footer,
                ...savedContent.footer,
                socialLinks: {
                    ...siteContent.footer.socialLinks,
                    ...(savedContent.footer?.socialLinks || {})
                }
            }
        };
    } catch (error) {
        console.error('Error loading content:', error);
        return siteContent;
    }
};

export const saveContent = (content) => {
    localStorage.setItem('rotContent', JSON.stringify(content));
};
