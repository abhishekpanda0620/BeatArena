import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Play, Headphones } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-xy z-0 pointer-events-none" />

      <div className="z-10 max-w-4xl w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-in fade-in slide-in-from-bottom-4 duration-1000">
            BeatArena
          </h1>
          <p className="text-xl text-neutral-400 font-light tracking-wide">
            The Ultimate Multiplayer Music Quiz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Solo Mode Card */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer shadow-2xl shadow-purple-900/10 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white group-hover:text-purple-400 transition-colors">
                <Headphones className="w-6 h-6" />
                Solo Mode
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Test your knowledge against the clock.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center">
                 <Play className="w-16 h-16 text-neutral-700 group-hover:text-purple-500 transition-all duration-300 transform group-hover:scale-110" />
              </div>
              <Link href="/solo">
                <Button className="w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02]">
                  Play Solo
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Multiplayer Mode Card */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer shadow-2xl shadow-blue-900/10 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white group-hover:text-blue-400 transition-colors">
                <Users className="w-6 h-6" />
                Multiplayer
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Challenge friends and compete!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center">
                 <Music className="w-16 h-16 text-neutral-700 group-hover:text-blue-500 transition-all duration-300 transform group-hover:scale-110" />
              </div>
              <Link href="/multiplayer">
                <Button className="w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-900/20 transition-all duration-300 hover:scale-[1.02]">
                  Play Multiplayer
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
