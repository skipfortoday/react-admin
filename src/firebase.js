import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyB5KVRnoIdq-WmZ05yCCtfILFks7qLTRjs",
    authDomain: "abs20210604.firebaseapp.com",
    databaseURL: "https://abs20210604-default-rtdb.firebaseio.com",
    projectId: "abs20210604",
    storageBucket: "abs20210604.appspot.com",
    messagingSenderId: "13714180540",
    appId: "1:13714180540:web:9af17f1db04eca456143b9",
    measurementId: "G-P36Y9HLXMD"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);