import { useEffect, useRef, useState } from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down';
    as?: keyof React.JSX.IntrinsicElements;
};

export default function Reveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    as: As = 'div',
}: Props) {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const Tag = As as unknown as React.ElementType;

    return (
        <Tag
            ref={ref as React.Ref<HTMLElement>}
            className={`reveal ${direction === 'down' ? 'reveal-down' : ''} ${className}`}
            data-visible={visible ? 'true' : 'false'}
            style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
        >
            {children}
        </Tag>
    );
}
