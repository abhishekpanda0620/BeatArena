"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { DUMMY_SONGS } from "@/lib/dummyData";
import SoloGame from "@/components/SoloGame";

export default function SoloPage() {
    const { startGame, setSongs } = useGameStore();

    useEffect(() => {
        // In Phase 2, we will fetch from API here
        setSongs(DUMMY_SONGS);
        startGame();
    }, [setSongs, startGame]);

    return <SoloGame />;
}
