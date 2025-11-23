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
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
            <Card className="p-8 bg-neutral-900 border-neutral-800 text-center max-w-md w-full space-y-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                    Select Music Language
                </h1>
                
                <div className="grid grid-cols-1 gap-4">
                    <Button 
                        onClick={() => handleLanguageSelect('en')} 
                        disabled={isLoading}
                        className="h-16 text-xl bg-blue-600 hover:bg-blue-700 transition-all"
                    >
                        {isLoading ? "Loading..." : "English 🇬🇧"}
                    </Button>
                    
                    <Button 
                        onClick={() => handleLanguageSelect('hi')} 
                        disabled={isLoading}
                        className="h-16 text-xl bg-orange-600 hover:bg-orange-700 transition-all"
                    >
                        {isLoading ? "Loading..." : "Hindi 🇮🇳"}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
