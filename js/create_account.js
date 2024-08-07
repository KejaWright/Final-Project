//rtghy@gmail.com 123werZXS;']

const firebaseConfig = {
  apiKey: "AIzaSyAV9Jm6YTmnLz9jGqxXfpfWxUd-L6tT4ak",
  authDomain: "jitterbugaccountinfo.firebaseapp.com",
  projectId: "jitterbugaccountinfo",
  storageBucket: "jitterbugaccountinfo.appspot.com",
  messagingSenderId: "775646285550",
  appId: "1:775646285550:web:30c935dd3160e0d62f2dff",
  measurementId: "G-JB8GYEYL8X"
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

/////////////////////////////////////////////////////////////////
///FOR MINI LEADERBOARD--I PUT THIS HERE SINCE THE INDEX ONLY WANT TO SE ONE JS FILE APPARENTLY///
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var playerLoginsRef = db.collection("Player Logins");

function topFive(){
    playerLoginsRef.orderBy("score", "desc").limit(5).get().then((querySnapshot) => {
        var miniBody = document.getElementById("miniboardBody");
  
        // Clear existing rows
        miniBody.innerHTML = "";
        var miniplace = 1;
        
        querySnapshot.forEach((doc) => {
        var username = doc.id;
        var score = doc.data().score;
  
        // Create a new row
        var minirow = miniBody.insertRow();
        
        // Add cells to the row
        var miniplaceCell = minirow.insertCell(0)
        var miniusernameCell = minirow.insertCell(1);
        var miniscoreCell = minirow.insertCell(2);
  
        // Push this specific information into the rows of the table
        miniplaceCell.innerHTML = miniplace++;
        miniusernameCell.innerHTML = username;
        miniscoreCell.innerHTML = score;
        });
    })
  }
topFive();