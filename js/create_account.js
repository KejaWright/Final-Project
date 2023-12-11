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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// function that sends the data to be authenticated
  $('#newacc').submit(function(e) {
    e.preventDefault();

    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

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
          var totalScore = 0;
          var playerinformation = {
            // list what you want to put in
            "username": user.displayName,
            "email": email,
            "signupDate": date,
            "score": totalScore
          };

          var db = firebase.firestore();
          db.collection("Player Logins").doc(user.displayName).set(playerinformation).then(() => {
            console.log("information saved to firestore");
            window.location.href = "login.html";
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

});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
     // User is signed in.
     const exist = document.getElementById('shopdisplay');
     exist.style.color = " rgb(250, 117, 8)";
     exist.style.pointerEvents = "auto";
  } else {
     console.log("There is no user logged in.");
  }
});