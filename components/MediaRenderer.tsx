// Helper component to render media (images or videos)
export function MediaRenderer({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
    const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');

    if (isVideo) {
        return (
            <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className={className}
            />
        );
    }

    return <img src={src} alt={alt} className={className} />;
}
