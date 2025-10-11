import { useEffect, useState } from "react";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import { router, useLocalSearchParams } from "expo-router";
import { useTransactions } from "../../../hooks/useTransactions";
import Spacer from "../../../components/Spacer";
import ThemedLoader from "../../../components/ThemedLoader";
import { Pressable, useColorScheme, View } from "react-native";
import ThemedButton from "../../../components/ThemedButton";
import { Colors } from "../../../constants/Colors";
import ThemedTextInput from "../../../components/ThemedTextInput";
import UseAppStyles from "../../../components/UseAppStyles";
import DateTimePicker from "react-native-modal-datetime-picker";

export default function TransactionDetails() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    const [transaction, setTransaction] = useState(null);
    const { id } = useLocalSearchParams();
    const { getTransactionById } = useTransactions();
    const [show, setShow] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0.0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());


    const { updateTransaction, deleteTransaction } = useTransactions();

    
    function showDatePicker() {
        setDatePickerVisibility(true)
    }

    function confirmUpdate() {
        const newTransaction = { description, amount, category, date };
        updateDB(id, newTransaction);
        setTransaction(newTransaction);
        setIsUpdating(false);
    }

    function cancelUpdate() {
        setDescription(transaction.description);
        setAmount(parseFloat(transaction.amount));
        setCategory(transaction.category);
        setDate(new Date(transaction.date));

        setIsUpdating(false);
    }    
    
    async function deleteCurrent() {
        await deleteTransaction(id);
        router.back();
    }

    async function updateDB(id, newTransaction) {
        await updateTransaction(id, newTransaction);
    }

    async function updateCurrent() {
        setIsUpdating(true);
    }

    useEffect(() => {
        async function loadTransaction() {
            const transactionData = await getTransactionById(id);
            setTransaction(transactionData);

            setDescription(transactionData.description);
            setAmount(parseFloat(transactionData.amount));
            setCategory(transactionData.category);
            setDate(new Date(transactionData.date));

            setShow(true);
        }

        loadTransaction();
    }, [id])

    return (
        show ? (
            transaction ?
                <ThemedView safe={true}>

                    {
                        !isUpdating && (
                            <>
                                <ThemedText title={true}>{transaction.description}</ThemedText>
                                <Spacer height={15} />

                                <ThemedText>Amount : {parseFloat(transaction.amount).toFixed(2)}$</ThemedText>
                                <Spacer height={15} />

                                <ThemedText>Category : {transaction.category}</ThemedText>
                                <Spacer height={15} />

                                <ThemedText>Date : {(new Date(transaction.date).toLocaleDateString())}</ThemedText>
                                <Spacer height={25} />

                                <View
                                    style={{
                                        flexShrink: 0,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <ThemedButton
                                        onPress={updateCurrent}
                                        text='Update'
                                        color={Colors.primary}
                                        disabled={isUpdating} />

                                    <ThemedButton
                                        onPress={deleteCurrent}
                                        text='Delete'
                                        color={Colors.danger}
                                        disabled={isUpdating}
                                        style={{ marginStart: 15, marginEnd: 5 }} />

                                </View>
                            </>
                        )
                    }

                    {
                        isUpdating && (
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
                                ]}
                            >

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

                                <ThemedTextInput
                                    placeholder='Category'
                                    onChangeText={setCategory}
                                    value={category}
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
                                    style={[styles.textInput, { padding: 0 }]}
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
                                        flexShrink: 0,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <ThemedButton
                                        onPress={confirmUpdate}
                                        text='Confirm'
                                        color={Colors.primary}
                                    />

                                    <ThemedButton
                                        onPress={cancelUpdate}
                                        text='Cancel'
                                        color={Colors.danger}
                                        style={{ marginStart: 15 }}
                                    />

                                </View>
                            </View>
                        )
                    }



                </ThemedView> :

                <ThemedView safe={true}>
                    <Spacer height={15} />

                    <ThemedText >No transaction found.</ThemedText>
                </ThemedView>
        ) :

            <ThemedView safe={true}>
                <Spacer height={15} />
                <ThemedLoader />
            </ThemedView>
    )
}

