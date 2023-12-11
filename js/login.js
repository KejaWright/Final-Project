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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Display profile info//
function displayUserInfo(user) {
  var displayName = user.displayName;
  var email = user.email;
  var uid = user.uid;
  var score = user.totalScore;

  // Display user information in the HTML
  document.getElementById("profile_display").innerHTML = "Welcome, " + displayName + " (" + email + ")";
}
firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
      // User is signed in.
      const exist = document.getElementById('shopdisplay');
      exist.style.color = " rgb(250, 117, 8)";
      exist.style.pointerEvents = "auto";
      displayUserInfo(user);
   } else {
      console.log("There is no user logged in.");
      document.getElementById('profile_display').innerHTML = "No User Is Logged In."
   }
});
//Signout button//
$('#sign-out').click(function(){
    const user = firebase.auth().currentUser;
    if (user) {
        // If the user is signed in, sign them out
        firebase.auth().signOut()
        .then(() => {
            console.log("User signed out successfully.");
            displayUserInfo(); // Update UI after sign-out
            window.location.href = "account.html";
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
    } else {
        console.log("There is no user logged in.");
        document.getElementById('profile_display').innerHTML = "No User Is Logged In."
    }
});

//Delete User Button//

var firestore = firebase.firestore();
// Function to delete user
$('#delete_account').click(function(userId){
  var username = document.getElementById("newname").value;
  const user = firebase.auth().currentUser;//from authentication stuff
  var userId = user.uid;//user id
  var user2 = firestore.collection("Player Logins").doc(username);//from acutal database
  if (username == user.displayName){
    //delete user from authentication
    user.delete().then(function() {
      console.log("Auth User deleted successfully");
    }).catch(function(error) {
      console.error("Error deleting auth 3user:", error);
    });

    // Delete user data from Firestore
    user2.delete().then(() => {
      console.log("User deleted successfully");
    }).catch((error) => {
      console.error("Error deleting user:", error);
    })
  }else{
    console.log('Username does not exist');
    alert('This Username does not exist');
  }
});