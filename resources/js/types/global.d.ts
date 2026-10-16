import type { Auth } from '@/types/auth';
import type { ContactLinks, SocialLink } from '@/types/contact';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            contact: ContactLinks;
            socialLinks: SocialLink[];
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
