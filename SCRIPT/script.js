let currentPlayer = "X";
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const winningCombinations = [

    // Esto funciona como una MÁTRIZ
    [0, 1, 2], // Fila superior
    [3, 4, 5], // Fila del medio
    [6, 7, 8], // Fila inferior
    [0, 3, 6], // Columna izquierda
    [1, 4, 7], // Columna central
    [2, 5, 8], // Columna derecha
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundaria
];

// Agregar event listener a cada celda
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Manejar el clic en la celda
function handleCellClick(event) {
    if (gameOver) return; // Si el juego ha terminado, no hacer nada

    const cell = event.target; // Obtiene la celda en la que se hizo clic

    // Asegúrate de que la celda esté vacía antes de hacer el movimiento
    if (cell.textContent === "") {
        cell.textContent = currentPlayer; // Marca la celda con el jugador actual
        checkWinner(); // Verifica si hay un ganador después del movimiento

        // Cambiar de turno al siguiente jugador
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alterna entre "X" y "O"
    }
}

// Función para verificar el ganador
function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        const cellA = document.getElementById(`cell-${a}`).textContent;
        const cellB = document.getElementById(`cell-${b}`).textContent;
        const cellC = document.getElementById(`cell-${c}`).textContent;

        if (cellA !== "" && cellA === cellB && cellA === cellC) {
            alert(`¡El ganador es ${cellA}!`);
            gameOver = true; // Marcar el juego como terminado
            document.getElementById('restartButton').style.display = 'block'; // Muestra el botón
            return;
        }
    }
}

// Función para reiniciar el juego
function restartGame() {
    gameOver = false; // Reinicia el estado del juego
    cells.forEach(cell => {
        cell.textContent = ""; // Limpia el contenido de cada celda
    });

    // Oculta el botón de reiniciar después de reiniciar el juego
    document.getElementById('restartButton').style.display = 'none';
}

// Agregar event listener al botón de reiniciar
document.getElementById('restartButton').addEventListener('click', restartGame);
