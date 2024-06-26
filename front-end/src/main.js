import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import router from "./router";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "vue-site-7edf1.firebaseapp.com",
  projectId: "vue-site-7edf1",
  storageBucket: "vue-site-7edf1.appspot.com",
  messagingSenderId: "166187718995",
  appId: "1:166187718995:web:9124d553952703655ae9a6",
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
