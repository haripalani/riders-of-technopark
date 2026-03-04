
import AboutClubView from '../../components/AboutClubView';

export const metadata = {
    title: 'About The Club',
    description: 'The story of Riders of Technopark. From code to the open road, discover our journey and brotherhood.',
    alternates: {
        canonical: '/about',
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
                name: 'About The Club',
                item: 'https://ridersoftechnopark.com/about'
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <AboutClubView />
        </>
    );
}
