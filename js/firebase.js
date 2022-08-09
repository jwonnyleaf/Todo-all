const firebaseConfig = {
    apiKey: "AIzaSyAntyuxEcWE9gHP2JzIn6UfKb50Ov4webY",
    authDomain: "todoal-f91dd.firebaseapp.com",
    databaseURL: "https://todoal-f91dd-default-rtdb.firebaseio.com",
    projectId: "todoal-f91dd",
    storageBucket: "todoal-f91dd.appspot.com",
    messagingSenderId: "1098077048763",
    appId: "1:1098077048763:web:357375f54d8119fd65fe9e",
    measurementId: "G-93WVE5DJHP"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore.FieldValue.serverTimestamp()
const db = firebase.firestore();