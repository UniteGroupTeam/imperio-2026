import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { YearGrid } from './src/components/YearGrid';
import { Stats } from './src/components/Stats';
import { Obligations } from './src/components/Obligations';
import { startOfYear, differenceInDays } from 'date-fns';

// Mock Data
const INITIAL_OBLIGATIONS = [
    { id: '1', text: '5:00 AM Wake Up', type: 'critical', completed: false },
    { id: '2', text: 'Cold Shower', type: 'critical', completed: false },
    { id: '3', text: 'Deep Work (4h)', type: 'habit', completed: false },
    { id: '4', text: 'Workout', type: 'habit', completed: false },
    { id: '5', text: 'No Sugar', type: 'habit', completed: false },
];

export default function App() {
    const [obligations, setObligations] = useState(INITIAL_OBLIGATIONS);
    const [xp, setXP] = useState(1250);

    const toggleObligation = (id: string) => {
        setObligations(prev => prev.map(o => {
            if (o.id === id) {
                const newState = !o.completed;
                const points = o.type === 'critical' ? 50 : 10;
                setXP(curr => newState ? curr + points : curr - points);
                return { ...o, completed: newState };
            }
            return o;
        }));
    };

    const completedCount = obligations.filter(o => o.completed).length;

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#09090b" />
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>

                        {/* Header */}
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.title}>IMPERIO <Text style={styles.goldText}>2026</Text></Text>
                                <Text style={styles.subtitle}>PROTOCOL ACTIVATED</Text>
                            </View>
                            <View style={styles.xpBadge}>
                                <Text style={styles.xpText}>{xp} XP</Text>
                            </View>
                        </View>

                        {/* Year Grid Widget Area */}
                        <YearGrid />

                        {/* Stats Area */}
                        <Stats completedCount={completedCount} totalCount={obligations.length} />

                        {/* Tasks List */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>DAILY OBLIGATIONS</Text>
                                <Text style={styles.counter}>{completedCount}/{obligations.length}</Text>
                            </View>
                            <Obligations data={obligations} onToggle={toggleObligation} />
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#09090b',
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        gap: 32,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#ffffff',
        letterSpacing: -1,
    },
    goldText: {
        color: '#D4AF37',
    },
    subtitle: {
        color: '#52525b',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 2,
        marginTop: 4,
    },
    xpBadge: {
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.3)',
    },
    xpText: {
        color: '#D4AF37',
        fontWeight: '800',
        fontSize: 14,
    },
    section: {
        gap: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '800',
        fontStyle: 'italic',
    },
    counter: {
        color: '#52525b',
        fontSize: 12,
        fontWeight: '600',
        backgroundColor: '#18181b',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        overflow: 'hidden',
    },
});
