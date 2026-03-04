
import RidesView from '../../components/RidesView';

export const metadata = {
    title: 'Rides Archive',
    description: 'Relive every mile. Explore the complete collection of Riders of Technopark adventures, from weekend sprints to cross-country expeditions.',
    alternates: {
        canonical: '/rides',
    },
};

export default function Page() {
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://ridersoftechnopark.com'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Rides Archive',
                item: 'https://ridersoftechnopark.com/rides'
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <RidesView />
        </>
    );
}

