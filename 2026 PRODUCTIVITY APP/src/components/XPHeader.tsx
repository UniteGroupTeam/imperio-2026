"use client";

import { Trophy, Crown } from "lucide-react";

interface XPHeaderProps {
    xp: number;
}

export function XPHeader({ xp }: XPHeaderProps) {
    const level = Math.floor(xp / 300) + 1;
    const nextLevelXp = level * 300;
    const currentLevelStart = (level - 1) * 300;
    const progress = ((xp - currentLevelStart) / (nextLevelXp - currentLevelStart)) * 100;

    return (
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden mb-8 border-gold-500/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Crown className="w-32 h-32 text-gold-500" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="mb-2 text-gold-400 uppercase tracking-[0.2em] text-xs font-bold">
                    Current Status
                </div>
                <div className="text-5xl font-black text-white mb-2 flex items-center gap-3">
                    <span className="text-gold-500 text-6xl">{level}</span>
                    <span className="text-2xl text-gray-400 font-thin">/ EXECUTIVE</span>
                </div>

                <div className="w-full max-w-xs mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{xp} XP</span>
                        <span>{nextLevelXp} XP</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gold-500 shadow-[0_0_10px_#D4AF37]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
