const FILL = '#AE8348';
const TILT_DEFAULT_H = 70;
const FAN_DEFAULT_H = 36;

export function TiltBand({ height = TILT_DEFAULT_H }: { height?: number }) {
    return (
        <div
            className="relative w-full"
            style={{ height, background: 'transparent' }}
            aria-hidden
        >
            <svg
                viewBox="0 0 2600 131.1"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M0 0L2600 0 2600 69.1 0 0z" fill={FILL} />
                <path d="M0 0L2600 0 2600 69.1 0 69.1z" fill={FILL} opacity="0.5" />
                <path
                    d="M2600 0L0 0 0 130.1 2600 69.1z"
                    fill={FILL}
                    opacity="0.25"
                />
            </svg>
        </div>
    );
}

export function FanBand({ height = FAN_DEFAULT_H }: { height?: number }) {
    return (
        <div
            className="relative w-full"
            style={{ height, background: 'transparent' }}
            aria-hidden
        >
            <svg
                viewBox="0 0 283.5 19.6"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 0L0 18.8 141.8 4.1 283.5 18.8 283.5 0z"
                    fill={FILL}
                    opacity="0.33"
                />
                <path
                    d="M0 0L0 12.6 141.8 4 283.5 12.6 283.5 0z"
                    fill={FILL}
                    opacity="0.33"
                />
                <path
                    d="M0 0L0 6.4 141.8 4 283.5 6.4 283.5 0z"
                    fill={FILL}
                    opacity="0.33"
                />
                <path d="M0 0L0 1.2 141.8 4 283.5 1.2 283.5 0z" fill={FILL} />
            </svg>
        </div>
    );
}
