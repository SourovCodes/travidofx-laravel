import type { Auth } from '@/types/auth';
import type { ContactLinks } from '@/types/contact';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            contact: ContactLinks;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
