//reserved for login/signup

// password field
var password_field = document.getElementById("password");
var username_field = document.getElementById("username");

// create account button
var create_account_button = document.getElementById("create-account-button");

// get the user's password
function getPassword() {
  var mypassword = password_field.value;
  return mypassword;
}

// get the user's username
function getUsername() {
  var myusername = username_field.value;
  return myusername;
}

// function that checks the username length to make sure it is in the minimum length and maximum length requirements.
function checkUsernameLength() {
  let username_min_length = parseInt(username_field.getAttribute("minlength"));
  let username_max_length = parseInt(username_field.getAttribute("maxlength"));

  if (getUsername().length < username_min_length || getUsername().length > username_max_length) {
    return false;
  } else {
    return true;
  }
}

// function that validates the password length to make sure it is in the minimum length and maximum length requirements.
function checkPasswordLength() {

  var password_field_min_length = parseInt(password_field.getAttribute("minlength"));
  var password_field_max_length = parseInt(password_field.getAttribute("maxlength"));

  if (getPassword().length < password_field_min_length || getPassword().length > password_field_max_length) {
    return false;
  } else {
    return true;
  }

}

// function that checks the password to make sure it matches the pattern.
function makeSureThePasswordMatchesPattern() {

  let password_pattern = password_field.getAttribute("pattern");
  if(getPassword().match(password_pattern)) {
    return true;
  } else {
    return false;
  }
  
}

// function that checks to make sure the username matches the pattern.
function makeSureTheUsernameMatchesPattern() {
  let username_pattern = username_field.getAttribute("pattern");
  if(getUsername().match(username_pattern)) {
    console.log("Username good");
    return true;
  } else {
    console.log("username bad");
    return false;
  }
}

// this function clears the textboxes in the form
function clearTextboxes() {
  password_field.value = "";
  username_field.value = "";
}

// this function shows on the form labels that the player's credentials are valid
function showThatPlayerCredentialsAreValid() {
  window.alert("Account successfully created! Now login with your new password and enjoy the game!");
}

// this function checks to make sure that the password has the right length and matches the pattern
function checkpasswordRequirements() {
  if(makeSureThePasswordMatchesPattern() && checkPasswordLength()) {
    return true;
  } else {
    return false;
  }
}

// this function checks to make sure that the username has the right length and matches the pattern
function checkusernameRequirements() {
  if(makeSureTheUsernameMatchesPattern() && checkUsernameLength()) {
    return true;
  } else {
    return false;
  }
}

// this function validates both the username and the password in order to find out if the user's credentials
// can be pushed into a database.
function checkUsernameAndPasswordForDatabase() {
  if(checkpasswordRequirements() && checkusernameRequirements()) {
    console.log("true");
    showThatPlayerCredentialsAreValid();
    return true;
  } else {
    console.log("false");
    return false;
  }
}

// register event handler to create account button to create an account if the account credentials are valid.
create_account_button.addEventListener("click", checkUsernameAndPasswordForDatabase, false);





//reserved for delete button




//reserved for coffee game
