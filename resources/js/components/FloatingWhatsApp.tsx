const WHATSAPP_NUMBER = '14075617294';
const DEFAULT_MESSAGE = "Hi! I'd like to know more about Tradivo Magic EA V12.";

const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

export default function FloatingWhatsApp() {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="group fixed right-5 bottom-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
        >
            <span
                aria-hidden
                className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-60"
            />
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="relative"
                aria-hidden
            >
                <path d="M20.52 3.48A11.83 11.83 0 0 0 12.04 0C5.46 0 .1 5.36.1 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.47-8.41Zm-8.48 18.36h-.01a9.89 9.89 0 0 1-5.04-1.38l-.36-.21-3.72.98 1-3.62-.24-.37a9.86 9.86 0 0 1-1.51-5.3c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.04 7.01 2.9a9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.9-9.95 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.57-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
            </svg>
            <span className="pointer-events-none absolute right-full mr-3 translate-x-1 rounded-md bg-black/85 px-3 py-1.5 font-display text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                Chat on WhatsApp
            </span>
        </a>
    );
}
