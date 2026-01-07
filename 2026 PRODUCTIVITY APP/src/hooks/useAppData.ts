"use client";

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export type Obligation = {
    id: string;
    text: string;
    type: 'critical' | 'habit';
    completed: boolean;
};

export type AppData = {
    xp: number;
    history: Record<string, number>; // date "YYYY-MM-DD" -> intensity (0-100)
    obligations: Obligation[];
    lastLogin: string;
};

const DEFAULT_OBLIGATIONS: Obligation[] = [
    { id: '1', text: '5:00 AM Wake Up', type: 'critical', completed: false },
    { id: '2', text: 'Cold Shower', type: 'critical', completed: false },
    { id: '3', text: 'Deep Work (4h)', type: 'habit', completed: false },
    { id: '4', text: 'Workout', type: 'habit', completed: false },
    { id: '5', text: 'No Sugar', type: 'habit', completed: false },
];

export function useAppData() {
    const [data, setData] = useState<AppData | null>(null);

    // Load from local storage
    useEffect(() => {
        const stored = localStorage.getItem('imperio_data_v1');
        if (stored) {
            const parsed: AppData = JSON.parse(stored);
            // Reset obligations if new day
            const today = format(new Date(), 'yyyy-MM-dd');
            if (parsed.lastLogin !== today) {
                parsed.obligations = parsed.obligations.map(o => ({ ...o, completed: false }));
                parsed.lastLogin = today;
            }
            setData(parsed);
        } else {
            setData({
                xp: 0,
                history: {},
                obligations: DEFAULT_OBLIGATIONS,
                lastLogin: format(new Date(), 'yyyy-MM-dd'),
            });
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        if (data) {
            localStorage.setItem('imperio_data_v1', JSON.stringify(data));
        }
    }, [data]);

    const toggleObligation = (id: string) => {
        if (!data) return;
        const newObligations = data.obligations.map(o => {
            if (o.id === id) {
                return { ...o, completed: !o.completed };
            }
            return o;
        });

        // Calculate XP diff
        const obligation = data.obligations.find(o => o.id === id);
        let xpDiff = 0;
        if (obligation) {
            const isNowCompleted = !obligation.completed;
            const points = obligation.type === 'critical' ? 50 : 10;
            xpDiff = isNowCompleted ? points : -points;
        }

        // Update History (Heatmap)
        // Simple logic: % of completed tasks = intensity
        const totalTasks = newObligations.length;
        const completedTasks = newObligations.filter(o => o.completed).length;
        const intensity = Math.round((completedTasks / totalTasks) * 100);

        const today = format(new Date(), 'yyyy-MM-dd');
        const newHistory = { ...data.history, [today]: intensity };

        setData({
            ...data,
            obligations: newObligations,
            xp: Math.max(0, data.xp + xpDiff),
            history: newHistory,
        });
    };

    return { data, toggleObligation };
}
