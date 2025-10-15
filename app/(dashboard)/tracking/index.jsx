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
import { useExpenses } from "../../../hooks/useExpenses";
import ThemedExpense from "../../../components/lists/ThemedExpense";
import { Colors } from "../../../constants/Colors";

export default function Tracking() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const styles = UseAppStyles();

    const { user, signOut, authChecked } = useUser();
    const router = useRouter();
    const { expenses } = useExpenses();

    function goToNew() {
        router.replace('/tracking/newExpense');
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
                    }} title={true}>Expenses</ThemedText>
            </View>

            {
                expenses && expenses.length > 0 ?

                    <View
                        style={[styles.list]}>
                        <FlatList
                            data={expenses.documents}
                            keyExtractor={(item) => item.$id}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => {
                                    router.push(`/tracking/${item.$id}`);
                                }}
                                >
                                    <ThemedExpense Expense={item} />
                                </Pressable>
                            )}
                        />
                    </View> :

                    <ThemedView>
                        <ThemedText>No expenses to show.</ThemedText>
                    </ThemedView>
            }





            <View
                style={{
                    flexShrink: 0,
                    alignSelf: 'flex-end',
                    marginEnd: 30
                }}
            >
                <ThemedButton onPress={goToNew} text='New' />
                <Spacer height={15} />
            </View>
        </ThemedView>
    )
};
