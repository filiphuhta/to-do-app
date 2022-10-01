import React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native"
import { SIZES, FONTS, COLORS, SHADOW } from "../../constants"
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
    view: {
        ...SHADOW,
        width: '100%',
        maxWidth: 500,
        paddingVertical: 10,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.bgSecondary,
        marginBottom: 15
    },
    text: {
        ...FONTS.h2_semiBold,
        color: COLORS.accent,
        width: "100%",
        paddingBottom: 4
    },
    date: {
        fontSize: 14,
        color: COLORS.primary,
    },
    repeatText: {
        fontSize: 14,
        color: COLORS.primary,
    },
    textWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
    },
    delete: {
        position: "absolute",
        right: 10,
    }
})

export default function ListItem(props) {
    console.log(props.data);
    return (
        <Pressable style={styles.view}>
            <View style={styles.textWrapper}>
                <Text style={styles.text}>
                    {props.data.name}
                </Text>
                <Pressable onPress={() => props.deleteItem(props.index)} style={styles.delete}>
                    <Ionicons name="md-trash" size={24} color={COLORS.accent} />
                </Pressable>
            </View>
        </Pressable>
    )
}