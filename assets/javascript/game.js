// Declare variables
    //List of League of Legends champions from 2012
    var championNames = ["Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "Blitzcrank", "Brand", "Caitlyn", "Cassiopeia", "Cho'gath", "Corki", "Dr. Mundo", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Irelia", "Janna", "Jarvan IV", "Jax", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kennen", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nasus", "Nautilus", "Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Pantheon", "Poppy", "Rammus", "Renekton", "Riven", "Rumble", "Ryze", "Sejuani", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Talon", "Taric", "Teemo", "Tristana", "Trundle", "Trydamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xerath", "Xin Zhao", "Yorick", "Ziggs", "Zilean"]

    // var championNames = ["Lee Sin", "Some Guy", "Twisted Fate"]
    

    var chosenName = "";
    var chosenNameLower = "";
    var userGuess = "";
    var answerArray = [];
    var nameCheck = "";
    var guesses = [];
    var health = 10;
    var wins = 0;
    var losses = 0;
    var hasLetter = false;

    // Get Elements
    var setBlank = document.getElementById("blankName");
    var lettersUsed = document.getElementById("letters-used");
    var healthText = document.getElementById("health-text");
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
window.onload = function(){
    resetGame();
}
    function resetGame(){
        //Reset variables
        answerArray = [];
        nameCheck = "";
        health = 10; 
        healthText.innerText = health;
        
        // Get random name from array
    chosenName = championNames[Math.floor(Math.random()*championNames.length)];

    console.log(chosenName);
    nameCheck = chosenName.replace(' ','-');
    
    // Get empty spaces for random name
    for (var i=0; i < chosenName.length; i++){
        if(chosenName[i] === "'"){answerArray[i] = " ' ";}
        else if(chosenName[i] === " "){
            answerArray[i] = "-";
    }
        else if(chosenName[i] === "."){answerArray[i] = " . "}
        else{
            answerArray[i] = " _ ";
        }
    }

    chosenNameLower = chosenName.toLowerCase();
    
    setBlank.innerText = answerArray.join('');

    guesses = [];
    lettersUsed.innerText = guesses.join("");
    }

    document.onkeyup = function(event) {
        userGuess = event.key;
        checkGuesses(userGuess.toLowerCase());
    }

    // check if letter has been used
    function checkGuesses(guess){
        hasLetter = false;
        for(var i=0;i<guesses.length;i++){
            if(guess === guesses[i]){
                hasLetter = true;
            }
        }
        if(hasLetter){
            alert("You guessed that letter already! Choose another letter.");
        }
        else{
            guesses.push(guess);
            lettersUsed.innerText = (guesses.join("") + " ");
            compareGuess(guess);
        }
    }

    // Compare guess letter to chosenName[i] if same, replace blank with actual letter
    function compareGuess(guess){
        // boolean to check if array has letter
        hasLetter = false;
        for(var i=0;i<chosenName.length;i++){
            if(guess === chosenNameLower[i]){
                answerArray[i] = chosenName[i];
                hasLetter=true;
            }
        }
        // lose health if guess is not in chosen Name
        if(!hasLetter){
            health--;
            healthText.textContent = health;
            checkHealth();
        }
        else{
            setBlank.innerText = answerArray.join('');
            // check if equals array
            if(arraysEqual()){
                wins++;
                winsText.innerText = wins;
                // set timeout so confirm happens after setting text
                setTimeout(function(){
                    if(confirm("Congratulations! You won. Play another?")){
                        resetGame();
                    }
                },10);
            }
        }
    }

    function arraysEqual() {
        var differentLetters = 0;
        for(var i=0; i < chosenName.length;i++){
            if(!(answerArray[i] == nameCheck[i])){
                differentLetters++;
            }
        }
        if(differentLetters > 0){
            return false;
        }
        else{
            return true;
        }
    }
    // Function to check for health
    function checkHealth(){
        if(health <= 0){
            revealAnswer();
            losses++;
            lossesText.innerText = losses;
            setTimeout(function(){
                if(confirm("Game Over! You lost. Play Again?")){
                    resetGame();
                }
            },10);
            
        }
    }

    function revealAnswer(){
        for(var i=0;i<chosenName.length;i++){
            answerArray[i] = chosenName[i];
        }
        setBlank.innerText = answerArray.join('');
    }
/*
        * integrate letters for mobile under certain screen size
        * 
    */