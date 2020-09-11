import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAYkwPpWaxGWLd8olPYwdnqAKVkvJ6PnvQ",
  authDomain: "master-ielts.firebaseapp.com",
  databaseURL: "https://master-ielts.firebaseio.com",
  projectId: "master-ielts",
  storageBucket: "master-ielts.appspot.com",
  messagingSenderId: "694139973995",
  appId: "1:694139973995:web:368b6e1411260911ad1c2e",
  measurementId: "G-NNV6GCRMC5"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
