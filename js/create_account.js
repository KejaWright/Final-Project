//rtghy@gmail.com 123werZXS;']

const firebaseConfig = {

  apiKey: "AIzaSyD3xx7nx749QdAVXwvKw6V4IRIAlTUO-Lk",

  authDomain: "csci-225-final-project-a-bb0d1.firebaseapp.com",

  projectId: "csci-225-final-project-a-bb0d1",

  storageBucket: "csci-225-final-project-a-bb0d1.appspot.com",

  messagingSenderId: "691914384953",

  appId: "1:691914384953:web:b910332ffe97e93ef50fe8",

  measurementId: "G-W41900LN38"

};


//Assignment 8 CSCI 225

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// email field
var email_field = document.getElementById("email");
// password field
var password_field = document.getElementById("password");
// username field
var username_field = document.getElementById("username");

// create account button
var create_account_button = document.getElementById("create-account-button");

// function that sends the data to be authenticated
const sendDataToDatabase = () => {

  var email = email_field.value;
  var username = username_field.value;
  var password = password_field.value;

  console.log(email, password);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      // Signed in
      // ...
      console.log("Return from database", result);
      let user = result.user;
      user.updateProfile({
        displayName: username,
        displayEmail: email
      }).then(() => {
        console.log(user.displayName, "You are signed up");
        //window.location.href = "Login.html";

        var date = new Date();

        var playerinformation = {
          // list what you want to put in
          "username": user.displayName,
          "email": email,
          "signupDate": date
        };

        var db = firebase.firestore();
        db.collection("Player Logins").doc(user.displayName).set(playerinformation).then(() => {
          console.log("information saved to firestore");

          window.location.href = "coffeeshop.html";
        });


      });
      // put the information after you callback (then())

    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code);
      console.log(errorMessage);
    });

}

// register event handler to create account button to create an account if the account credentials are valid.
create_account_button.addEventListener("click", sendDataToDatabase, false);