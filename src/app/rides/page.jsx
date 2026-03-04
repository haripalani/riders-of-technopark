import React from 'react';
import RidesView from '../../components/RidesView';

export const metadata = {
    title: 'Rides Archive',
    description: 'Relive every mile. Explore the complete collection of Riders of Technopark adventures, from weekend sprints to cross-country expeditions.',
    alternates: {
        canonical: '/rides',
    },
};

export default function Page() {
    return <RidesView />;
}

