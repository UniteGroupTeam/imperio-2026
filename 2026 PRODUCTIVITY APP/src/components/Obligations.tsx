import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Check, Flame } from 'lucide-react-native';

type Obligation = {
    id: string;
    text: string;
    type: string;
    completed: boolean;
};

export function Obligations({ data, onToggle }: { data: Obligation[], onToggle: (id: string) => void }) {
    return (
        <View style={styles.container}>
            {data.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => onToggle(item.id)}
                    activeOpacity={0.7}
                    style={[styles.card, item.completed && styles.cardCompleted]}
                >
                    <View style={styles.row}>
                        <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
                            {item.completed && <Check size={14} color="#000" strokeWidth={4} />}
                        </View>
                        <View>
                            <Text style={[styles.text, item.completed && styles.textCompleted]}>
                                {item.text}
                            </Text>
                            <Text style={styles.type}>
                                {item.type === 'critical' ? 'CRITICAL PROTOCOL' : 'DAILY HABIT'}
                            </Text>
                        </View>
                    </View>
                    {item.type === 'critical' && !item.completed && (
                        <Flame size={16} color="#ef4444" />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    card: {
        backgroundColor: '#18181b', // Zinc 900
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#27272a',
    },
    cardCompleted: {
        backgroundColor: '#000',
        borderColor: '#27272a',
        opacity: 0.6,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#52525b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#D4AF37', // Gold
        borderColor: '#D4AF37',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    textCompleted: {
        color: '#71717a',
        textDecorationLine: 'line-through',
    },
    type: {
        color: '#52525b',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
        marginTop: 2,
    },
});
