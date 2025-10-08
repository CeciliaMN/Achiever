import { Text, View, Image, FlatList, Pressable } from "react-native";
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
import { useTransactions } from "../../../hooks/useTransactions";

export default function Tracking() {
    const styles = UseAppStyles();
    const { user, signOut, authChecked } = useUser();
    const router = useRouter();
    const { transactions } = useTransactions();

    console.log('Transactions in index: ', transactions);

    function goToNew() {
        router.replace('/tracking/newTransaction');
    }

    function signUserOut() {
        signOut();
        router.replace('/');
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

                <ThemedButton onPress={signUserOut} text='Sign Out' />
            </View>

            <View
                style={{
                    flex: .9
                }}>
                <ThemedText title={true}>Transactions</ThemedText>

                <FlatList
                    data={transactions.documents}
                    keyExtractor={(item) => item.$id }
                    contentContainerStyle={styles.listItem}
                    renderItem={({ item }) => (
                        <Pressable>
                            <ThemedCard>
                                <ThemedText title={true}>{item.description}</ThemedText>
                                <ThemedText>{item.category}</ThemedText>
                                <ThemedText>{item.amount}$</ThemedText>
                                <ThemedText>{item.date}</ThemedText>
                            </ThemedCard>
                        </Pressable>
                    )}
                />
            </View>

            <ThemedButton onPress={goToNew} text='New' />
            <Spacer height={15} />
        </ThemedView>
    )
};
