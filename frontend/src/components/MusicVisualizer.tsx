"use client";

export default function MusicVisualizer({ isPlaying = true }: { isPlaying?: boolean }) {
    // Create 64 bars for a denser, more premium look
    const bars = Array.from({ length: 64 }, (_, i) => i);
    
    return (
        <div className="w-full h-full flex items-end justify-center gap-[2px] px-4">
            {bars.map((i) => {
                // Randomize heights and animation delays for more organic feel
                const baseHeight = 10 + (i % 5) * 5;

                const delay = (i * 0.02) % 1;
                const duration = 0.4 + (i % 7) * 0.1;
                
                return (
                    <div
                        key={i}
                        className={`flex-1 max-w-[4px] rounded-t-sm transition-all duration-200 ${
                            isPlaying ? 'animate-music-bar' : ''
                        }`}
                        style={{
                            background: 'linear-gradient(to top, #7c3aed, #a855f7, #ec4899)',
                            height: isPlaying ? `${baseHeight}%` : '8px',
                            animationDelay: `${delay}s`,
                            animationDuration: `${duration}s`,
                            opacity: isPlaying ? 1 : 0.3,
                        }}
                    />
                );
            })}
            <style jsx>{`
                @keyframes music-bar {
                    0%, 100% { 
                        height: ${isPlaying ? '10%' : '8px'};
                        opacity: 0.6;
                    }
                    50% { 
                        height: ${isPlaying ? '90%' : '8px'};
                        opacity: 1;
                    }
                }
                .animate-music-bar {
                    animation: music-bar ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
