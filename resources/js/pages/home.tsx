import { Head } from '@inertiajs/react';
import Faq from '@/components/Faq';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import {
    ContactCta,
    Description,
    FxBlueHeader,
    FxBlueWidget,
    Installation,
    PricingBanner,
    Results,
    ResultsHeader,
    SuccessKeys,
    Testimonials,
    WhyChoose,
} from '@/components/Sections';
import type { Review } from '@/components/Sections';
import { FanBand, TiltBand } from '@/components/Shape';

type Props = {
    reviews: Review[];
};

export default function Home({ reviews }: Props) {
    return (
        <>
            <Head title="Tradivo Magic EA V12 — Advanced Gold & BTC Expert Advisor for MT5">
                <meta
                    name="description"
                    content="Tradivo Magic EA V12 — automated XAUUSD & BTCUSD trading on MT5 with HTF trend filtering, counter-trend grid execution, recovery protection, and smart basket profit targeting."
                />
            </Head>
            <Header />
            <main className="flex-1 bg-black">
                <Hero />
                <SuccessKeys />
                <TiltBand />
                <Description />
                <ResultsHeader source="Myfxbook V3.9" />
                <Results />
                <WhyChoose />
                <FanBand />
                <PricingBanner />
                <Pricing />
                <FanBand />
                <Installation />
                <FxBlueHeader />
                <FxBlueWidget />
                <FanBand />
                <PricingBanner />
                <Pricing />
                <FanBand />
                <Faq />
                <Testimonials reviews={reviews} />
                <ContactCta />
                <TiltBand />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}
