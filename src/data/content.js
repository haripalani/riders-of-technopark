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
    ]
};

// Helper functions for localStorage management
export const loadContent = () => {
    if (typeof window === 'undefined') return siteContent;

    const saved = localStorage.getItem('rotContent');
    return saved ? JSON.parse(saved) : siteContent;
};

export const saveContent = (content) => {
    localStorage.setItem('rotContent', JSON.stringify(content));
};
