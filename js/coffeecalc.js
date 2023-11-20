<<<<<<< HEAD
$('#start-button').click(function(){
    $('#game').toggle();
    $('#start-button').toggle();
/////OBJECTS AND STUFF FOR THE GAME///////
///VERY BASIC SETUP///
const canvas = document.getElementById("game");
if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    //left box for orders
    ctx.fillStyle = "#946B34";
    ctx.fillRect(0, 50, 200, 500);
    //right box for ingredients
    ctx.fillStyle = "#583D1A";
    ctx.fillRect(800, 50, 200, 500);
    //top box for score and stuff
    ctx.fillStyle = "#FF9300";
    ctx.fillRect(0, 0, 1000, 50);
    //bottom box for blend types
    ctx.fillStyle = "#FF9300";
    ctx.fillRect(200, 450, 600, 100);
    
}

//Order display


////Ingredients Display




////Blend options menu Display



////Top menu bar
//






//////MATH AND STUFF FOR THE GAME//////
////Adding ingredients
})
=======
//all types of calculations will occur here :)

//reserved for profile pic




//reserved for login/signup
// These lines are for the username. Give the username field maxlength and minlength attributes
var username_field = document.getElementById("username");
var username_notification_label = document.getElementById("notification-username-label");
var username_min_length = 5;
var username_max_length = 8;
username_field.setAttribute("minlength", username_min_length);
username_field.setAttribute("maxlength", username_max_length);

// These lines are for the password.  Give the password field maxlength and minlength attributes
var password_field = document.getElementById("password");
var password_notification_label = document.getElementById("notification-password-label");

var password_field_min_length = 8;
var password_field_max_length = 12;
password_field.setAttribute("minlength", password_field_min_length);
password_field.setAttribute("maxlength", password_field_max_length);

// account constructor
const account = {
  username: username_field.value,
  password: password_field.value,
  get_password: function() {
    return this.password;
  },
  get_username: function() {
    return this.username;
  }
};

// account array
var account_array = [];


var create_account_button = document.getElementById("create-account-button");

// function that checks the username length to make sure it is in the minimum length and maximum length requirements.
function checkUsernameLength() {
  let username = username_field.value;
  
  if(username.length < username_min_length || username.length > username_max_length) {
    username_notification_label.textContent = "Username must be between 5 to 8 characters";
    username_notification_label.style.color = "red";
    return false;
  } else {
    return true;
  }
}


// function that checks if password contains spaces.
function makeSurePasswordHasNoSpacesOrUnderscores() {
  let mypassword = password_field.value;
  if(mypassword.includes(" ") || mypassword.includes("_")) {
    return false;
  } else {
    return true;
  }
}

// function to check the password for duplicate characters
//https://www.youtube.com/watch?v=CHTm5uInC9g is where I got this algorithm.
function checkPasswordForDuplicateCharacters() {
  let mypassword = password_field.value;
  for(var i = 0; i < mypassword.length; i++) {
    for(var j = i + 1; j < mypassword.length; j++) 
      if(mypassword[i] == mypassword[j]) {
        return false;
      } else {
        continue;
      }
  }
  return true;
}

// function that validates the password length 
function checkLengthOfPassword() {
  
  let mypassword = password_field.value;


  
  if(mypassword.length < password_field_min_length || mypassword.length > password_field_max_length) {
    return false;
  } else {
    return true;
  }

}

