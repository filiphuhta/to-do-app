import React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native"
import CheckBox from "expo-checkbox"
import { SIZES, FONTS, COLORS, SHADOW } from "../constants"
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
    view: {
        ...SHADOW,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        marginBottom: 15
    },
    text: {
        ...FONTS.h2_semiBold,
        color: COLORS.primary,
        width: "80%"
    },
    checkbox: {
        marginRight: 15
    },
    delete: {
        left: 10,
        width: "10%"
    }
})

export default function Card(props) {


    return <Pressable style={styles.view}>
        <CheckBox style={styles.checkbox}
            value={props.data.isSelected}
            onValueChange={(value) => props.setIsSelected(props.index, value)}
            color={COLORS.accent}
        />
        <Text style={{ ...styles.text, textDecorationLine: props.data.isSelected ? "line-through" : "none" }}>{props.data.text}</Text>
        <Pressable onPress={() => props.deleteItem(props.index)} style={styles.delete}>
            <Ionicons name="md-trash" size={24} color={COLORS.accent} />
        </Pressable>
    </Pressable>
}