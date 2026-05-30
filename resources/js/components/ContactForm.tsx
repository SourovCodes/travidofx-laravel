import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type FormData = {
    name: string;
    email: string;
    message: string;
    website: string;
};

export default function ContactForm() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm<FormData>({
        name: '',
        email: '',
        message: '',
        website: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-4 rounded-md border border-white/10 bg-black/30 p-6 md:p-7"
        >
            <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                value={data.website}
                onChange={(e) => setData('website', e.target.value)}
            />

            <Field
                label="Name"
                type="text"
                name="name"
                value={data.name}
                onChange={(v) => setData('name', v)}
                error={errors.name}
            />
            <Field
                label="Email"
                type="email"
                name="email"
                value={data.email}
                onChange={(v) => setData('email', v)}
                error={errors.email}
            />
            <Field
                label="Message"
                type="textarea"
                name="message"
                value={data.message}
                onChange={(v) => setData('message', v)}
                error={errors.message}
            />

            {recentlySuccessful && (
                <p className="rounded-md border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-100">
                    Thanks — your message has been sent.
                </p>
            )}

            <button
                type="submit"
                className="btn-elementor w-full"
                disabled={processing}
            >
                {processing ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
}

function Field({
    label,
    type,
    name,
    value,
    onChange,
    error,
}: {
    label: string;
    type: 'text' | 'email' | 'textarea';
    name: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    const shared =
        'w-full rounded-md bg-white/[0.04] border border-white/15 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-shape focus:bg-white/[0.06]';

    return (
        <label className="block">
            <span className="mb-2 block font-display text-xs font-semibold tracking-widest text-white/60 uppercase">
                {label}
                <span className="ml-0.5 text-shape">*</span>
            </span>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    rows={4}
                    required
                    className={shared}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    required
                    className={shared}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
            {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
        </label>
    );
}
