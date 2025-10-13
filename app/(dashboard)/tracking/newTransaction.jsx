import { Text, View, Image, TouchableWithoutFeedback, Keyboard, useColorScheme, Pressable, TextInput } from "react-native";
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
import { Colors } from "../../../constants/Colors";
import { useTransactions } from "../../../hooks/useTransactions";
import { useCategories } from "../../../hooks/useCategories";
import DateTimePicker from "react-native-modal-datetime-picker";
import ThemedDropDown from "../../../components/ThemedDropDown";

export default function NewTransaction() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const datePicketBgColor = theme.uiBackground;

    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();

    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [amount, setAmount] = useState(0.0);
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categoryDescriptions, setCategoryDescriptions] = useState([]);

    const { addTransaction } = useTransactions();
    const { categories } = useCategories();

    function resetFields() {
        setAmount(0.0);
        setDescription('');
        setCategoryId(null);
    }

    async function add() {
        // TODO: success message 
        if (!amount || !description.trim() || !categoryId.trim()) {
            return;
        }

        setLoading(true);
        await addTransaction({ date, amount, description, categoryId });
        resetFields();
        setLoading(false);
    }

    function cancel() {
        resetFields();
        router.replace('/tracking');
    }

    function showDatePicker() {
        setDatePickerVisibility(true)
    }

    useEffect(() => {
        // GET CATEGORY DESCRIPTIONS
        if (categories ) {
            let newCategoryDescriptions = categories.documents.map((categ) => {
                const desc = categ.description;
                const val = categ.$id;
                return { label: desc, value: val };
            });
            setCategoryDescriptions(newCategoryDescriptions);
        }
    }, [])

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
                            flexShrink: 0,
                            flexDirection: 'row',
                            alignSelf: 'flex-start',
                            marginStart: '10%'
                        }}
                    >
                        <ThemedTextInput
                            placeholder='Amount'
                            onChangeText={setAmount}
                            value={!isNaN(amount) ? amount.toString() : ''}
                            keyboardType='decimal-pad'
                            onBlur={() => setAmount(parseFloat(amount).toFixed(2))}
                            style={{
                                flexShrink: 0,
                                alignSelf: 'flex-start',
                                width: '70%'
                            }}
                        />

                        <ThemedText
                            style={{
                                flexShrink: 0,
                                alignSelf: 'center',
                                marginStart: 5
                            }}
                        >$</ThemedText>
                    </View>
                    <Spacer height={15} />

                    <ThemedTextInput
                        placeholder='Description'
                        onChangeText={setDescription}
                        value={description}
                    />
                    <Spacer height={15} />

                    <ThemedDropDown
                        placeholder='Category'
                        items={categoryDescriptions}
                        setItems={setCategoryDescriptions}
                        value={categoryId}
                        setValue={setCategoryId}
                    />
                    <Spacer height={15} />

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
                    <Pressable
                        style={[styles.textInput,
                        {
                            padding: 0
                        }
                        ]}
                        onPress={showDatePicker}
                    >
                        <ThemedTextInput
                            placeholder='Date'
                            value={date.toLocaleDateString()}
                            editable={false}
                        />
                    </Pressable>
                    <Spacer height={30} />

                    <View
                        style={{
                            flex: .3,
                            width: '80%',
                            columnGap: '15%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <ThemedButton
                            onPress={add}
                            text={loading ? 'Saving...' : 'Add'}
                            disabled={loading}
                        />
                        <ThemedButton
                            style={{ backgroundColor: Colors.danger }}
                            onPress={cancel}
                            text='Cancel'
                            disabled={loading}
                        />
                    </View>

                    <View
                        style={{
                            flex: .3,
                            flexDirection: 'row',
                            columnGap: '20%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                    </View>
                </View>


            </ThemedView>
        </TouchableWithoutFeedback >
    )
};
