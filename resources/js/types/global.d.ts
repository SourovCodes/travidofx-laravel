import type { Auth } from '@/types/auth';
import type { ContactLinks, FooterContent, SocialLink } from '@/types/contact';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            contact: ContactLinks;
            socialLinks: SocialLink[];
            footer: FooterContent;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
