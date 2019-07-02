// Declare variables

    //List of League of Legends champions from 2012
    var championNames = ["Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "Blitzcrank", "Brand", "Caitlyn", "Cassiopeia", "Cho'gath", "Corki", "Dr. Mundo", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Irelia", "Janna", "Jarvan IV", "Jax", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kennen", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nasus", "Nautilus", "Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Pantheon", "Poppy", "Rammus", "Renekton", "Riven", "Rumble", "Ryze", "Sejuani", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Talon", "Taric", "Teemo", "Tristana", "Trundle", "Trydamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xerath", "Xin Zhao", "Yorick", "Ziggs", "Zilean"]

    // For testing space, . and '
    // var championNames = ["Miss Fortune", "Jarvan IV", "Dr. Mundo","Kog'Maw"]

    var chosenName = "";
    var chosenNameLower = "";
    var answerArray = [];
    var guesses = [];
    var userGuess = "";
    var health = 10;
    var hasLetter = false;
    var setBlank = document.getElementById("blankName");
    var lettersUsed = document.getElementById("letters-used");
    var healthText = document.getElementById("health-text");
    
    // Get random name from array
    var chosenName = championNames[Math.floor(Math.random()*championNames.length)];
    chosenNameLower = chosenName.toLowerCase();
    console.log(chosenName);
    
    // Get empty spaces for random name
    for (var i=0; i < chosenName.length; i++){
        if(chosenName[i] === "'"){answerArray[i] = " ' ";}
        else if(chosenName[i] === " "){answerArray[i] = " - ";}
        else if(chosenName[i] === "."){answerArray[i] = " . "}
        else{
            answerArray[i] = " _ ";
        }
    }
    
    setBlank.innerText = answerArray.join('');

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
            alert("You have guessed that letter already! Choose another letter.");
        }
        else{
            guesses.push(guess);
            lettersUsed.innerText = guesses.join("");
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
        }
    }
    function checkHealth(){
        if(health <= 0){
            revealAnswer();
            alert("Game Over! You lost")
        }
    }

    function revealAnswer(){
        for(var i=0;i<chosenName.length;i++){
            answerArray[i] = chosenName[i];
        }
        setBlank.innerText = answerArray.join('');
    }

    // print array
    /*TODO 
        1.add guessed letters array for user so they dont repeat letters
        2.remaining guesses
        3. start game, wins losses, has finished boolean
        4. store guessed in var and check against name array using for loop, if matches, then replace that index with guess
        for(var i=0; i < name.lenght; i++){
            if(name[i] === guess){
                answerArray[i] = guess;
                remainingLetters--;
            }
        }
        REMINDER: use chosen name to replace the displayed array correct answer to correct for capitalization in the beginning of names
            *also use toLower() to check if letter is the same as chosen name despite upper or lower case.
    */