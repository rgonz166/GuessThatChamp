// Declare variables

    //List of League of Legends champions from 2012
    // var championNames = ["Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "Blitzcrank", "Brand", "Caitlyn", "Cassiopeia", "Cho'gath", "Corki", "Dr. Mundo", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Irelia", "Janna", "Jarvan IV", "Jax", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kennen", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nasus", "Nautilus", "Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Pantheon", "Poppy", "Rammus", "Renekton", "Riven", "Rumble", "Ryze", "Sejuani", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Talon", "Taric", "Teemo", "Tristana", "Trundle", "Trydamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xerath", "Xin Zhao", "Yorick", "Ziggs", "Zilean"]

    var championNames = ["Miss Fortune", "Jarvan IV", "Dr. Mundo","Kog'Maw"]

    var chosenName = "";
    var answerArray = [];
    
    // Get random name from array
    var chosenName = championNames[Math.floor(Math.random()*championNames.length)];
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
    var setBlank = document.getElementById("blankName");
    setBlank.innerText = answerArray.join('');
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
    */