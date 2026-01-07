"use client";

import { useAppData } from "@/hooks/useAppData";
import { Heatmap } from "@/components/Heatmap";
import { Obligations } from "@/components/Obligations";
import { XPHeader } from "@/components/XPHeader";
import { InstallButton } from "@/components/InstallButton";
import { Loader2 } from "lucide-react";

export default function Home() {
    const { data, toggleObligation } = useAppData();

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto space-y-8 pb-32">
            <header className="flex justify-between items-center py-4 border-b border-white/10">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tighter">
                        IMPERIO <span className="text-gold-500">2026</span>
                    </h1>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                        Millionaire Performance Protocol
                    </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 border-2 border-white/10" />
            </header>

            <XPHeader xp={data.xp} />

            <section>
                <Heatmap history={data.history} />
            </section>

            <section>
                <Obligations obligations={data.obligations} onToggle={toggleObligation} />
            </section>

            <footer className="text-center text-xs text-gray-700 py-12">
                <p>BUILT FOR DISCIPLINE. FORGED IN CODE.</p>
                <p className="mt-2 text-[10px] opacity-50">v1.0.0 // PIXEL FOLD OPTIMIZED</p>
            </footer>
            <InstallButton />
        </main>
    );
}
