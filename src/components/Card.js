import React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native"
import CheckBox from "expo-checkbox"
import { SIZES, FONTS, COLORS, SHADOW } from "../constants"
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
        backgroundColor: COLORS.secondary,
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
        marginLeft: 16,
        fontSize: 14,
        color: COLORS.primary,
    },
    checkbox: {
        marginRight: 15
    },
    textWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
    },
    delete: {
        position: "absolute",
        right: 30,
    }
})

export default function Card(props) {

    const getCurrentDate = (dueDate) => {
        const month = ["January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"];
        var date = new Date(dueDate).getDate();
        var monthName = month[new Date(dueDate).getMonth()];
        var year = new Date(dueDate).getFullYear();

        return monthName + ' ' + date + ' [' + year + ']';
    }
    const date = getCurrentDate(props.data.date);

    return <Pressable style={styles.view}>
        <CheckBox style={styles.checkbox}
            value={props.data.isSelected}
            onValueChange={(value) => props.setIsSelected(props.index, value)}
            color={COLORS.accent}
        />
        <View style={styles.textWrapper}>
            <Text style={{ ...styles.text, textDecorationLine: props.data.isSelected ? "line-through" : "none" }}>
                {props.data.text}
            </Text>
            <Pressable onPress={() => props.deleteItem(props.index)} style={styles.delete}>
                <Ionicons name="md-trash" size={24} color={COLORS.accent} />
            </Pressable>
            <Text style={{ ...styles.date, textDecorationLine: props.data.isSelected ? "line-through" : "none" }}>
                {date}
            </Text>
            <Text style={{ ...styles.repeatText, textDecorationLine: props.data.isSelected ? "line-through" : "none" }}>
                {props.data.daily ? "(Repeats daily)" : ""}
            </Text>

        </View>

    </Pressable>
}