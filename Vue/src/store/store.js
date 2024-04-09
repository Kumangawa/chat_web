// store.js
import { reactive } from 'vue';

export const store = reactive({
    selectedChannelId: 1,
    selectedChannelName: "Channel 1",
    userName: "Samuele Saporito",
    searchMessage: " ",
    newMessageBody: "",
    apiKey: "",
});