import { Client, Account, Avatars, Databases } from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('68e2eae8000c992df20d')
    .setPlatform('dev.ceciliamn.achiever');

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);