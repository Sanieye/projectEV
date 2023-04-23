const {initializeApp, cert} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {getAuth } = require("firebase-admin/auth");

const serviceAccount = require(".key.json");

const firebaseConfig = {
  apiKey: "AIzaSyAc1Ueb6JFseJaIDdsixTzJVaYV3OyxJ6w",
  authDomain: "ev-stations-44dcf.firebaseapp.com",
  projectId: "ev-stations-44dcf",
  storageBucket: "ev-stations-44dcf.appspot.com",
  messagingSenderId: "452124390079",
  appId: "1:452124390079:web:6cc2d1e408cd0f10a6cc0a",
  measurementId: "G-1375JLX2TN"
};

firebase.initializeApp(firebaseConfig);

initializeApp({
    // credential : admin.credential.cert(serviceAccount)

    credential: cert(serviceAccount)
});
const db = getFirestore()
const auth = getAuth()
module.exports = { db, auth };