//https://stackoverflow.com/questions/32311081/check-for-special-characters-in-string.  
// The link above is mainly for the citation of the use of the match() method for the checkTheNumberOfDigitsInPassword() and checkTheNumberOfDigitsInPassword() methods, 
// and the regex for the method in checkTheNumberOfSpecialCharactersInPassword().
// function that checks the number of special characters
function checkTheNumberOfSpecialCharactersInPassword() {
  let number_of_special_characters = 0;
  let mypassword = password_field.value;

  for(var i = 0; i < mypassword.length; i++) {
    if(mypassword.charAt(i).match(/[!-\/:-@[-`{-~]/)) {
      number_of_special_characters += 1;
    }
  }

  // checks to make sure the password has at least 2 special characters
  if(number_of_special_characters < 2) {
    return false;
  } else {
    return true;
  }

}

// function that makes sure the password has the right number of digits
function checkTheNumberOfDigitsInPassword() {
  let number_of_digits = 0;
  let mypassword = password_field.value;

  for(var i = 0; i < mypassword.length; i++) {
    if(mypassword.charAt(i).match(/[0-9]/)) {
      number_of_digits += 1;
    }
  }

  if(number_of_digits < 2) {
    return false;
  } else {
    return true;
  }

}

//https://stackoverflow.com/questions/1027224/how-can-i-test-if-a-letter-in-a-string-is-uppercase-or-lowercase-using-javascrip is a citation for the lines code in 
//  the checkTheNumberOfUpperCaseLettersInPassword() and checkTheNumberOfLowerCaseLettersInPassword() methods that are implementing the toUppercase() and toLowercase() methods and "===".
// function that checks how many upper case letters there are.  The total number of uppercase letters should be more than or equal 1
function checkTheNumberOfUpperCaseLettersInPassword() {
  let number_of_uppercase_characters = 0;
  let mypassword = password_field.value;
  for(var i = 0; i < mypassword.length; i++) {
    if(mypassword.charAt(i) === mypassword.charAt(i).toUpperCase()) {
      number_of_uppercase_characters += 1;
    }
  }

  // checks to make sure the password has at least 2 uppercase characters
  if(number_of_uppercase_characters < 1) {
    return false;
  } else {
    return true;
  }
}

function checkTheNumberOfLowerCaseLettersInPassword() {
  let number_of_lowercase_characters = 0;
  let mypassword = password_field.value;
  for(var i = 0; i < mypassword.length; i++) {
    if(mypassword.charAt(i) === mypassword.charAt(i).toLowerCase()) {
      number_of_lowercase_characters += 1;
    }
  }

  // checks to make sure the password has at least 2 lowercase characters
  if(number_of_lowercase_characters < 1) {
    return false;
  } else {
    return true;
  }
}

// function that checks all password requirements using an if-else ladder and the other password methods that return a boolean.
function makeSureThePasswordMeetsAllRequirements() {
  password_notification_label.style.color = "red";
  if(!makeSurePasswordHasNoSpacesOrUnderscores()) {
    password_notification_label.textContent = "Password contains a space. Please try again.";
    return false;
  } if(!checkPasswordForDuplicateCharacters()) {
    password_notification_label.textContent = "Password contains duplicate characters. Please try again.";
    return false;
  } if(!checkLengthOfPassword()) {
    password_notification_label.textContent = "Password must be between 8 and 12 characters long. Please try again.";
    return false;
  } if(!checkTheNumberOfDigitsInPassword()) {
    password_notification_label.textContent = "Password must contain at least 2 digits.";
    return false;
  } if(!checkTheNumberOfSpecialCharactersInPassword()) {
    password_notification_label.textContent = "Password must contain at least 2 special characters.";
    return false;
  } if(!checkTheNumberOfUpperCaseLettersInPassword()) {
    password_notification_label.textContent = "Password must contain at least 1 uppercase letter.";
    return false;
  } if(!checkTheNumberOfLowerCaseLettersInPassword()) {
    password_notification_label.textContent = "Password must contain at least 1 lowercase letter";
    return false;
  } else {
    return true;
  }
}

// function that creates an account object
function createAccount() {

  let mypassword = password_field.value;
  let myusername = username_field.value;

  const myaccount = Object.create(account);
  myaccount.password = mypassword;
  myaccount.username = myusername;

  account_array.push(myaccount);

  for(var i = 0; i < account_array.length; i++) {
    console.log(account_array[i]);
  }
  
}

// this function clears the textboxes in the form
function clearTextboxes() {
  password_field.value= "";
  username_field.value = "";
}

// this function is to put the account objects in the array into a database
function putAccountsIntoDataBase() {

}

// function that checks both the password and username requirements all in one function.
function makeSurePasswordAndUsernameMeetRequirements() {
  if(makeSureThePasswordMeetsAllRequirements() & checkUsernameLength()) {
    
    username_notification_label.textContent = "Username successful";
    username_notification_label.style.color = "green";
    password_notification_label.textContent = "Password successful";
    password_notification_label.style.color = "green";
    
    // execute the notify method for the notification labels
    createAccount();
    // clear textboxes before logging in
    clearTextboxes();
    // window alert to tell the user to login with new username and password
    window.alert("Account successfully created! Now login with your new password and enjoy the game!");
    return true;
  } else {
    return false;
  }
}





// register event handler to create account button to create an account if the account credentials are valid.
create_account_button.addEventListener("click", makeSurePasswordAndUsernameMeetRequirements, false);






// function that validates the user's password



//reserved for delete button




//reserved for coffee game
>>>>>>> e299fb817d57920c219d059e3999d907e77d285c
