// Declare variables
    //List of League of Legends champions from 2012
    var championNames = ["Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "Blitzcrank", "Brand", "Caitlyn", "Cassiopeia", "Cho'gath", "Corki", "Dr. Mundo", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Irelia", "Janna", "Jarvan IV", "Jax", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kennen", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nasus", "Nautilus", "Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Pantheon", "Poppy", "Rammus", "Renekton", "Riven", "Rumble", "Ryze", "Sejuani", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Talon", "Taric", "Teemo", "Tristana", "Trundle", "Trydamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xerath", "Xin Zhao", "Yorick", "Ziggs", "Zilean"]
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    // var championNames = ["Dr. Mundo","Twisted Fate"];
    

    var chosenName = "";
    var chosenNameLower = "";
    var userGuess = "";
    var nameCheck = "";
    var answerArray = [];
    var guesses = [];
    var health = 10;
    var wins = 0;
    var losses = 0;
    var hasLetter = false;
    var isLetter = false;

    // Get Elements
    var setBlank = document.getElementById("blankName");
    var lettersUsed = document.getElementById("letters-used");
    var healthText = document.getElementById("health-text");
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
    var healthBar = document.getElementById("health-bar");
    var gameLetters = $('.letters');

window.onload = function(){
    newGame();
}
    function newGame(){
        //Reset variables
        answerArray = [];
        nameCheck = "";
        health = 10; 
        healthText.innerText = health;
        healthBar.style.width = (health*10) +'%';
        healthBar.innerText = (health*10) + '%';
        healthBar.className = "progress-bar center-block bg-success";
        isLetter = false;
        loadLetters();
        
        // Get random name from array
    chosenName = championNames[Math.floor(Math.random()*championNames.length)];

    nameCheck = chosenName.replace(' ','-');
    
    // Get empty spaces for random name
    for (var i=0; i < chosenName.length; i++){
        if(chosenName[i] === "'"){answerArray[i] = " ' ";}
        else if(chosenName[i] === " "){
            answerArray[i] = "-";
    }
        else if(chosenName[i] === "."){answerArray[i] = "."}
        else{
            answerArray[i] = " _ ";
        }
    }

    chosenNameLower = chosenName.toLowerCase();
    
    setBlank.innerText = answerArray.join('').replace('-', "   ");

    guesses = [];
    lettersUsed.innerText = guesses.join("");
    }
    function resetGame(){
        losses++;
        lossesText.innerText = losses;
        newGame();
    }

    // When Key is Pressed run this
    document.onkeyup = function(event) {
        userGuess = event.key.toLocaleLowerCase();
        isLetter = false;
        for(var i=0; i < letters.length;i++){
            if (userGuess === letters[i]){
                isLetter = true;
            }
        }
        if(isLetter){
            disableButton(userGuess);
            checkGuesses(userGuess);
        }
        else{
            alert("Please only enter a letter!");
        }
    }
    // TODO: ADD BUTTON FUNCTIONALITY FOR MOBILE
    function loadLetters(){
        gameLetters.empty();
        for(var i=0;i<letters.length;i++){
            gameLetters.append('<button type="button" id="letter' + letters[i] + '" class="btn btn-outline-warning btn-sm game-letters" value="' + letters[i] +'" onClick="letterOnClick(this.value)">'+letters[i]+'</button>')
        }
    }

    function disableButton(letter){
        $('#letter'+letter).attr('disabled',true);
        $('#letter' + letter).toggleClass('btn-outline-warning', 'btn-outline-secondary');
    }

    function letterOnClick(value){
        disableButton(value);
        checkGuesses(value);
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
            healthBar.style.width = (health*10) +'%';
            healthBar.innerText = (health*10) + '%';
            if(health >5){
                healthBar.className = "progress-bar center-block bg-success";
            }
            else if(health > 3 && health <=5){
                healthBar.className = "progress-bar center-block bg-warning";
            }
            else if(health <= 3){
                healthBar.className = "progress-bar center-block bg-danger";
            }
            checkHealth();
        }
        else{
            setBlank.innerText = answerArray.join('').replace('-',"   ");
            // check if equals array
            if(arraysEqual()){
                wins++;
                winsText.innerText = wins;
                // set timeout so confirm happens after setting text
                setTimeout(function(){
                    if(confirm("Congratulations! You won. Play another?")){
                        newGame();
                    }
                },10);
            }
        }
    }

    // Checks if array equals array, if it does, then return true
    function arraysEqual() {
        // Flag to check if differences appear
        var differentLetters = 0;
        for(var i=0; i < chosenName.length;i++){
            if(!(answerArray[i] == nameCheck[i])){
                differentLetters++;
            }
        }
        // if greater than zero return false 
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
                    newGame();
                }
            },10);
            
        }
    }

    function revealAnswer(){
        for(var i=0;i<chosenName.length;i++){
            answerArray[i] = chosenName[i];
        }
        setBlank.innerText = answerArray.join('').replace('-',"   ");
    }