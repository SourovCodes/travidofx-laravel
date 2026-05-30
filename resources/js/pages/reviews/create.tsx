import { Head, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { Flash } from '@/types';

type ReviewForm = {
    name: string;
    email: string;
    title: string;
    rating: number;
    body: string;
    website: string;
};

export default function ReviewsCreate() {
    const { flash } = usePage<{ flash: Flash }>().props;
    const { data, setData, post, processing, errors, reset } =
        useForm<ReviewForm>({
            name: '',
            email: '',
            title: '',
            rating: 5,
            body: '',
            website: '',
        });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/reviews', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Submit a Review | Tradivo Magic EA V12" />
            <Header />
            <main
                className="flex-1 bg-black"
                style={{ paddingTop: 'var(--header-h)' }}
            >
                <section className="relative overflow-hidden py-16 md:py-24">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-shape/15 blur-3xl"
                    />
                    <div className="container-x grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                        <div>
                            <p className="eyebrow">Client Review</p>
                            <h1 className="section-title mt-4">
                                Share Your Tradivo Magic EA V12 Experience
                            </h1>
                            <p className="section-subtitle mt-4">
                                Submit your feedback here. It will go to the
                                approval panel first, then appear on the website
                                after approval.
                            </p>
                        </div>

                        <div className="rounded-md border border-white/10 bg-black/30 p-6 md:p-8">
                            <form onSubmit={submit} className="space-y-4">
                                <input
                                    type="text"
                                    name="website"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    className="hidden"
                                    aria-hidden="true"
                                    value={data.website}
                                    onChange={(e) =>
                                        setData('website', e.target.value)
                                    }
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field
                                        label="Name"
                                        required
                                        value={data.name}
                                        onChange={(v) => setData('name', v)}
                                        error={errors.name}
                                    />
                                    <Field
                                        label="Email"
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(v) => setData('email', v)}
                                        error={errors.email}
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
                                    <Field
                                        label="Short title"
                                        placeholder="Verified client"
                                        value={data.title}
                                        onChange={(v) => setData('title', v)}
                                        error={errors.title}
                                    />
                                    <label className="block">
                                        <span className="mb-2 block font-display text-xs font-semibold tracking-widest text-white/60 uppercase">
                                            Rating
                                            <span className="ml-0.5 text-shape">
                                                *
                                            </span>
                                        </span>
                                        <select
                                            value={data.rating}
                                            onChange={(e) =>
                                                setData(
                                                    'rating',
                                                    Number(e.target.value),
                                                )
                                            }
                                            className="w-full rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-shape focus:bg-white/[0.06]"
                                        >
                                            {[5, 4, 3, 2, 1].map((n) => (
                                                <option
                                                    key={n}
                                                    className="bg-black"
                                                    value={n}
                                                >
                                                    {n}{' '}
                                                    {n === 1 ? 'Star' : 'Stars'}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.rating && (
                                            <p className="mt-1 text-xs text-red-300">
                                                {errors.rating}
                                            </p>
                                        )}
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="mb-2 block font-display text-xs font-semibold tracking-widest text-white/60 uppercase">
                                        Review
                                        <span className="ml-0.5 text-shape">
                                            *
                                        </span>
                                    </span>
                                    <textarea
                                        rows={6}
                                        required
                                        minLength={20}
                                        maxLength={700}
                                        placeholder="Share your experience with Tradivo Magic EA V12..."
                                        value={data.body}
                                        onChange={(e) =>
                                            setData('body', e.target.value)
                                        }
                                        className="w-full rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-shape focus:bg-white/[0.06]"
                                    />
                                    {errors.body && (
                                        <p className="mt-1 text-xs text-red-300">
                                            {errors.body}
                                        </p>
                                    )}
                                </label>

                                {flash?.success && (
                                    <p className="rounded-md border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-100">
                                        {flash.success}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="btn-elementor w-full"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Submitting...'
                                        : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
}

function Field({
    label,
    type = 'text',
    required = false,
    placeholder,
    value,
    onChange,
    error,
}: {
    label: string;
    type?: 'text' | 'email';
    required?: boolean;
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    return (
        <label className="block">
            <span className="mb-2 block font-display text-xs font-semibold tracking-widest text-white/60 uppercase">
                {label}
                {required && <span className="ml-0.5 text-shape">*</span>}
            </span>
            <input
                type={type}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-shape focus:bg-white/[0.06]"
            />
            {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
        </label>
    );
}
