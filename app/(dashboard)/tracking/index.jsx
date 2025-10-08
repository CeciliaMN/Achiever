import { Text, View, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import ThemedView from "../../../components/ThemedView";
import UseAppStyles from "../../../components/UseAppStyles";
import ThemedText from "../../../components/ThemedText";
import Spacer from "../../../components/Spacer";
import ThemedButton from "../../../components/ThemedButton";
import { useUser } from "../../../hooks/useUser";
import ThemedLink from "../../../components/ThemedLink";
import { useEffect } from "react";

export default function Tracking() {
    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();

    function goToNew() {
        router.replace('/tracking/newTransaction');
    }

    return (
        <ThemedView
            safe={true}
            style={{
                justifyContent: 'flex-start'
            }}>
            <Spacer />

            <View
                style={{
                    flex: .1,
                    flexDirection: 'row',
                    columnGap: 30,
                    alignItems: 'center'
                }}>
                <ThemedText
                >
                    Hello{authChecked && user != null ? ` ${user.name}` : ''} !
                </ThemedText>

                <ThemedButton onPress={signOut} text='Sign Out' />
            </View>

            <View
                style={{
                    flex: .8,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

            </View>

            <View
                style={{
                    flex: .1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
            </View>

            <ThemedButton onPress={goToNew} text='New' />
            <Spacer height={12} />
        </ThemedView>
    )
};
