<<<<<<< HEAD
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
    $('#game').toggle();
    $('#display-game').toggle();
    $('#start-button').toggle();

    //VERY BASIC START FOR LVL 1 VARIABLES//
    let currentLevel = 1;
    let currentlvltime = 0;
    let currentScore = 0;
    let curfinscore = 0;
    let totalScore = 0;
    let seconds = 180;
    let countdown;
    let gamePaused = false;
    let chosenIngred = [];
    let rtarray = [];
    let unlockedIngredients = ['sugar', 'bean'];
    let ingredperlvl = 2;
    displayIngredients();
    console.log(chosenIngred)

    //VERY SIMPLE TIMER I HOPE//
    if (start==1){
        if (!gamePaused) {
            countdown = setInterval(updateCountdown, 1000);
            function updateCountdown() {
                if (seconds > 0) {
                    seconds--;
                    const formattedMinutes = Math.floor(seconds / 60);
                    const formattedSeconds = seconds % 60;
                    document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;
                } else {//LVL END SCREEN STUFF//
                    clearInterval(countdown);
                    $('#display-game').toggle();
                    $('#finishlvl').toggle();                
                }
            }
        }
    }
    
    //PAUSE BUTTON ONLY PAUSE BECAUSE OF ALERT BE AWARE//
    $('#pause-button').click(function(){
        gamePaused = !gamePaused;
        alert('Game Paused');
        console.log("Game is paused.");
    })

    //NEXT LEVEL FUNCTION//
    $('#next-lvl').click(function nextLevel() {
        currentLevel++;
        document.getElementById('current-level').innerText = currentLevel;
        totalScore = totalScore;
        currentlvltime++;
        currentScore = 0;
        gamePaused = false;
        $('#display-game').toggle();
        $('#finishlvl').toggle(); 
        if (currentLevel <= 5) {
            seconds = 180 - currentlvltime*30 ; // Decrease the time limit for each level
            countdown = setInterval(updateCountdown, 1000);
            unlockIngredients();
            displayIngredients();
            updateDrinkTicket();
            updateScore();
        } else {
            alert('Congratulations! You completed all levels.');
        }
    });

    //RETRY LEVEL FUNCTION//
    $('#retry').click(function(){
        document.getElementById('current-level').innerText = currentLevel;
        currentScore = 0;
        curfinscore = 0;
        gamePaused = false;
        seconds = 180 - currentlvltime*30;
        document.getElementById('timer').innerText = seconds;
        countdown = setInterval(updateCountdown, 1000);
        $('#display-game').toggle();
        $('#finishlvl').toggle(); 
        updateCountdown();
    })

    //RESET LEVEL FUNCTION//
    $('#res-game').click(function(){
        currentLevel = 1;
        currentScore = 0;
        curfinscore = 0;
        totalScore = 0;
        seconds = 180;
        document.getElementById('timer').innerText = seconds;
        countdown = setInterval(updateCountdown, 1000);
        gamePaused = false;
        chosenIngred = [];
        $('#display-game').toggle();
        $('#finishlvl').toggle(); 
        updateCountdown();
    })

    //STUFF FOR REGISTERING CLICKING THE AVAILABLE BUTTONS FOR THE INGREDIENTS//
    function getIngredientName(index) {
        const allIngredients = ['sugar', 'bean', 'caramel', 'chips', 'wcream'];
        return allIngredients[index - 1];
    }

    function displayIngredients() { //shows the ingredients on the left side
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
                addIngredient(ingredientName);
            };
            ingredientsList.appendChild(ingredient);
        }
    }

    function addIngredient(ingredientName) {
        if (!gamePaused && unlockedIngredients.includes(ingredientName)) {
            chosenIngred.push(ingredientName);
            updateIngredientDisplay();
        }
    }

    function updateIngredientDisplay() {//DISPLAYS CHOSEN INGREDIENT IN COFFEE CUP
        const ingredientDisplay = document.getElementById('ingredient-display');
        ingredientDisplay.innerHTML = `Ingredients Placed: ${chosenIngred.join(', ')}`;
        console.log(chosenIngred);
    }

    //SHOWING STUFF ON THE DRINK TICKET ORDER THAT WILL RANDOMIZE//
    function updateDrinkTicket() {
        rtarray = [];
        const drinkTicket = document.getElementById('drink-ticket');
        const randomAmount = Math.floor(Math.random() * 3) + 1; // Random amount between 1 and 3
        const randomIngredientIndex = Math.floor(Math.random() * 2) + 1; // Random index for unlocked ingredients
        const randomIngredient = getIngredientName(randomIngredientIndex);
        rtarray.push(randomIngredient);
        console.log(randomIngredient);
        drinkTicket.innerText = `Add ${randomAmount} units of ${randomIngredient}`;
    }
    
    //SUMBITTING OR RESETTING DRINK BUTTONS//
    updateDrinkTicket();
    $('#make-coffee-but').click(function(){
        const ingredientDisplay = document.getElementById('ingredient-display');
        ingredientDisplay.innerHTML = `Ingredients Placed:`;
        if (!gamePaused) {
            //CALCULATING CURRENT LVL SCORE BASED ON ARRAY SIMILARITY//
            function areArraysEqual(chosenIngred, rtarray) {
                return chosenIngred.length === rtarray.length && chosenIngred.every((word, index) => word === rtarray[index]);
            }
            if (areArraysEqual(chosenIngred, rtarray)) {
                console.log("Arrays are equal");
                currentScore+=50;
                console.log(currentScore);
                updateScore();
                chosenIngred = [];
            } 
            else {
                console.log("Arrays are not equal");
                currentScore-=20;
                console.log(currentScore);
                updateScore();                
                chosenIngred = [];
            }
            const blendSection = document.getElementById('blend-section').value;//NEEDS WORK
            // Simulate making coffee by updating the coffee cup color based on the blend
            const coffeeCup = document.getElementById('coffee-cup');
            coffeeCup.style.backgroundColor = blendSection === 'light' ? '#FFD700' : blendSection === 'med' ? '#A52A2A' : '#2F4F4F';
            // Change the randomized ticket every "make drink" click
            updateDrinkTicket();
        }
    });

    $('#reset-coffee-but').click(function(){
        const ingredientDisplay = document.getElementById('ingredient-display');
        ingredientDisplay.innerHTML = `Ingredients Placed:`;
        chosenIngred = [];
        console.log(chosenIngred);
    }) 
    
    //DISPLAYING CURRENT LVL SCORE//
    function updateScore() {
        const currentScoreElement = document.getElementById('currentscore');
        const totalScoreElement = document.getElementById('totalscore');
        const currentScoreFin = document.getElementById('current-score');
        const totalScoreFin = document.getElementById('total-score');
        //CALCULATING TOTAL SCORE AND DISPLAYING TOTAL AND CURRENT SCORE OVERALL;
        currentScoreElement.innerText = currentScore;
        if (seconds < 1){
            curfinscore = currentScore;
            totalScore += curfinscore;
            totalScoreElement.innerText = totalScore;
            currentScoreFin.innerText = currentScore;      
            totalScoreFin.innerText = totalScore;
        }
        else{
            curfinscore = 0;
        }  
    }

    //RANK DETERMINATION//
    var rankA = document.getElementById('rankA');
    var rankB = document.getElementById('rankB');
    var rankC = document.getElementById('rankC');
    var rankD = document.getElementById('rankD');
    var rankF = document.getElementById('rankF');
    let rank;
    switch (true) {
        case totalScore >= 90:
          rank = rankA;
          //add to firebase
          //push to leaderboard//
          break;
        case totalScore >= 80:
          rank = rankB;
          //add to firebase
          //push to leaderboard//
          break;
        case totalScore >= 70:
          rank = rankC;
          //add to firebase
          //push to leaderboard//
          break;
        case totalScore >= 60:
          rank = rankD;
          //add to firebase
          //push to leaderboard//
          break;
        default:
          rank = rankF;
          //add to firebase
          //push to leaderboard//
      }
    
      /////LEADERBOAD INFOMRATION TO PUSH TO LEADERBOARD FROM FIREBASE/////

    // Function to update the leaderboard from Firebase data
    /*function updateLeaderboard() {
        const leaderboardBody = document.getElementById('leaderboardBody');
        leaderboardBody.innerHTML = '';

        // Reference to the players data in Firebase
        const playersRef = database.ref('players');

        playersRef.orderByChild('score').once('value')
        .then(snapshot => {
            const players = [];
            snapshot.forEach(childSnapshot => {
            const playerData = childSnapshot.val();
            players.push(playerData);
            });

            // Sort players in descending order based on score
            players.sort((a, b) => b.score - a.score);

            // Update the leaderboard
            players.forEach((player, index) => {
            const row = `<tr>
                            <td>${index + 1}</td>
                            <td>${player.name}</td>
                            <td>${player.totalScore} (${player.rank})</td>
                        </tr>`;
            leaderboardBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Error fetching data from Firebase:', error);
        });
    }

    // Call the function to initially populate the leaderboard
    updateLeaderboard();*/




});
=======
// put data in database after all the playing is done
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

>>>>>>> 41140ebcfaa26fc087fc6981dfb5f7c349963e6a
