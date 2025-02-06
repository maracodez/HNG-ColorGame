document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container')
    const colorBox = document.querySelector('[data-testid="colorBox"]');
    const colorOptions = document.querySelector('.coloroptions');
    const gameStatus = document.querySelector('[data-testid="gameStatus"]');
    const scoreElement = document.querySelector('[data-testid="score"]');
    const resetGameButton = document.querySelector('[data-testid="resetGameButton"]');
    const newGameButton = document.querySelector('[data-testid="newGameButton"]');

    //scoreboard
    const scoreboard = document.createElement("div");
    scoreboard.classList.add("scoreboard")


    //new elements for tracking wins & fails
    const winElement = document.createElement("div");
    winElement.textContent = "Wins: 0";
    scoreboard.appendChild(winElement);

    const failedElement = document.createElement("div");
    failedElement.textContent = "Fails: 0";
    scoreboard.appendChild(failedElement);

   
    
    let score = 0;
    let targetColor;
    let wins = 0;
    let fails = 0;
    
    //predefined set of colors
    const colors = [
        "#ff5733", "#33ff57", "#3357ff", "#f333ff", "#33fff5", "#ffc300",
        "#c70039", "#900c3f", "#581845", "#1a5276", "#1e8449", "b7950b",
        "#ccc", "#fff", "#000", "#00ffff", "#696969", "#808080", "#0000ff"
    ]
    
    //function to generate a random color from the predefined colors
    function getRandomColors() {
        return colors[Math.floor(Math.random() * colors.length)]
    }

    function updateScoreboard() {
        scoreElement.innerHTML = `
        <p>Score: ${score}</p>
        <p>Wins: ${wins}</p>
        <p>Fails: ${fails}</p>
        `
    }
    
    //function to initialize the game
    function initGame(keepScore = false) {
       if (!keepScore) {
        //reset score if it's a new game
        score = 0;
        wins = 0;
        fails = 0;
       }
        updateScoreboard()
    
        //set target color
        targetColor = getRandomColors();
        colorBox.style.backgroundColor = targetColor;
    
        //clear previous options
        colorOptions.innerHTML = "";
    
        //generate color buttons
        const options = [targetColor];
        while (options.length < 6) {
            const randomColor = getRandomColors();
            if (!options.includes(randomColor)) {
                options.push(randomColor)
            }
        }
        options.sort(() => Math.random() - 0.5);
    
        options.forEach(color => {
            const button = document.createElement('button');
            button.style.backgroundColor = color;
            button.addEventListener('click', () => handleGuess(color));
            colorOptions.appendChild(button)
        });
    
        //reset game status
        gameStatus.textContent = "Make your guess"
    }
    
    //function to handle user guesses
    function handleGuess(selectedColor) {
        if (selectedColor === targetColor) {
            gameStatus.textContent = "Correct! 🎉";
            score++;
            wins++;
            colorBox.style.borderColor = "green";
            colorBox.classList.add('correct')
            setTimeout(() => {
                colorBox.style.borderColor = "#000";
                //colorBox.classlist.remove('correct')
                
                initGame(true)
            }, 1000);
        } else {
            gameStatus.textContent = "Wrong guess😪! Try again";
            fails++;
            colorBox.style.borderColor = "red";
            colorBox.classList.add('wrong')
            setTimeout(() => {
                colorBox.style.borderColor = "#000";
                colorBox.classList.remove('wrong')
            }, 500)
        }
        updateScoreboard()
    }

    function startNewGame() {
        score = 0;
        wins =  0;
        fails = 0;
        updateScoreboard();
        initGame(false)
    }
    
    
    //event listener for new game btn
    resetGameButton.addEventListener('click', () => initGame(false));
    newGameButton.addEventListener('click', startNewGame);
    
    //initialize the game on page load
    initGame()
    

    //function for typewriting text
    const text = "Guess the correct color!";
    const element = document.getElementById("game_instructions");
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50)
        }
    }

    type()

    const texts = document.getElementById("more_instructions");

    function handleInstruction() {
        if (texts.style.display === "none" || texts.style.display === "") {
            texts.style.display = "block";
        } else {
            texts.style.display = "none"
        }
    }

    document.getElementById("instructions").addEventListener("click", handleInstruction)
})
