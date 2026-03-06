import { Inter, Bebas_Neue, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });

export const metadata = {
    metadataBase: new URL('https://ridersoftechnopark.com'),
    title: {
        default: 'Riders of Technopark | Kerala\'s Premier Tech Riders Brotherhood',
        template: '%s | Riders of Technopark'
    },
    description: 'R.O.T (Riders of Technopark) is a disciplined community of IT professionals from Technopark, Trivandrum, united by a passion for motorcycling and brotherhood.',
    keywords: ['Riders of Technopark', 'ROT', 'Technopark Riders', 'Trivandrum Biking Club', 'Kerala Techie Riders', 'Motorcycle Brotherhood India'],
    authors: [{ name: 'Riders of Technopark' }],
    creator: 'Riders of Technopark',
    publisher: 'Riders of Technopark',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Riders of Technopark',
        description: 'Where code meets the open road. Join the premier techie riders brotherhood of Kerala.',
        url: 'https://ridersoftechnopark.com',
        siteName: 'Riders of Technopark',
        images: [
            {
                url: '/assets/images/rot_image_1.jpg',
                width: 1200,
                height: 630,
                alt: 'Riders of Technopark Brotherhood',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Riders of Technopark',
        description: 'Where code meets the open road. Join the premier techie riders brotherhood of Kerala.',
        images: ['/assets/images/rot_image_1.jpg'],
    },
    icons: {
        icon: [
            { url: '/assets/logo-black.svg', media: '(prefers-color-scheme: light)' },
            { url: '/assets/logo-white.svg', media: '(prefers-color-scheme: dark)' },
            { url: '/assets/logo-white.svg' }
        ],
        apple: [
            { url: '/assets/logo-white.svg' }
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${bebas.variable} ${oswald.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
