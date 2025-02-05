document.addEventListener('DOMContentLoaded', function() {
    const colorBox = document.querySelector('[data-testid="colorBox"]');
    const colorOptions = document.querySelector('.coloroptions');
    const gameStatus = document.querySelector('[data-testid="gameStatus"]');
    const scoreElement = document.querySelector('[data-testid="score"]');
    const newGameButton = document.querySelector('[data-testid="newGameButton"]');
    
    let score = 0;
    let targetColor;
    
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
    
    //function to initialize the game
    function initGame(keepScore = false) {
       if (!keepScore) {
        //reset score if it's a new game
        score = 0;
       }
        scoreElement.textContent = score;
    
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
            scoreElement.textContent = score;
            colorBox.style.borderColor = "green";
            colorBox.classList.add('correct')
            setTimeout(() => {
                colorBox.style.borderColor = "#000";
                //colorBox.classlist.remove('correct')
                
                initGame(true)
            }, 1000);
        } else {
            gameStatus.textContent = "Wrong guess😪! Try again";
            colorBox.style.borderColor = "red";
            colorBox.classList.add('wrong')
            setTimeout(() => {
                colorBox.style.borderColor = "#000";
                colorBox.classList.remove('wrong')
            }, 500)
        }
    }
    
    
    //event listener for new game btn
    newGameButton.addEventListener('click', () => initGame(false));
    
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
})
