import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BarChart3, Activity } from 'lucide-react-native';

export function Stats({ completedCount, totalCount }: { completedCount: number, totalCount: number }) {
    // Mock weekly data
    const data = [65, 40, 75, 50, 85, 90, 60];
    const max = 100;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.labelContainer}>
                    <View style={styles.iconBox}>
                        <BarChart3 size={20} color="#D4AF37" />
                    </View>
                    <View>
                        <Text style={styles.title}>PERFORMANCE</Text>
                        <Text style={styles.subtitle}>Last 7 Days</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.bigStat}>82%</Text>
                    <Text style={styles.detail}>AVG INTENSITY</Text>
                </View>
            </View>

            <View style={styles.chart}>
                {data.map((val, i) => (
                    <View key={i} style={styles.barContainer}>
                        <View style={[styles.bar, { height: `${val}%` }, i === 6 && styles.activeBar]} />
                        <Text style={[styles.dayLabel, i === 6 && styles.activeLabel]}>
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Daily Progress */}
            <View style={styles.dailyRow}>
                <Activity size={20} color="#22c55e" />
                <View style={styles.progressContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Text style={styles.progressTitle}>Daily Target</Text>
                        <Text style={styles.progressValue}>{Math.round((completedCount / totalCount) * 100)}%</Text>
                    </View>
                    <View style={styles.track}>
                        <View style={[styles.fill, { width: `${(completedCount / totalCount) * 100}%` }]} />
                    </View>
                </View>
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        padding: 8,
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderRadius: 12,
    },
    title: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
    subtitle: {
        color: '#71717a',
        fontSize: 12,
    },
    bigStat: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '900',
    },
    detail: {
        color: '#52525b',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
    chart: {
        flexDirection: 'row',
        height: 120,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#27272a',
        paddingBottom: 16,
    },
    barContainer: {
        flex: 1,
        alignItems: 'center',
        gap: 8,
        height: '100%',
        justifyContent: 'flex-end',
    },
    bar: {
        width: '100%',
        backgroundColor: '#3f3f46',
        borderRadius: 4,
        minHeight: 4,
    },
    activeBar: {
        backgroundColor: '#D4AF37',
        shadowColor: "#D4AF37",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    dayLabel: {
        color: '#52525b',
        fontSize: 10,
        fontWeight: '700',
    },
    activeLabel: {
        color: '#D4AF37',
    },
    dailyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: 'rgba(39, 39, 42, 0.3)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#27272a',
    },
    progressContainer: {
        flex: 1,
    },
    progressTitle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    progressValue: {
        color: '#a1a1aa',
        fontSize: 12,
    },
    track: {
        height: 6,
        backgroundColor: '#27272a',
        borderRadius: 99,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: '#22c55e',
        borderRadius: 99,
    }
});
