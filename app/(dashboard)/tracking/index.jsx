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
import ThemedTransaction from "../../../components/lists/ThemedTransaction";

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
            <Spacer height={15} />

            <View
                style={{
                    flex: 0,
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
                    flex: 1,
                    alignSelf: 'stretch',
                    paddingHorizontal: 10
                }}
            >
                <Spacer height={10} />

                <ThemedText 
                style={{
                    flex: 0,
                    alignSelf: 'flex-start',
                    paddingHorizontal: 10
                }} title={true}>Transactions</ThemedText>
                <Spacer height={10} />

                <FlatList
                    data={transactions.documents}
                    keyExtractor={(item) => item.$id}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => router.push(`/tracking/${item.$id}`)}
                    >
                            <ThemedTransaction transaction={item} />
                        </Pressable>
                    )}
                />
            </View>

            <ThemedButton onPress={goToNew} text='New' />
            <Spacer height={15} />
        </ThemedView>
    )
};
