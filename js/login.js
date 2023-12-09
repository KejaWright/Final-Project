const firebaseConfig = {
  apiKey: "AIzaSyD3xx7nx749QdAVXwvKw6V4IRIAlTUO-Lk",
  authDomain: "csci-225-final-project-a-bb0d1.firebaseapp.com",
  projectId: "csci-225-final-project-a-bb0d1",
  storageBucket: "csci-225-final-project-a-bb0d1.appspot.com",
  messagingSenderId: "691914384953",
  appId: "1:691914384953:web:b910332ffe97e93ef50fe8",
  measurementId: "G-W41900LN38"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$('#login-form').submit(function (e) {
  e.preventDefault();

  ///very important dont delete///
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;

    console.log(email, password);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((success) => {
        // Signed in
        console.log('login in successful');
        let user = firebase.auth().currentUser;

        //user.updateProfile({ displayName: "Not sure" });
        if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          console.log(name, email, emailVerified);
          window.location.href = "coffeeshop.html";
        }

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
});

// login with google code
$('#login-with-google-button').click(function(){
    ///very important dont delete///
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // IdP data available in result.additionalUserInfo.profile.
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
})