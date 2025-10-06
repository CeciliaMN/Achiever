import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import ThemedView from "../../components/ThemedView";
import UseAppStyles from "../../components/UseAppStyles";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";

export default function Tracking() {
    const styles = UseAppStyles();

    return (
        <ThemedView>
                <ThemedText title={ true }>Tracking</ThemedText>
        </ThemedView>
    )
};
