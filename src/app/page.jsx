import React from 'react';
import HomeView from '../components/HomeView';

export const metadata = {
    title: 'Home',
    description: 'Welcome to Riders of Technopark, Kerala\'s premier brotherhood of techie riders. Explore our journeys, values, and community.',
    alternates: {
        canonical: '/',
    },
};

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Riders of Technopark',
        url: 'https://ridersoftechnopark.com',
        logo: 'https://ridersoftechnopark.com/assets/logo-white.svg',
        sameAs: [
            'https://www.instagram.com/ridersoftechnopark/',
        ],
        description: 'A disciplined community of IT professionals who found freedom beyond the screen through motorcycling.',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Trivandrum',
            addressRegion: 'Kerala',
            addressCountry: 'India'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HomeView />
        </>
    );
}

