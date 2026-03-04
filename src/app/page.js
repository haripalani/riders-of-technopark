
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
        alternateName: 'R.O.T',
        url: 'https://ridersoftechnopark.com',
        logo: 'https://ridersoftechnopark.com/assets/logo-white.svg',
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Community Lead',
            areaServed: 'IN',
            availableLanguage: 'en'
        },
        sameAs: [
            'https://www.instagram.com/ridersoftechnopark/',
            'https://chat.whatsapp.com/L8f5dG7s4o1H1n9v6b5c4a'
        ],
        description: 'A disciplined community of IT professionals from Technopark, Trivandrum, united by a passion for motorcycling and brotherhood.',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Technopark Phase 1',
            addressLocality: 'Trivandrum',
            addressRegion: 'Kerala',
            postalCode: '695581',
            addressCountry: 'India'
        }
    };

    const websiteJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Riders of Technopark',
        url: 'https://ridersoftechnopark.com',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://ridersoftechnopark.com/rides?search={search_term_string}',
            'query-input': 'required name=search_term_string'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <HomeView />
        </>
    );
}

