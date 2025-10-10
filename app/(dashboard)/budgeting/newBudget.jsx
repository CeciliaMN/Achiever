import { Keyboard, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import UseAppStyles from "../../../components/UseAppStyles";
import { useUser } from "../../../hooks/useUser";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useBudgets } from "../../../hooks/useBudgets";
import ThemedLink from "../../../components/ThemedLink";
import ThemedButton from "../../../components/ThemedButton";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import DateTimePicker from "react-native-modal-datetime-picker";
import Spacer from "../../../components/Spacer";

export default function NewBudget() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const datePickerBgColor = theme.uiBackground;

    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();

    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [amount, setAmount] = useState(0.0);
    const [category, setCategory] = useState('');
    const [budgetTheme, setBudgetTheme] = useState('');
    const [loading, setLoading] = useState(false);

    const { addBudget } = useBudgets();

    function resetFields() {
        setAmount(0.0);
        setBudgetTheme('');
        setCategory('');
    }

    async function add() {
        // TODO: add transaction to database
        // TODO: clear fields
        // TODO: success message 
        if (!amount || !budgetTheme.trim() || !category.trim()) {
            return;
        }
        
        setLoading(true);
        await addBudget({date, budgetTheme, category, amount});
        resetFields();

        router.replace('/budgeting');

        setLoading(false);
    }

    function addCategory() {
        router.replace('/budgeting/categories/newCategory');
    }

    /*
    function cancel() {
        // TODO: clear fields
        router.replace('/tracking');
    }
    */

    function showDatePicker() {
        setDatePickerVisibility(true)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView
                safe={true}
                style={{
                    justifyContent: 'flex-start'
                }}
                >

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
                            justifyContent: 'center'
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
                        placeholder='Theme'
                        onChangeText={setBudgetTheme}
                        value={budgetTheme}
                    />
                    <Spacer height={15} />

                    <ThemedTextInput
                        placeholder='Category'
                        onChangeText={setCategory}
                        value={category}
                    />
                    <Spacer height={15} />                    

                    <ThemedTextInput
                        placeholder='Amount'
                        onChangeText={setAmount}
                        value={amount}
                        keyboardType='decimal-pad'
                        onBlur={() => setAmount(parseFloat(amount).toFixed(2))}
                    />
                    <Spacer height={15} />

                    <View
                        style={{
                            flex: .3,
                            flexDirection: 'row',
                            columnGap: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <ThemedButton onPress={addCategory} 
                            text={loading ? 'Saving...' : 'Add Category'} 
                            disabled={loading} 
                        />
                    </View>
                    <Spacer height={15} />

                    <View
                        style={{
                            flex: .3,
                            flexDirection: 'row',
                            columnGap: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <ThemedButton onPress={add} 
                            text={loading ? 'Saving...' : 'Add'} 
                            disabled={loading} 
                        />
                        <ThemedLink href='/budgeting'>Cancel</ThemedLink>
                    </View>
                </View>


            </ThemedView>
        </TouchableWithoutFeedback >
    )
};
