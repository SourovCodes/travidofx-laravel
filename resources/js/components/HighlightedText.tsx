import { Fragment } from 'react';

/**
 * Render admin-edited text where **wrapped** words are highlighted, keeping line breaks.
 */
export default function HighlightedText({
    text,
    highlightClassName,
}: {
    text: string;
    highlightClassName: string;
}) {
    return text.split('\n').map((line, lineIndex) => (
        <Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {line.split(/\*\*(.+?)\*\*/g).map((part, partIndex) =>
                partIndex % 2 === 1 ? (
                    <span key={partIndex} className={highlightClassName}>
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </Fragment>
    ));
}
