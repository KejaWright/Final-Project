var start = 0;//FOR TIMER//
//BUTTON CLICK NOISES//
function playSound() {
    const sound = document.getElementById('clickSound');
    sound.play();
}

//THE LITERAL ACTUAL GAME NOW RIGHT UNDER HERE//
$('#start-button').click(function(){
    start = 1;//FOR TIMER//
    ///DISPLAYING THE GAME///
    $('#read_rules').toggle();
    $('#game').toggle();
    $('#display-game').toggle();
    $('#start-button').toggle();

    //MUSIC//
    const backMus = document.getElementById('backgroundMusic');
    // Restart playback when the audio reaches the end
    backMus.addEventListener('ended', () => {
        backMus.currentTime = 0; // Reset playback to the beginning
        backMus.play();
    });
    // Start playback automatically
    backMus.play();

    //VERY BASIC START FOR LVL 1 VARIABLES//
    let currentLevel = 1;
    let currentlvltime = 0;
    let currentScore = 0;
    let curfinscore = 0;
    let totalScore = 0;
    let seconds = 180;
    let countdown;
    let chosenIngred = [];
    let rtarray = [];
    let ingredperlvl = 5;
    displayIngredients();
    displayBlend();
    console.log(chosenIngred)
    
    //VERY SIMPLE TIMER I HOPE//
    if (start==1){
        countdown = setInterval(updateCountdown, 1000);
        function updateCountdown() {
            if (seconds > 0) {
                seconds--;
                const formattedMinutes = Math.floor(seconds / 60);
                const formattedSeconds = seconds % 60;
                document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
            } else {//LVL END SCREEN STUFF//
                clearInterval(countdown);
                updateScore();
                gameover();
                $('#display-game').toggle();
                $('#finishlvl').toggle();
                const sound = document.getElementById('endsong');
                sound.play();
            }
        }
    }
    
    //PAUSE BUTTON ONLY PAUSE BECAUSE OF ALERT BE AWARE//
    var pauseclick = 0;
    $('#pause-button').click(function(){
        pauseclick += 1
        clearInterval(countdown);
        console.log("Game paused.");
        backMus.pause();
        if (pauseclick ==2){
            backMus.play()
            countdown = setInterval(updateCountdown, 1000);
            console.log(pauseclick);
            pauseclick = 0;
        }
        
    })

    //FUNCTION FOR THE BUTTON NAMED NEXT LVL//
    $('#next-lvl').click(function nextLevel() {  
        if (currentLevel < 5) {
            seconds = 180 - currentlvltime*30 ; // Decrease the time limit for each level
            countdown = setInterval(updateCountdown, 1000); 
            rtarray = [];
            chosenIngred = [];
            document.getElementById('ingredient-display').innerHTML = `Ingredients Placed:`;
            currentLevel++;
            document.getElementById('current-level').innerText = currentLevel;
            totalScore = totalScore;
            currentlvltime++;
            currentScore = 0;
            $('#display-game').toggle();
            $('#finishlvl').toggle(); 
            displayIngredients();
            displayBlend()
            updateDrinkTicket();
            updateScore();
        } else {
            alert('Congratulations! You completed all levels.');
        }
    });

    //FUNCTION FOR THE BUTTON NAMED RETRY//
    $('#retry').click(function(){
        rtarray = [];
        chosenIngred = [];
        document.getElementById('ingredient-display').innerHTML = `Ingredients Placed:`;
        document.getElementById('current-level').innerText = currentLevel;
        currentScore = 0;
        curfinscore = 0;
        seconds = 180 - currentlvltime*30;
        document.getElementById('currentscore').innerText = currentScore;
        document.getElementById('totalscore').innerText = totalScore;
        document.getElementById('timer').innerText = seconds;
        countdown = setInterval(updateCountdown, 1000);
        $('#display-game').toggle();
        $('#finishlvl').toggle(); 
        updateCountdown();
    })

    //FUNCTION FOR THE BUTTON NAMED RESET GAME//
    $('#res-game').click(function(){
        rtarray = [];
        chosenIngred = [];
        document.getElementById('ingredient-display').innerHTML = `Ingredients Placed:`;
        currentLevel = 1;
        currentScore = 0;
        curfinscore = 0;
        totalScore = 0;
        seconds = 180;
        document.getElementById('current-level').innerText = currentLevel;
        document.getElementById('currentscore').innerText = currentScore;
        document.getElementById('totalscore').innerText = totalScore;
        document.getElementById('timer').innerText = seconds;
        countdown = setInterval(updateCountdown, 1000);
        $('#display-game').toggle();
        $('#finishlvl').toggle(); 
        updateCountdown();
    })

    //STUFF FOR REGISTERING CLICKING THE AVAILABLE BUTTONS FOR THE INGREDIENTS//
    function getIngredientName(index) {
        const allIngredients = ['bean', 'sugar', 'caramel', 'wcream', 'chips'];//all types of ingredients
        return allIngredients[index - 1];
    }

    function displayIngredients() { //SHOWS INGREDIENTS ON THE LEFT SIDE OF THE GAME IN RED BOX
        const ingredientsList = document.getElementById('ingredients-list');
        ingredientsList.innerHTML = '';
        for (let i = 1; i <= ingredperlvl; i++) {
            const ingredientName = getIngredientName(i);
            const ingredient = document.createElement('button');
            console.log(ingredientName);
            ingredient.className = 'ingredient';
            ingredient.innerHTML = '<img src="img/'+ingredientName+'.png" style="background-size: cover">';
            ingredient.onclick = function () {
                playSound();
                chosenIngred.push(ingredientName);
                updateIngredientDisplay();
            };
            ingredientsList.appendChild(ingredient);
        }
    }

    function updateIngredientDisplay() {//DISPLAYS INGREDIENTS AND BLEND CHOSEN BY THE PLAYER IN COFFEE CUP
        const ingredientDisplay = document.getElementById('ingredient-display');
        ingredientDisplay.innerHTML = `Ingredients Placed: ${chosenIngred.join(', ')}`;
        console.log(chosenIngred);
    }

    function getBlendName(index) {
        const allBlend = ['light', 'medium', 'dark'];//all types of blend
        return allBlend[index - 1];
    }

    function displayBlend() { //SHOWS BLEND TYPE IN THE BOTTOM ORANGE BOX
        const blendList = document.getElementById('blend-list');
        blendList.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
            const blendName = getBlendName(i);
            const blendType = document.createElement('button');
            console.log(blendName);
            blendType.className = 'blend';
            blendType.innerHTML = blendName;
            
            blendType.onclick = function () {
                playSound();
                chosenIngred.push(blendName);
                updateIngredientDisplay();
            };
            blendList.appendChild(blendType);
        }
    }

    //SHOWING STUFF ON THE DRINK TICKET ORDER THAT WILL RANDOMIZE//
    function updateDrinkTicket() {
        rtarray = [];
        const drinkTicket = document.getElementById('drink-ticket');
        const randomBlendIndex = Math.floor(Math.random() * 3) + 1;//RANDOM BLEND TYPE FROM 3 TYPES (DARK, MEDIUM, LIGHT)
        const randomBlend = getBlendName(randomBlendIndex);
        const coffeeCup = document.getElementById('coffee-cup');
        coffeeCup.style.backgroundColor = randomBlend === 'light' ? '#FFD700' : randomBlend === 'medium' ? '#A52A2A' : '#2F4F4F';//HINT FOR BLEND TYPE
        const randomAmount1 = Math.floor(Math.random() * 3) + 1; // Random amount between 1 and 3
        const randomAmount2 = Math.floor(Math.random() * 3) + 1; // Random amount between 1 and 3
        var randomAmount3 = 0; var randomAmount4 = 0; var randomAmount5 = 0;//WILL CHANGE AFTER 2ND LEVEL ENDS
        if(currentLevel >2){
            randomAmount3 = Math.floor(Math.random() * 3) + 1; // Random amount between 1 and 3;
            if(currentLevel >3){
                randomAmount4 = Math.floor(Math.random() * 3) + 1; // Random amount between 1 and 3;
                if(currentLevel >4){
                    randomAmount5 = Math.floor(Math.random() * 3) + 1; // Random amount between 1 and 3;
                }
            }
        }
        rtarray = Array.from({length: randomAmount1}, () => 'bean')//push x amount of bean to rtarray
        .concat(Array.from({length: randomAmount2}, () => 'sugar'))//push x amount of sugar to rtarray
        .concat(Array.from({length: randomAmount3}, () => 'caramel'))//push x amount of caramel to rtarray
        .concat(Array.from({length: randomAmount4}, () => 'wcream'))//push x amount of chips to rtarray
        .concat(Array.from({length: randomAmount5}, () => 'chips'))//push x amount of wcream to rtarray
        .concat(Array.from({length: 1}, () => randomBlend));//push type of blend
        drinkTicket.innerHTML = `This Drink Needs (IN ORDER): 
        <ul><li>${randomAmount1} units of BEAN<li>
        <li>${randomAmount2} units of SUGAR<li>
        <li>${randomAmount3} units of CARAMEL<li>
        <li>${randomAmount4} units of WHIPPED CREAM<li>
        <li>${randomAmount5} units of CHOCO CHIPS<li></ul>
        with ${randomBlend} blend type`;
        console.log(rtarray);
    }
    
    //SUMBITTING OR RESETTING DRINK BUTTONS//
    updateDrinkTicket();
    $('#make-coffee-but').click(function(){
        const ingredientDisplay = document.getElementById('ingredient-display');
        ingredientDisplay.innerHTML = `Ingredients Placed:`;
        //CALCULATING CURRENT LVL SCORE BASED ON ARRAY SIMILARITY//
        function areArraysEqual(chosenIngred, rtarray) {
            return chosenIngred.length === rtarray.length && chosenIngred.every((word, index) => word === rtarray[index]);
        }
        if (areArraysEqual(chosenIngred, rtarray)) {
            console.log("Arrays are equal");
            const sound = document.getElementById('correct');
            sound.play();
            currentScore+=50;
            console.log(currentScore);
            updateScore();
            chosenIngred = [];
        } 
        else {
            console.log("Arrays are not equal");
            const sound = document.getElementById('incorrect');
            sound.play();
            currentScore-=20;
            console.log(currentScore);
            updateScore();                
            chosenIngred = [];
        }
        // Change the randomized ticket every "make drink" click
        updateDrinkTicket();
    });

    $('#reset-coffee-but').click(function(){
        document.getElementById('ingredient-display').innerHTML = `Ingredients Placed:`;
        chosenIngred = [];
        console.log(chosenIngred);
    });
    
    //DISPLAYING CURRENT LVL SCORE//
    function updateScore() {
        //CALCULATING TOTAL SCORE AND DISPLAYING TOTAL AND CURRENT SCORE OVERALL;
        document.getElementById('currentscore').innerText = currentScore;
        if (seconds < 1){
            curfinscore = currentScore;
            console.log(curfinscore);
            totalScore += curfinscore;
            document.getElementById('totalscore').innerText = totalScore;
            document.getElementById('current-score').innerText = currentScore;      
            document.getElementById('total-score').innerText = totalScore;
        }
        else{curfinscore = 0;}
    }

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

    //AFTER THE GAME FINISHES//
    function gameover(){
        const user = firebase.auth().currentUser;
        if(currentLevel == 5 && seconds > 1){
            if (user) {
                // Get the user's unique ID (UID)
                const userId = user.uid;
                // Reference to the user's data in the Realtime Database
                const userRef = firebase.database().ref('users/' + userId);
                // Assume you want to update the user's taskCompleted field
                userRef.update({
                    "score": totalScore,
                    "rank": rank
                })
                .then(() => {
                  console.log('score and rank updated in the database');
                })
                .catch(error => {
                  console.error('Error updating score and rank', error);
                });
            }else {
                console.log('No user is currently logged in.');
            }
            //add totscore and rank to user from database
            userDocRef.update(userinfo)
            .then(() => {
                console.log('User information updated in Firestore');
            })
            .catch(error => {
                console.error('Error updating user information:', error);
            });
        }
    };

    //RANK DETERMINATION//
    let rank;
    switch (true) {
        case totalScore >= 5000:
          rank = "A";
          break;
        case totalScore >= 4000:
          rank = "B";
          break;
        case totalScore >= 3000:
          rank = "C";
          break;
        case totalScore >= 2000:
          rank = "D";
          break;
        default:
          rank = "F";
      }
});