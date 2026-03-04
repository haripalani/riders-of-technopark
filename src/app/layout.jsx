import { Inter, Bebas_Neue, Oswald } from 'next/font/google';
import './globals.css';
import Cursor from '../components/Cursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });

export const metadata = {
    title: 'Riders of Technopark',
    description: 'Riders of Technopark',
    icons: {
        icon: [
            {
                url: '/assets/logo-black.svg',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/assets/logo-white.svg',
                media: '(prefers-color-scheme: dark)',
            },
            {
                url: '/assets/logo-white.svg',
            }
        ]
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${bebas.variable} ${oswald.variable} font-sans antialiased`}>
                <Cursor />
                {children}
            </body>
        </html>
    );
}
