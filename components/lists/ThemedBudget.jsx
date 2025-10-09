import { View, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import UseAppStyles from "../UseAppStyles";
import ThemedText from "../ThemedText";

export default function ThemedBudget({ style, budget, ...props }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    const date = (new Date(budget.date)).toLocaleDateString();

    return (
        <View
            style={[
                styles.itemTransaction,
                style
            ]}
        >
            <View style={{
                flex:1,
                alignItems:'flex-start',
                paddingStart:'10'
            }}>
                <ThemedText title={true}>{budget.category}</ThemedText>
                <ThemedText style={{fontStyle:'italic'}}>{budget.theme}</ThemedText>
            </View>

            <View style={{
                flex:1,
                alignItems:'flex-end',
                paddingEnd:'10'
            }}>
                <ThemedText>{parseFloat(budget.amount).toFixed(2)}$</ThemedText>
                <ThemedText>{date}</ThemedText>
            </View>
        </View>

    )
};