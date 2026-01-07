"use client";

import { Check, AlertTriangle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Obligation } from "@/hooks/useAppData";

interface ObligationsProps {
    obligations: Obligation[];
    onToggle: (id: string) => void;
}

export function Obligations({ obligations, onToggle }: ObligationsProps) {
    const critical = obligations.filter(o => o.type === 'critical');
    const habits = obligations.filter(o => o.type === 'habit');

    return (
        <div className="space-y-6">
            {/* Critical Section */}
            <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-sm">
                    <ShieldAlert className="w-4 h-4" /> Non-Negotiable Protocol
                </h3>
                <div className="grid gap-3">
                    {critical.map(task => (
                        <TaskItem key={task.id} task={task} onToggle={onToggle} />
                    ))}
                </div>
            </div>

            {/* Habits Section */}
            <div className="space-y-3">
                <h3 className="text-gold-500/80 font-bold uppercase tracking-widest text-sm">
                    Standard Operations
                </h3>
                <div className="grid gap-3">
                    {habits.map(task => (
                        <TaskItem key={task.id} task={task} onToggle={onToggle} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function TaskItem({ task, onToggle }: { task: Obligation; onToggle: (id: string) => void }) {
    return (
        <div
            onClick={() => onToggle(task.id)}
            className={cn(
                "group flex items-center justify-between p-4 rounded-xl border border-white/5 cursor-pointer backdrop-blur-md transition-all duration-300",
                task.completed
                    ? "bg-gold-500/10 border-gold-500/30"
                    : "bg-onyx-900/50 hover:bg-onyx-800"
            )}
        >
            <span className={cn(
                "font-medium transition-colors",
                task.completed ? "text-gold-400" : "text-gray-300"
            )}>
                {task.text}
            </span>

            <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                task.completed
                    ? "bg-gold-500 border-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                    : "border-white/20 group-hover:border-white/40"
            )}>
                {task.completed && <Check className="w-4 h-4 text-black" strokeWidth={3} />}
            </div>
        </div>
    );
}
