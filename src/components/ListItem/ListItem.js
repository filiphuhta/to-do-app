import React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native"
import { SIZES, FONTS, COLORS, SHADOW } from "../../constants"
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
    view: {
        ...SHADOW,
        width: '47%',
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
        paddingBottom: 4,
        textAlign: 'center',
        textAlignVertical: "center"
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
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: 100,
        maxHeight: 300
    },
    delete: {
        position: "absolute",
        right: -10,
        top: -8,
    }
})

export default function ListItem(props) {
    const changeList  = () => {
        props.navigation.navigate("Current list");
    }
    return (
        <Pressable style={styles.view} onPress={changeList}>
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