import firebase from 'firebase'

var config = {
  "apiKey": "AIzaSyAjlUS9NJoXLm_p-KU01lXcECpnI9AGM0U",
  "authDomain": "vinylizr-e5665.firebaseapp.com",
  "databaseURL": "https://vinylizr-e5665.firebaseio.com",
  "projectId": "vinylizr-e5665",
  "storageBucket": "vinylizr-e5665.appspot.com",
  "messagingSenderId": "189276288673"
};

var fire = firebase.initializeApp(config);
export default fire;