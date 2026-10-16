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

export type ProductsLandingContent = {
    seo: {
        title: string;
        description: string;
    };
    hero: {
        badge: string;
        title: string;
        subtitle: string;
        paragraphs: string[];
        image: string | null;
        buttonLabel: string;
        buttonUrl: string;
    };
    whyChoose: {
        heading: string;
        items: string[];
    };
    consistency: {
        heading: string;
        intro: string;
        items: string[];
        note: string;
    };
    setup: {
        heading: string;
        steps: string[];
    };
    included: {
        heading: string;
        items: string[];
    };
    pricing: {
        heading: string;
        body: string;
        showPlans: boolean;
        buttonLabel: string;
        buttonUrl: string | null;
    };
    faq: {
        heading: string;
        items: { question: string; answer: string }[];
    };
    risk: {
        heading: string;
        body: string;
    };
    cta: {
        heading: string;
        body: string;
        buttonLabel: string;
        buttonUrl: string;
    };
};
