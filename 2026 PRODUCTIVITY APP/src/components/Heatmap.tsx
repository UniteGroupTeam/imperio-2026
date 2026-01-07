"use client";

import { eachDayOfInterval, endOfYear, format, isSameDay, startOfYear } from "date-fns";
import { cn } from "@/lib/utils";

interface HeatmapProps {
    history: Record<string, number>;
}

export function Heatmap({ history }: HeatmapProps) {
    const currentYear = new Date().getFullYear(); // 2026
    const start = startOfYear(new Date(currentYear, 0, 1));
    const end = endOfYear(new Date(currentYear, 0, 1));
    const days = eachDayOfInterval({ start, end });

    return (
        <div className="w-full p-4 glass-panel rounded-2xl border-onyx-800">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white tracking-widest uppercase">Consistency</h2>
                <span className="text-gold-500 font-mono text-sm">{currentYear}</span>
            </div>

            <div className="flex flex-wrap gap-1 justify-center">
                {days.map((day) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const intensity = history[dateKey] || 0; // 0 to 100

                    return (
                        <div
                            key={dateKey}
                            className={cn(
                                "w-2 h-2 rounded-[1px] transition-all duration-300",
                                intensity === 0 ? "bg-white/5" : "bg-gold-500 shadow-[0_0_5px_rgba(212,175,55,0.5)]"
                            )}
                            style={{
                                opacity: intensity === 0 ? 1 : Math.max(0.3, intensity / 100)
                            }}
                            title={`${dateKey}: ${intensity}%`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
