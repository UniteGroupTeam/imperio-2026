import withPWAInit from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/imperio-2026', // CRITICAL: This must match your GitHub Repository name
    images: {
        unoptimized: true,
    },
};

const withPWA = withPWAInit({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

export default withPWA(nextConfig);
