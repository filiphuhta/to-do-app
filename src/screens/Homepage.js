import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Platform,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert
} from "react-native";
import { Card } from "../components";
import {
    COLORS,
    SIZES,
    FONTS,
    SHADOW
} from "../constants";
import CheckBox from "expo-checkbox";
import { setItem, setObjectItem, getObjectItem } from '../utils/storage';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
        width: "100%"
    },
    textBoxWrapper: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: SIZES.padding,
        borderRadius: SIZES.textBoxRadius,
        borderColor: COLORS.secondary,
        borderWidth: 2,
    },
    textInput: {
        ...SHADOW,
        borderRadius: SIZES.textBoxRadius,
        backgroundColor: COLORS.primary,
        height: 42,
        paddingLeft: 15,
        width: "100%",
        color: COLORS.secondary,
        ...FONTS.h2_semiBold,
        borderColor: COLORS.secondary,
        borderBottomWidth: 2,

    },
    btn: {
        ...SHADOW,
        borderColor: COLORS.secondary,
        borderWidth: 2,
        height: 42,
        width: "90%",
        borderRadius: SIZES.textBoxRadius,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 16,
        marginRight: 16
    },
    datePicker: {
        width: "45%",

    },
    checkBoxContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        padding: SIZES.padding,

    },
    checkBox: {
        marginLeft: 16
    },
    dateWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        padding: SIZES.padding
    }
})

export default function Homepage() {
    //State variables
    //let storedTasks;

    const [list, setList] = useState([]);
    const [value, setValue] = useState("");
    const [date, setDate] = useState(new Date());
    const [checkBox, setCheckBox] = useState(false);
    const _onDateChange = (e, newDate) => {
        setDate(newDate);
    };

    useEffect(() => {
        getObjectItem("tasks")
            .then(t => setList(t.item))
            .catch(e => { console.log(e) })
    }), [];

    const updateTasks = (list) => {

    }
    // A function that add data to the list array
    const addTask = (text, date, daily) => {
        let data = list ? list : [];
        if (value !== "") {
            data.push({ text: text, isSelected: false, date: date, daily: daily });
            setList(data); // Adding a JS Object
            setObjectItem("tasks", data);
            setValue("")
        } else {
            alert("Please type in something!")
        }
    }

    // A function that set the value of isSelected based on the state of the checkbox
    const setIsSelected = (index, value) => {
        let data = []
        // Making a deep copy of the list array
        for (let i = 0; i < list.length; i++) {
            if (index === i) {
                data.push({ ...list[i], isSelected: value }) // Updating the object at position i === index
            } else {
                data.push(list[i])
            }
        }

        setList(data);
        setObjectItem("tasks", data); // Setting the new state
    }

    // A function that delete an item at position idx from the list array
    const deleteItem = (idx) => {
        Alert.alert(
            "Delete task",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        const data = list.filter((item, index) => index !== idx);
                        setList(data);
                        setObjectItem("tasks", data);
                    }
                }
            ])
    }


    return <View style={styles.container}>
        <View style={styles.textBoxWrapper}>
            <TextInput
                style={styles.textInput}
                placeholder="New task"
                placeholderTextColor={COLORS.secondary}
                onChangeText={text => setValue(text)}
                value={value} />
            <View style={styles.checkBoxContainer}>
                <Text style={{
                    ...FONTS.h3_semiBold,
                    color: COLORS.secondary,
                }}>Repeat daily: </Text>
                <CheckBox
                    style={styles.checkBox}
                    value={checkBox}
                    onValueChange={(value) => setCheckBox(value)}
                    color={COLORS.secondary}
                />
            </View>
            <View style={styles.dateWrapper}>
                <Text style={{

                    ...FONTS.h3_semiBold,
                    color: COLORS.secondary,
                }}>Due date: </Text>
                <RNDateTimePicker
                    style={styles.datePicker}
                    mode="date"
                    onChange={_onDateChange}
                    value={date}
                    textColor="white" />
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => addTask(value, date, checkBox)}>
                <Text style={{ fontSize: 16, color: COLORS.secondary }}>Add task +</Text>
            </TouchableOpacity>
        </View>
        <View style={{
            marginTop: 20,
            borderBottomColor: COLORS.secondary,
            borderBottomWidth: 2,
        }}>
            <Text style={{

                ...FONTS.h1_semiBold,
                color: COLORS.secondary,
                marginBottom: 15,


            }}>Your tasks</Text>
        </View>
        <FlatList style={{ flex: 1, top: 10 }}
            data={list}
            renderItem={({ item, index }) => <Card data={item}
                index={index}
                setIsSelected={setIsSelected}
                deleteItem={deleteItem} />}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
}
