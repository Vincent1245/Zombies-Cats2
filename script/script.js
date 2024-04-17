
    const rows = 5;
    const cols = 5;
    let catPosition;
    let zombiePositions;

     function startGame()
    {
         catPosition = generateRandomPosition();
         zombie1Position = generateRandomPosition();
         zombie2Position = generateRandomPosition();
         zombiePositions = [zombie1Position, zombie2Position];
        updateGameBoard(catPosition, zombiePositions);
    }

    const gameBoard = document.getElementById("game-board");
    function generateRandomPosition() {
        return {
            row: Math.floor(Math.random() * rows),
            col: Math.floor(Math.random() * cols)
        };
    }
   
    document.getElementById("startbutton").addEventListener("click", function() {
        startGame(); 
    });

    function updateGameBoard() 
    {
        gameBoard.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < cols; j++) 
            {
                const cell = document.createElement("td");
                cell.classList.add("cell");

                if (i === catPosition.row && j === catPosition.col) 
                {
                    const catImg = document.createElement("img")
                    catImg.src = "script/images/cat.webp";
                    catImg.alt = "Cat"
                    catImg.classList.add("cat")
                    catImg.style.width = "100%";
                    catImg.style.height = "100%";
                    cell.appendChild(catImg)
                } 
                else
                {
                    for (let zombiePosition of zombiePositions) 
                    {
                        if (i === zombiePosition.row && j === zombiePosition.col) 
                        {
                            const zombieImg = document.createElement("img");
                            zombieImg.src = "script/images/zombie.jpg";
                            zombieImg.alt = "Zombie";
                            zombieImg.classList.add("zombie");
                            zombieImg.style.width = "100%";
                            zombieImg.style.height = "100%";
                            cell.appendChild(zombieImg);
                            break;
                        }
                    }
                }
                

                row.appendChild(cell);
            }
            gameBoard.appendChild(row);
        }
    }
   

    function moveCat(direction) 
    {
        let newCatPosition = { ...catPosition };

        switch (direction) 
        {
            case "N":
                newCatPosition.row = Math.max(0, newCatPosition.row - 1);

                break;
            case "S":
                newCatPosition.row = Math.min(rows - 1, newCatPosition.row + 1);
                break;
            case "W":
                newCatPosition.col = Math.max(0, newCatPosition.col - 1);
                break;
            case "E":
                newCatPosition.col = Math.min(cols - 1, newCatPosition.col + 1);
                break;
            default:
                return;
        }
        if (isValidMove(newCatPosition)) {
            catPosition = newCatPosition;
            if(isCatEaten())
            {
                endGame();
            }
            else
            {
            updateGameBoard();

            }
           
        }
    }
    function isValidMove(newPosition) {

        if (newPosition.row < 0 || newPosition.row >= rows || newPosition.col < 0 || newPosition.col >= cols) {
            return false;
        }


        for (let zombiePosition of zombiePositions) {
            if (zombiePosition.row === newPosition.row && zombiePosition.col === newPosition.col) {
                return false;
            }
        }

        return true;
    }
    if (isValidMove(catPosition)) {
        updateGameBoard();
    }
    function isCatEaten() {

        for (let zombiePosition of zombiePositions) {
            if (zombiePosition.row === catPosition.row && zombiePosition.col === catPosition.col) {
                return true;

            }

        }
        return false;
    }

    function endGame() 
    {
      
        alert("GAME OVER!! Katten blev uppäten av en Zombie");
    }
       

















