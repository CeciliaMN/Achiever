import { Text, View, Image, TouchableWithoutFeedback, Keyboard, useColorScheme } from "react-native";
import { Link, useRouter } from "expo-router";
import ThemedView from "../../../components/ThemedView";
import UseAppStyles from "../../../components/UseAppStyles";
import ThemedText from "../../../components/ThemedText";
import Spacer from "../../../components/Spacer";
import ThemedButton from "../../../components/ThemedButton";
import { useUser } from "../../../hooks/useUser";
import ThemedLink from "../../../components/ThemedLink";
import { useEffect, useState } from "react";
import ThemedTextInput from "../../../components/ThemedTextInput";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Colors } from "../../../constants/Colors";

export default function NewTransaction() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const datePicketBgColor = theme.uiBackground;

    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();

    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    function add() {
        // TODO: add transaction to database
        // TODO: clear fields
        // TODO: success message 
    }

    function cancel() {
        // TODO: clear fields
        router.replace('/tracking');
    }

    function showDatePicker() {
        setDatePickerVisibility(true)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView
                safe={true}
                style={{
                    justifyContent: 'flex-start'
                }}>

                <View
                    style={[
                        styles.container,
                        {
                            flex: .8,
                            alignItems: 'center',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }
                    ]}>

                    <View
                        style={{
                            flex: .3,
                            width: '80%',
                            columnGap: '35%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent:'center'
                        }}>
                        <ThemedButton
                            text='Choose Date'
                            onPress={showDatePicker}
                        />

                        <ThemedText>{date.toLocaleDateString()}</ThemedText>
                    </View>


                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={date}
                        onConfirm={(selectedDate) => {
                            setDate(selectedDate);
                            setDatePickerVisibility(false);
                        }}
                        onCancel={() => setDatePickerVisibility(false)}
                    />

                    <ThemedTextInput
                        placeholder='Amount'
                        onChangeText={setAmount}
                        value={amount}
                        keyboardType='decimal-pad'
                        onBlur={() => setAmount(parseFloat(amount).toFixed(2))}
                    />
                    <Spacer height={15} />

                    <ThemedTextInput
                        placeholder='Description'
                        onChangeText={setDescription}
                        value={description}
                    />
                    <Spacer height={15} />

                    <ThemedTextInput
                        placeholder='Category'
                        onChangeText={setCategory}
                        value={category}
                    />
                    <Spacer height={15} />
                    <View
                    style={{
                        flex: .3,
                        flexDirection: 'row',
                        columnGap: 30,
                        alignItems: 'center'
                    }}>
                    <ThemedButton onPress={add} text='Add' />
                    <ThemedButton onPress={cancel} text='Cancel' />
                </View>
                </View>

                
            </ThemedView>
        </TouchableWithoutFeedback >
    )
};
