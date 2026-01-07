import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { differenceInDays, startOfYear, endOfYear } from 'date-fns';

export function YearGrid() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const start = startOfYear(now);
    const end = endOfYear(now);
    const totalDays = differenceInDays(end, start) + 1;
    const daysPassed = differenceInDays(now, start);
    const percent = Math.min(100, Math.max(0, Math.round((daysPassed / totalDays) * 100)));
    const daysLeft = Math.max(0, totalDays - daysPassed);

    // We limit dots rendering for performance in RN if needed, but 365 Views is fine.
    const dots = Array.from({ length: totalDays });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.yearText}>2026</Text>
                <View style={styles.stats}>
                    <Text style={styles.daysLeft}>{daysLeft}d left</Text>
                    <Text style={styles.percent}>{percent}%</Text>
                </View>
            </View>

            <View style={styles.grid}>
                {dots.map((_, i) => {
                    const isPast = i < daysPassed;
                    const isToday = i === daysPassed;
                    return (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                isPast && styles.dotPast,
                                isToday && styles.dotToday
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#09090b',
        borderRadius: 32,
        padding: 24,
        borderWidth: 1,
        borderColor: '#27272a',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    yearText: {
        fontSize: 42,
        fontWeight: '300', // Thin elegant font
        color: '#ffffff',
        fontFamily: 'serif',
    },
    stats: {
        alignItems: 'flex-end',
    },
    daysLeft: {
        color: '#818cf8', // Indigo 400
        fontWeight: '700',
        fontSize: 16,
    },
    percent: {
        color: '#52525b',
        fontSize: 12,
        fontWeight: '600',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        justifyContent: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#18181b', // Zinc 900
    },
    dotPast: {
        backgroundColor: '#6366f1', // Indigo 500
    },
    dotToday: {
        backgroundColor: '#ffffff',
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 5,
        transform: [{ scale: 1.2 }],
    }
});
