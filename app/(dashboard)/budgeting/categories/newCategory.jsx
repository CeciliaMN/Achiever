import { Keyboard, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import UseAppStyles from "../../../../components/UseAppStyles";
import { useUser } from "../../../../hooks/useUser";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useCategories } from "../../../../hooks/useCategories";
import ThemedView from "../../../../components/ThemedView";
import ThemedTextInput from "../../../../components/ThemedTextInput";
import Spacer from "../../../../components/Spacer";
import ThemedButton from "../../../../components/ThemedButton";
import ThemedLink from "../../../../components/ThemedLink";
import ThemedCategoryTheme from "../../../../components/lists/ThemedCategoryTheme";
import DateTimePicker from "react-native-modal-datetime-picker";

export default function NewCategory() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const datePickerBgColor = theme.uiBackground;

    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [categoryTheme, setCategoryTheme] = useState(null);
    const [items, setItems] = useState([
            { label: "Fixed Cost", value: "fixed_costs" },
            { label: "Investment", value: "investments" },
            { label: "Savings Goal", value: "savings_goals" },
            { label: "Guilt-Free Spending", value: "guilt_free_spending" }
        ]);
    const [amount, setAmount] = useState(0.0);
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const { addCategory } = useCategories();

    function resetFields() {
        setDescription('');
        setCategoryTheme(null);
        setAmount(0.0);
    }

    function showDatePicker() {
        setDatePickerVisibility(true)
    }

    async function add() {
        // TODO: add transaction to database
        // TODO: success message 
        console.log('Theme : ', categoryTheme);

        if (!amount || !categoryTheme || !description.trim()) {
            return;
        }

        setLoading(true);
        await addCategory({ description, categoryTheme, amount });

        resetFields();
        setLoading(false);
    }

   
    function cancel() {
        resetFields();
        router.replace('/budgeting/newBudget');
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
                    ]}
                >
                    <ThemedTextInput
                        placeholder='Description'
                        onChangeText={setDescription}
                        value={description}
                    />
                    <Spacer height={15} />

                    <ThemedCategoryTheme
                        items={items}
                        setItems={setItems}
                        value={categoryTheme}
                        setValue={setCategoryTheme}
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
                        <ThemedButton onPress={add}
                            text={loading ? 'Saving...' : 'Add'}
                            disabled={loading}
                        />
                        <ThemedButton onPress={cancel}
                            text='Cancel'
                            style={{backgroundColor: Colors.danger}}
                        />
                    </View>
                </View>


            </ThemedView>
        </TouchableWithoutFeedback >
    )
};
