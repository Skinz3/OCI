var firebaseConfig = {
    apiKey: "AIzaSyAPzdd1ADtyOeL1EUuUbx8jFOwkRTYpa3o",
    authDomain: "navneed-oci.firebaseapp.com",
    projectId: "navneed-oci",
    storageBucket: "navneed-oci.appspot.com",
    messagingSenderId: "743607401529",
    appId: "1:743607401529:web:4c18016d65060f2e71a1e8",
    measurementId: "G-1LEKMXRJRC"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

db = firebase.firestore();


