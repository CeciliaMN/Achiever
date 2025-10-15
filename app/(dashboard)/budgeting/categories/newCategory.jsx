import { Keyboard, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import UseAppStyles from "../../../../components/UseAppStyles";
import { useUser } from "../../../../hooks/useUser";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useCategories } from "../../../../hooks/useCategories";
import ThemedView from "../../../../components/ThemedView";
import ThemedTextInput from "../../../../components/ThemedTextInput";
import Spacer from "../../../../components/Spacer";
import ThemedButton from "../../../../components/ThemedButton";
import ThemedLink from "../../../../components/ThemedLink";
import ThemedDropDown from "../../../../components/ThemedDropDown";
import DateTimePicker from "react-native-modal-datetime-picker";
import { supabase } from "../../../../lib/supabase";

export default function NewCategory() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const datePickerBgColor = theme.uiBackground;

    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [categoryGroup, setCategoryGroup] = useState(null);
    const [items, setItems] = useState([
        { label: "Fixed Cost", value: "Fixed Costs" },
        { label: "Investment", value: "Investments" },
        { label: "Savings Goal", value: "Savings Goals" },
        { label: "Guilt-Free Spending", value: "Guilt-Free Spending" }
    ]);
    const [amount, setAmount] = useState(0.0);
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const { getProfile, session } = useUser();
    const { addCategory } = useCategories();

    function resetFields() {
        setDescription(null)
        setCategoryGroup(null);
        setAmount(null);
    }

    function showDatePicker() {
        setDatePickerVisibility(true)
    }

    async function add() {
        // TODO: add transaction to database
        // TODO: success message 


        if (!amount || !categoryGroup || !description.trim()) {
            return;
        }

        setLoading(true);
        await addCategory(user.id, { description, categoryGroup, amount });

        resetFields();
        setLoading(false);
    }


    function cancel() {
        resetFields();
        router.replace('/budgeting/newBudget');
    }

    //console.log('User ID (user.id):', user.id);
    //console.log('User ID (auth.uid()):', session);

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

                    <ThemedDropDown
                        placeholder='Group'
                        items={items}
                        setItems={setItems}
                        value={categoryGroup}
                        setValue={setCategoryGroup}
                    />
                    <Spacer height={15} />

                    <ThemedTextInput
                        placeholder='Amount'
                        onChangeText={setAmount}
                        value={!isNaN(amount) && amount ? amount.toString() : ''}
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
                            style={{ backgroundColor: Colors.danger }}
                        />
                    </View>
                </View>


            </ThemedView>
        </TouchableWithoutFeedback >
    )
};
