import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Play, Headphones } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

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
          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
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
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 text-lg shadow-lg shadow-purple-900/20">
                  Play Solo
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Multiplayer Mode Card */}
          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
             <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-sm font-bold border border-yellow-500/50">
                    Coming Soon
                </span>
             </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white group-hover:text-blue-400 transition-colors">
                <Users className="w-6 h-6" />
                Multiplayer
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Battle friends in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center">
                 <Music className="w-16 h-16 text-neutral-700 group-hover:text-blue-500 transition-all duration-300 transform group-hover:scale-110" />
              </div>
              <Button disabled className="w-full bg-neutral-800 text-neutral-500 font-bold py-6 text-lg">
                Create Room
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
