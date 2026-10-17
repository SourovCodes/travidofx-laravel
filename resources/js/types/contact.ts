export type ContactLinks = {
    whatsapp: {
        number: string;
        url: string;
        message: string;
        chatUrl: string;
    };
    telegram: {
        url: string;
    };
};

export type SocialLink = {
    platform: string;
    label: string;
    url: string;
};

export type FooterContent = {
    paymentsHeading: string;
    heading: string;
    body: string;
    email: string;
};
