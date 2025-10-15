import { FlatList, Keyboard, Pressable, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import UseAppStyles from "../../../components/UseAppStyles";
import { useUser } from "../../../hooks/useUser";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useBudgets } from "../../../hooks/useBudgets";
import ThemedLink from "../../../components/ThemedLink";
import ThemedButton from "../../../components/ThemedButton";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import Spacer from "../../../components/Spacer";
import ThemedCategory from "../../../components/lists/ThemedCategory";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useCategories } from "../../../hooks/useCategories";

export default function NewBudget() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const datePickerBgColor = theme.uiBackground;

    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();

    const { addBudget } = useBudgets();
    const { categories, getCategories } = useCategories();

    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const newDate = new Date(year, month, 1);

    const [date, setDate] = useState(newDate);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [budgetCategoryIds, setBudgetCategoryIds] = useState([]);
    const [amount, setAmount] = useState(0.0);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    function forceRefresh() {
        setRefresh(prev => !prev);
    }

    function resetFields() {
        setDate(newDate);
        setBudgetCategoryIds([]);
        forceRefresh();
    }

    async function add() {
        // TODO: add transaction to database
        // TODO: success message 
        if (!budgetCategoryIds || budgetCategoryIds.length === 0) {
            return;
        }
        setLoading(true);

        // CREATE BUDGET DESCRIPTION
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        const description = `${month} ${year}`;

        console.log('Budget to be created: ', { date, description, budgetCategoryIds });
        await addBudget({ date, description, budgetCategoryIds });
        //resetFields();

        //router.replace('/budgeting');

        setLoading(false);
    }

    function addCategory() {
        router.replace('/budgeting/categories/newCategory');
    }

    function cancel() {
        resetFields();
        router.replace('/budgeting');
    }

    function showDatePicker() {
        setDatePickerVisibility(true)
    }

    useEffect(() => {
        async function loadCategories() {
            return await getCategories(); 
        }
        loadCategories()
            .then(data => console.log('Fetched categories:', data));
    }, []);

    useEffect(() => {
        if (!categories || categories.length === 0) return;

        // UPDATE BUDGET TOTAL AMOUNT
        let newAmount = categories.reduce((sum, currentCategory) => {
            let newSum = sum;
            if (budgetCategoryIds.includes(currentCategory.$id)) {
                newSum += currentCategory.amount;
            }
            return newSum;
        }, 0);
        setAmount(newAmount);
    }, [categories, budgetCategoryIds]);


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
                            flex: 1,
                            alignItems: 'center',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }
                    ]}
                >

                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={date}
                        onConfirm={(selectedDate) => {
                            const month = selectedDate.getMonth();
                            const year = selectedDate.getFullYear();
                            const newDate = new Date(year, month, 1);
                            setDate(newDate);
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
                            value={`Month: ${date.toLocaleDateString().substring(0, 7)}`}
                            editable={false}
                        />
                    </Pressable>
                    <Spacer height={15} />

                    <View
                        style={[styles.list]}>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Pressable
                                    onLongPress={() => {
                                        // TODO : Delete item pop-up
                                    }}
                                    onPress={() => {
                                        // router.push(`/categories/${item.$id}`);
                                    }}
                                >
                                    <ThemedCategory
                                        category={item}
                                        categories={categories}
                                        budgetCategoryIds={budgetCategoryIds}
                                        setBudgetCategoryIds={setBudgetCategoryIds}
                                    />
                                </Pressable>
                            )}
                        />
                        <Spacer height={15} />
                    </View>


                    <View
                        style={{
                            flex: 0,
                            flexDirection: 'row',
                            columnGap: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ThemedButton onPress={addCategory}
                            text={loading ? 'Saving...' : 'Create Category'}
                            disabled={loading}
                        />
                    </View>
                    <Spacer height={15} />

                    <ThemedText>Total: {parseFloat(amount).toFixed(2)}$</ThemedText>
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
                            text={loading ? 'Saving...' : 'Confirm'}
                            disabled={loading}
                        />


                        <ThemedButton
                            style={{ backgroundColor: Colors.danger }}
                            onPress={cancel}
                            text='Cancel'
                        />
                    </View>
                </View>

            </ThemedView>
        </TouchableWithoutFeedback >
    )
};
