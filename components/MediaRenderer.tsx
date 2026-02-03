// Helper component to render media (images or videos)
export function MediaRenderer({ src, alt = "", className = "", loop = true, onEnded }: { src: string; alt?: string; className?: string; loop?: boolean; onEnded?: () => void }) {
    const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');

    if (isVideo) {
        return (
            <video
                src={src}
                autoPlay
                muted
                loop={loop}
                playsInline
                className={className}
                onEnded={onEnded}
            />
        );
    }

    return <img src={src} alt={alt} className={className} />;
}
