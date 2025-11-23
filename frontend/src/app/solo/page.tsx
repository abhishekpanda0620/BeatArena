"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import SoloGame from "@/components/SoloGame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SoloPage() {
    const { startGame, setSongs, resetGame } = useGameStore();
    const [isLoading, setIsLoading] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Reset game state on mount to ensure fresh start
    useEffect(() => {
        resetGame();
        setGameStarted(false);
    }, [resetGame]);

    const handleLanguageSelect = async (language: string) => {
        setIsLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
            const response = await fetch(`${apiUrl}/api/songs/random?limit=5&language=${language}`);
            if (!response.ok) throw new Error('Failed to fetch songs');
            
            const data = await response.json();
            setSongs(data);
            startGame();
            setGameStarted(true);
        } catch (error) {
            console.error("Failed to load songs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (gameStarted) {
        return <SoloGame />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-xy z-0 pointer-events-none" />
            <Card className="p-8 bg-black/40 backdrop-blur-md border-white/10 text-center max-w-md w-full space-y-8 shadow-2xl shadow-purple-900/20 relative z-10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                    Select Music Language
                </h1>
                
                <div className="grid grid-cols-1 gap-4">
                    <Button 
                        onClick={() => handleLanguageSelect('en')} 
                        disabled={isLoading}
                        className="h-16 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02] border-0"
                    >
                        {isLoading ? "Loading..." : "English 🇬🇧"}
                    </Button>
                    
                    <Button 
                        onClick={() => handleLanguageSelect('hi')} 
                        disabled={isLoading}
                        className="h-16 text-xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-900/20 transition-all duration-300 hover:scale-[1.02] border-0"
                    >
                        {isLoading ? "Loading..." : "Hindi 🇮🇳"}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
