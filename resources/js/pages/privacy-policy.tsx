import { Head } from '@inertiajs/react';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { TiltBand } from '@/components/Shape';

type Props = {
    privacyPolicyHtml: string;
};

export default function PrivacyPolicy({ privacyPolicyHtml }: Props) {
    return (
        <>
            <Head title="Privacy Policy | Tradivo FX Limited" />
            <Header />
            <main className="flex-1 bg-black pt-[var(--header-h)]">
                <section className="relative overflow-hidden bg-[#03002E] py-16 md:py-24">
                    <div className="container-x">
                        <p className="eyebrow">Tradivo FX Limited</p>
                        <h1 className="mt-4 font-display text-[clamp(2.3rem,4vw,4.4rem)] leading-tight font-medium text-white">
                            Privacy Policy
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                            How we collect, use, store, and protect information
                            across our website, products, support, payments, and
                            license systems.
                        </p>
                    </div>
                </section>

                <TiltBand />

                <section className="bg-black py-14 md:py-20">
                    <div className="container-x">
                        <article
                            className="mx-auto max-w-4xl rounded-md border border-white/10 bg-white/[0.035] p-6 text-[15px] leading-8 text-white/75 shadow-[0_24px_80px_-50px_rgba(174,131,72,0.65)] md:p-10 [&>*+*]:mt-6 [&_a]:text-shape [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-shape-soft [&_h1]:font-display [&_h1]:text-2xl [&_h1]:font-medium [&_h1]:text-white md:[&_h1]:text-3xl [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-white md:[&_h2]:text-3xl [&_h3]:pt-2 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-white md:[&_h3]:text-2xl [&_hr]:border-white/10 [&_li]:list-disc [&_li]:leading-7 [&_li]:marker:text-shape [&_strong]:font-semibold [&_strong]:text-white [&_ul]:space-y-3 [&_ul]:pl-5"
                            dangerouslySetInnerHTML={{
                                __html: privacyPolicyHtml,
                            }}
                        />
                    </div>
                </section>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
