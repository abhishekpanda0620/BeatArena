"use client";

import { useEffect, useRef, useState } from 'react';

interface AudioAnalyzerData {
    frequencyData: Uint8Array;
    waveformData: Uint8Array;
    isInitialized: boolean;
}

export function useAudioAnalyzer(audioElement: HTMLAudioElement | null, isPlaying: boolean = true) {
    const [analyzerData, setAnalyzerData] = useState<AudioAnalyzerData>({
        frequencyData: new Uint8Array(0),
        waveformData: new Uint8Array(0),
        isInitialized: false,
    });

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!audioElement) return;

        // Initialize Audio Context and Analyser
        const initializeAudio = () => {
            try {
                // Create AudioContext if it doesn't exist
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
                }

                const audioContext = audioContextRef.current;

                // Create AnalyserNode if it doesn't exist
                if (!analyserRef.current) {
                    analyserRef.current = audioContext.createAnalyser();
                    analyserRef.current.fftSize = 256; // 128 frequency bins
                    analyserRef.current.smoothingTimeConstant = 0.8;
                }

                // Create source node if it doesn't exist
                if (!sourceRef.current) {
                    sourceRef.current = audioContext.createMediaElementSource(audioElement);
                    sourceRef.current.connect(analyserRef.current);
                    analyserRef.current.connect(audioContext.destination);
                }

                const bufferLength = analyserRef.current.frequencyBinCount;
                const frequencyData = new Uint8Array(bufferLength);
                const waveformData = new Uint8Array(bufferLength);

                setAnalyzerData({
                    frequencyData,
                    waveformData,
                    isInitialized: true,
                });

            } catch (error) {
                console.error('Error initializing audio analyzer:', error);
            }
        };

        // Initialize on first play
        const handlePlay = () => {
            if (!analyzerData.isInitialized) {
                initializeAudio();
            }
            // Resume AudioContext if suspended
            if (audioContextRef.current?.state === 'suspended') {
                audioContextRef.current.resume();
            }
        };

        audioElement.addEventListener('play', handlePlay);

        return () => {
            audioElement.removeEventListener('play', handlePlay);
        };
    }, [audioElement, analyzerData.isInitialized]);

    // Animation loop to update frequency data
    useEffect(() => {
        if (!analyserRef.current || !isPlaying || !analyzerData.isInitialized) {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            return;
        }

        const updateData = () => {
            if (analyserRef.current) {
                const frequencyData = new Uint8Array(analyserRef.current.frequencyBinCount);
                const waveformData = new Uint8Array(analyserRef.current.frequencyBinCount);

                analyserRef.current.getByteFrequencyData(frequencyData);
                analyserRef.current.getByteTimeDomainData(waveformData);

                setAnalyzerData({
                    frequencyData,
                    waveformData,
                    isInitialized: true,
                });
            }

            animationFrameRef.current = requestAnimationFrame(updateData);
        };

        updateData();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isPlaying, analyzerData.isInitialized]);

    return analyzerData;
}
