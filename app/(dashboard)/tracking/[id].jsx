import { useEffect, useState } from "react";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { useTransactions } from "../../../hooks/useTransactions";
import Spacer from "../../../components/Spacer";
import ThemedLoader from "../../../components/ThemedLoader";

export default function TransactionDetails() {
    const [transaction, setTransaction] = useState(null);
    const { id } = useLocalSearchParams();
    const { getTransactionById } = useTransactions();
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function loadTransaction() {
            const transactionData = await getTransactionById(id);
            setTransaction(transactionData);
            setShow(true);
        }

        loadTransaction();
    }, [id])


    return (
        show ? (
            transaction ?
                <ThemedView safe={true}>

                    <ThemedText title={true}>{transaction.description}</ThemedText>
                    <Spacer height={15} />

                    <ThemedText>Amount : {parseFloat(transaction.amount).toFixed(2)}$</ThemedText>
                    <Spacer height={15} />

                    <ThemedText>Category : {transaction.category}</ThemedText>
                    <Spacer height={15} />

                    <ThemedText>Date : {(new Date(transaction.date).toLocaleDateString())}</ThemedText>
                    <Spacer height={15} />

                </ThemedView> :
                <ThemedView safe={true}>
                    <ThemedText title={true}>Transaction Details</ThemedText>
                    <Spacer height={15} />

                    <ThemedText >No transaction found.</ThemedText>
                </ThemedView>
            ) :
            <ThemedView safe={true}>
                <ThemedText title={true}>Transaction Details</ThemedText>
                <ThemedLoader />
            </ThemedView>
    )
}

