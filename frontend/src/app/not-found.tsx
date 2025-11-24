"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient-xy z-0 pointer-events-none" />
      <div className="z-10 w-full max-w-md">
        <Card className="p-8 bg-black/40 backdrop-blur-md border-white/10 text-center space-y-6 shadow-2xl shadow-red-900/20">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/50 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
            Page Not Found
          </h1>
          <p className="text-neutral-400">The page you are looking for does not exist or has been moved.</p>
          <Button
            onClick={() => router.push('/')}
            className="w-full h-12 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-[1.02]"
          >
            Go Home
          </Button>
        </Card>
      </div>
    </div>
  );
}
