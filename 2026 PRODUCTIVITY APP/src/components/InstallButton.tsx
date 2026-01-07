"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if finding as standalone PWA
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

        // Check for iOS
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    if (isStandalone) return null;

    if (isIOS) {
        return (
            <div className="fixed bottom-4 left-4 right-4 bg-onyx-800/90 backdrop-blur border border-gold-500/30 p-4 rounded-xl z-50 animate-in slide-in-from-bottom-5">
                <p className="text-sm text-center text-gray-300">
                    To install: Tap <span className="text-gold-500 font-bold">Share</span> and then <span className="text-gold-500 font-bold">Add to Home Screen</span>
                </p>
            </div>
        );
    }

    if (!deferredPrompt) return null;

    return (
        <button
            onClick={handleInstall}
            className="fixed bottom-6 right-6 flex items-center gap-2 bg-gold-600 hover:bg-gold-500 text-black font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all animate-pulse-slow z-50"
        >
            <Download className="w-5 h-5" />
            INSTALL PROTOCOL
        </button>
    );
}
