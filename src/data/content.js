// Content management data structure
export const siteContent = {
    hero: {
        backgroundImage: "/assets/images/rot_image_1.jpg",
        tagline: "TECHIE BY PROFESSION — RIDER BY PASSION",
        title: "RIDERS OF TECHNOPARK",
        subtitle: "Where code meets the open road. Join the brotherhood."
    },
    about: {
        ridersImage: "/assets/images/1-iPhcn7uG.jpg",
        title: "THE BROTHERHOOD BEYOND CODE",
        description1: "R.O.T (Riders of Technopark) isn't just another weekend riding group. We're a disciplined community of IT professionals who found something more powerful than algorithms and deadlines — the raw freedom of the open road.",
        description2: "What started as casual Sunday rides has evolved into a structured brotherhood. We plan like engineers, ride like warriors, and build bonds that last beyond the highway.",
        stats: [
            { label: "COMMUNITY", value: "INCLUSIVE BROTHERHOOD" },
            { label: "SAFETY", value: "VERIFIED RIDERS" },
            { label: "PASSION", value: "PURE ADRENALINE" }
        ]
    },
    features: {
        title: "OUR CODE OF THE ROAD",
        subtitle: "These aren't just words. They're the foundation of who we are.",
        values: [
            {
                title: "DISCIPLINE",
                desc: "No reckless riding. No showboating. We ride smart, ride safe, ride together.",
                icon: "shield"
            },
            {
                title: "BROTHERHOOD",
                desc: "More than riders. We're family. We look out for each other on and off the road.",
                icon: "users"
            },
            {
                title: "PASSION",
                desc: "It's not about the bike brand or engine size. It's about the love for the ride.",
                icon: "wrench"
            },
            {
                title: "RESPECT",
                desc: "Respect the machine, the road, fellow riders, and the communities we ride through.",
                icon: "award"
            }
        ]
    },
    rides: [
        {
            id: 1,
            title: "Pullikanam",
            location: "Idukki",
            date: "16 March 2025",
            image: "/assets/images/Pulikanam-DpFA_jd-.jpg",
            type: "Hill Ride"
        },
        {
            id: 2,
            title: "Baremore",
            location: "Trivandrum",
            date: "19 March 2025",
            image: "/assets/images/Braemore-B7A-aAej.jpg",
            type: "Estate Ride"
        },
        {
            id: 3,
            title: "Ambanad",
            location: "Kollam",
            date: "14 June 2025",
            image: "/assets/images/Ambanad-DCPU8Y96.jpg",
            type: "Hill Ride"
        },
        {
            id: 4,
            title: "Kothayar",
            location: "Kanyakumari",
            date: "21 June 2025",
            image: "/assets/images/Kothayar-BOMA66BO.jpg",
            type: "Dam Visit"
        },
        {
            id: 5,
            title: "Mathammakulam",
            location: "Idukki",
            date: "13 July 2025",
            image: "/assets/images/Mathamakulam-awqAgfdj.jpg",
            type: "Offroad"
        },
        {
            id: 6,
            title: "AchanKovil",
            location: "Kollam",
            date: "26 July 2025",
            image: "/assets/images/Achankovil-DltstGuH.jpg",
            type: "Forest Ride"
        },
        {
            id: 7,
            title: "Kodaikanal",
            location: "Tamil Nadu",
            date: "15–17 August 2025",
            image: "/assets/images/Kodaikanal-BXXJc7TZ.jpg",
            type: "Stay Ride"
        },
        {
            id: 8,
            title: "Lemur",
            location: "Kanyakumari",
            date: "24 August 2025",
            image: "/assets/images/Lemur-C6NTv-Fo.jpg",
            type: "Sunset Ride"
        },
        {
            id: 9,
            title: "Bison Valley",
            location: "Munnar",
            date: "13–14 September 2025",
            image: "/assets/images/Bison_valley-DsxzIuez.png",
            type: "Offroad"
        },
        {
            id: 10,
            title: "Kappil",
            location: "Varkala",
            date: "28 September 2025",
            image: "/assets/images/Kappil-BZzJ-hNy.jpg",
            type: "Sunset Ride"
        },
        {
            id: 11,
            title: "Chai Pakoda, Kochi",
            location: "Kochi",
            date: "19 October 2025",
            image: "/assets/images/chai pakoda-JL-nmI57.png",
            type: "Breakfast Ride"
        },
        {
            id: 12,
            title: "Munroe Kayaking Island",
            location: "Kollam",
            date: "16 November 2025",
            image: "/assets/images/Munroe-DZVCLEOu.jpg",
            type: "Kayaking"
        },
        {
            id: 13,
            title: "Illikal Kallu",
            location: "Kottayam",
            date: "07 December 2025",
            image: "/assets/images/Illikal-6ngE2u3s.jpg",
            type: "Hill Ride"
        },
        {
            id: 14,
            title: "IBW 2025 - Panchgani, MH",
            location: "Maharashtra",
            date: "17 - 22 December 2025",
            image: "/assets/images/IBW_2025.jpg",
            type: "Upcoming"
        },
        {
            id: 15,
            title: "Thirumalai Kovil",
            location: "Tamil Nadu",
            date: "17 January 2026",
            image: "/assets/images/Thirumalai Kovil.webp",
            type: "Hill Ride"
        },
        {
            id: 16,
            title: "Pullikanam Trails",
            location: "Idukki",
            date: "01 February 2026",
            image: "/assets/images/Pulikanam_Trails.png",
            type: "Offroad"
        },
        {
            id: 17,
            title: "Thekkady Ride",
            location: "Idukki",
            date: "07–08 February 2026",
            image: "/assets/images/Thekkady Ride.jpg",
            type: "Stay Ride"
        },
        {
            id: 18,
            title: "Anniversary Ride (Thekkady)",
            location: "Idukki",
            date: "14–15 March 2026",
            image: "/assets/images/Anniversary.jpeg",
            type: "Upcoming"
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
        backgroundImage: "/assets/images/rot_image_2.jpg",
        title: "Ready to",
        titleAccent: "Ride?",
        subtitle: "Join our brotherhood of riders and experience the thrill of the open road",
        description: "Whether you're a seasoned rider or just starting your journey, there's a place for you in R.O.T.",
        buttonText: "Join The Ride",
        buttonUrl: "https://chat.whatsapp.com/ExQQpOF8Kun2HwdIHDVoN1",
        footerText: "Ride. Respect. Brotherhood."
    },
    footer: {
        tagline: "Kerala's Premier Tech Riders",
        description: "More than a riding club. We're a brotherhood of IT professionals who found freedom beyond the screen.",
        location: "Technopark Campus",
        city: "Trivandrum, Kerala",
        schedule: "Every even weekend",
        socialLinks: {
            instagram: "https://www.instagram.com/ridersoftechnopark/",
            facebook: "#",
            whatsapp: "https://chat.whatsapp.com/ExQQpOF8Kun2HwdIHDVoN1",
            email: "mailto:ridersoftechnopark@gmail.com",
            phone: "tel:+91xxxxxxxxxx"
        }
    }
};

// Helper functions for content management
export const loadContent = () => {
    if (typeof window === 'undefined') return siteContent;

    const saved = localStorage.getItem('rotContent');
    if (!saved) return siteContent;

    try {
        const savedContent = JSON.parse(saved);
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

export const fetchLiveContent = async () => {
    try {
        const response = await fetch('/api/content');
        if (!response.ok) throw new Error('Failed to fetch content');
        const data = await response.json();

        // Save to localStorage for offline fallback
        if (typeof window !== 'undefined') {
            localStorage.setItem('rotContent', JSON.stringify(data));
        }

        return data;
    } catch (error) {
        console.error('API Fetch Error:', error);
        return loadContent(); // Fallback to local
    }
};

export const saveLiveContent = async (content) => {
    try {
        const response = await fetch('/api/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        if (!response.ok) throw new Error('Failed to save content');
        const data = await response.json();

        // Update local storage as well
        if (typeof window !== 'undefined') {
            localStorage.setItem('rotContent', JSON.stringify(data));
        }

        return data;
    } catch (error) {
        console.error('API Save Error:', error);
        throw error;
    }
};

export const saveContent = (content) => {
    localStorage.setItem('rotContent', JSON.stringify(content));
};
