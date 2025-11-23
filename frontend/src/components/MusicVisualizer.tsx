"use client";

interface MusicVisualizerProps {
    isPlaying?: boolean;
}

export default function MusicVisualizer({ isPlaying = true }: MusicVisualizerProps) {
    const bars = Array.from({ length: 5 }, (_, i) => i);
    
    return (
        <div className="flex items-end justify-center gap-2 h-32">
            {bars.map((i) => (
                <div
                    key={i}
                    className={`w-3 bg-gradient-to-t from-purple-600 to-pink-500 rounded-full transition-all duration-300 ${
                        isPlaying ? 'animate-music-bar' : 'h-4'
                    }`}
                    style={{
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${0.6 + (i % 3) * 0.2}s`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes music-bar {
                    0%, 100% { height: 1rem; }
                    50% { height: 8rem; }
                }
                .animate-music-bar {
                    animation: music-bar ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
