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

export default function NewCategory() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const datePickerBgColor = theme.uiBackground;

    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();

    const [description, setDescription] = useState('');
    const [categoryTheme, setCategoryTheme] = useState('');
    const [amount, setAmount] = useState(0.0);
    const [loading, setLoading] = useState(false);

    const { addCategory } = useCategories();

    function resetFields() {
        setDescription('');
        setCategoryTheme('');
        setAmount(0.0);
    }

    async function add() {
        // TODO: add transaction to database
        // TODO: clear fields
        // TODO: success message 
        if (!amount || !categoryTheme.trim() || !description.trim()) {
            return;
        }
        
        setLoading(true);
        await addCategory({description, theme, amount});
        
        resetFields();
        setLoading(false);
    }

    /*
    function cancel() {
        // TODO: clear fields
        router.replace('/tracking');
    }
    */

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
                    
                    <ThemedCategoryTheme />
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
                        <ThemedLink href='/budgeting'>Cancel</ThemedLink>
                    </View>
                </View>


            </ThemedView>
        </TouchableWithoutFeedback >
    )
};
