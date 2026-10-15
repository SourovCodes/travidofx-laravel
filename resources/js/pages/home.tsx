import { Head } from '@inertiajs/react';
import Faq from '@/components/Faq';
import FloatingContactButtons from '@/components/FloatingContactButtons';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import type { PricingPackage } from '@/components/Pricing';
import {
    ContactCta,
    Description,
    Installation,
    PricingBanner,
    ProductGallery,
    Results,
    SuccessKeys,
    Testimonials,
    WhyChoose,
} from '@/components/Sections';
import type {
    GalleryGroups,
    HomepageContent,
    Review,
} from '@/components/Sections';
import { FanBand, TiltBand } from '@/components/Shape';

type Props = {
    content: HomepageContent;
    pricingPackages: PricingPackage[];
    reviews: Review[];
    gallery: GalleryGroups;
};

export default function Home({
    content,
    pricingPackages,
    reviews,
    gallery,
}: Props) {
    return (
        <>
            <Head title="Tradivo Magic EA V12 — Advanced Gold Expert Advisor for MT5">
                <meta
                    name="description"
                    content="Tradivo Magic EA V12 — automated XAUUSD trading on MT5 with HTF trend filtering, counter-trend grid execution, recovery protection, and smart basket profit targeting."
                />
            </Head>
            <Header />
            <main className="flex-1 bg-black">
                <Hero content={content.hero} />
                <SuccessKeys content={content.successKeys} />
                <TiltBand />
                <Description content={content.description} />
                <Results content={content.results} />
                <WhyChoose content={content.whyChoose} />
                <FanBand />
                <PricingBanner content={content.pricingBanner} />
                <Pricing packages={pricingPackages} />
                <FanBand />
                <Installation content={content.installation} />
                <ProductGallery content={content.gallery} groups={gallery} />
                <FanBand />
                <Faq content={content.faq} />
                <Testimonials
                    content={content.testimonials}
                    reviews={reviews}
                />
                <ContactCta content={content.contact} />
                <TiltBand />
            </main>
            <Footer />
            <FloatingContactButtons />
        </>
    );
}
