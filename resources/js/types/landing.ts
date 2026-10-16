import type { SocialLink } from '@/types/contact';

export type LandingColor =
    | 'blue'
    | 'green'
    | 'purple'
    | 'orange'
    | 'teal'
    | 'pink'
    | 'red'
    | 'slate';

export type LandingContactItem = {
    icon: string;
    color: LandingColor;
    title: string;
    subtitle: string;
    buttonLabel: string;
    url: string | null;
    copyValue: string | null;
};

export type LandingContent = {
    seo: {
        title: string;
        description: string;
    };
    header: {
        logo: string | null;
        brand: string;
        tagline: string;
    };
    hero: {
        badge: string;
        title: string;
        body: string;
        image: string | null;
        note: string;
        platformLabel: string;
        features: { icon: string; label: string }[];
    };
    contact: {
        heading: string;
        subtitle: string;
        items: LandingContactItem[];
    };
    about: {
        enabled: boolean;
        badge: string;
        title: string;
        body: string;
        tagline: string;
        image: string | null;
        features: {
            icon: string;
            color: LandingColor;
            title: string;
            subtitle: string;
        }[];
    };
    highlights: { icon: string; title: string; subtitle: string }[];
    footer: {
        tagline: string;
        socialLinks: SocialLink[];
    };
};
