import { View, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import UseAppStyles from "../UseAppStyles";
import ThemedText from "../ThemedText";

export default function ThemedCategory({ style, category, ...props }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

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
                <ThemedText title={true}>{category.description}</ThemedText>
                <ThemedText style={{fontStyle:'italic'}}>{category.theme}</ThemedText>
            </View>

            <View style={{
                flex:1,
                alignItems:'flex-end',
                paddingEnd:'10'
            }}>
                <ThemedText>{parseFloat(category.amount).toFixed(2)}$</ThemedText>
            </View>
        </View>

    )
};