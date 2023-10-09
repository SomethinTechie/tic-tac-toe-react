// Function to perform a brute force search for the best move
function findBestMove(board, winningCombo) {
	const options = [1,2,3,4,5,6,7,8,9,10,11,10,12,14,15,16,17,18,19,20];
	const choice = getRandomElement(options);
	console.log(`play choice ${choice}`)

	let choice1 = [1,3,2,17,8,16,9,11,10,20]

	const play = (choice1.includes(choice)) ? attack(board, winningCombo) : defence(board, winningCombo);
	return play
}

function attack(board, winningCombo) {
	console.log('attack')
	let bestMove;
	let score;
	let bestScore = 0;

	// Iterate over all possible moves
	for (let i = 0; i < winningCombo.length; i++) {
		score = 0;

		for (let j = 0; j < winningCombo[i].combo.length; j++) {
			if (
				board[winningCombo[i].combo[j]] === null ||
				board[winningCombo[i].combo[j]] === "O"
			) {
				score += 1;
			}
		}

		if (score > bestScore) {
			bestScore = score;
			bestMove = winningCombo[i].combo;
		}
	}

	for (let tile = 0; tile < bestMove.length; tile++) {
		if (board[bestMove[tile]] === null) {
			return bestMove[tile];
		}
	}
}

function defence(board, winningCombo) {
	console.log('Defence')
	let bestMove;
	let score;
	let bestScore = 0;

	// Iterate over all possible moves
	for (let i = 0; i < winningCombo.length; i++) {
		score = 0;
		// console.log(winningCombo[i].combo);

		for (let j = 0; j < winningCombo[i].combo.length; j++) {
			if (
				board[winningCombo[i].combo[j]] === "X"
			) {
				score += 1;
			}
		}

		if (score > bestScore) {
			bestScore = score;
			bestMove = winningCombo[i].combo;
		}
	}

	for (let tile = 0; tile < bestMove.length; tile++) {
		if (board[bestMove[tile]] === null) {
			return bestMove[tile];
		}
	}
}

function getRandomElement(array) {
	// Check if the array is not empty
	if (array.length === 0) {
		return undefined; // Return undefined if the array is empty
	}

	// Generate a random index within the array length
	const randomIndex = Math.floor(Math.random() * array.length);

	// Return the randomly selected element
	return array[randomIndex];
}


export default findBestMove;
