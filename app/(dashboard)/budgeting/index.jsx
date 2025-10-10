import { Text, View, Image, FlatList, Pressable, useColorScheme } from "react-native";
import { Link, useRouter } from "expo-router";
import ThemedView from "../../../components/ThemedView";
import ThemedCard from "../../../components/ThemedCard";
import UseAppStyles from "../../../components/UseAppStyles";
import ThemedText from "../../../components/ThemedText";
import Spacer from "../../../components/Spacer";
import ThemedButton from "../../../components/ThemedButton";
import { useUser } from "../../../hooks/useUser";
import ThemedLink from "../../../components/ThemedLink";
import { useEffect, useState } from "react";
import ThemedTransaction from "../../../components/lists/ThemedTransaction";
import { Colors } from "../../../constants/Colors";
import { useBudgets } from "../../../hooks/useBudgets";
import ThemedBudget from "../../../components/lists/ThemedBudget";

export default function Budgeting() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    const { user, signOut, authChecked } = useUser();
    const router = useRouter();
    const { budgets } = useBudgets();

    function goToNew() {
        // router.replace('/budgeting/newBudget');
        router.replace('/budgeting/categories/newCategory');
    }

    function signUserOut() {
        signOut();
        router.replace('/');
    }

    return (
        <ThemedView
            safe={true}
            style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
            <Spacer height={15} />

            <View
                style={{
                    flexShrink: 0,
                    flexDirection: 'row',
                    columnGap: 30,
                    alignItems: 'center'
                }}
            >
                <ThemedText>
                    Hello{authChecked && user != null ? ` ${user.name}` : ''} !
                </ThemedText>

                <ThemedButton onPress={signUserOut} text='Sign Out' />
            </View>

            <View
                style={{
                    flexShrink: 0,
                    alignSelf: 'stretch',
                    paddingHorizontal: 10
                }}
            >
                <Spacer height={10} />

                <ThemedText
                    style={{
                        flexShrink: 0,
                        alignSelf: 'flex-start',
                        paddingHorizontal: 10
                    }} title={true}>Budgets</ThemedText>
            </View>

            <View
                style={[styles.list]}>
                <FlatList
                    data={budgets.documents}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => {
                            router.push(`/budgeting/${item.$id}`);
                        }}
                        >
                            <ThemedBudget budget={item} />
                        </Pressable>
                    )}
                />
            </View>



            <View
                style={{
                    flexShrink: 0,
                    alignSelf:'flex-end',
                    marginEnd:30
                }}
            >
                <ThemedButton onPress={goToNew} text='New' />
                <Spacer height={15} />
            </View>
        </ThemedView>
    )
};
