import axios from "axios";
import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import ScoreBoard from "./ScoreBoard";
import Reset from "./Reset";
import gameOverSoundAsset from "../sounds/game_over.wav";
import clickSoundAsset from "../sounds/click.wav";
import findBestMove from "../bots/Opponent";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
	//Rows
	{ combo: [0, 1, 2] },
	{ combo: [3, 4, 5] },
	{ combo: [6, 7, 8] },

	//Columns
	{ combo: [0, 3, 6] },
	{ combo: [1, 4, 7] },
	{ combo: [2, 5, 8] },

	//Diagonals
	{ combo: [0, 4, 8] },
	{ combo: [2, 4, 6] },
];

function checkWinner(tiles, setStrikeClass, setGameState, setUserName, userName) {
	for (const { combo, strikeClass } of winningCombinations) {
		const tileValue1 = tiles[combo[0]];
		const tileValue2 = tiles[combo[1]];
		const tileValue3 = tiles[combo[2]];

		if (
			tileValue1 !== null &&
			tileValue1 === tileValue2 &&
			tileValue1 === tileValue3
		) {
			if (tileValue1 === PLAYER_X) {
				setGameState(GameState.playerXWins);
			} else {
				setGameState(GameState.playerOWins);
				setUserName("AI Foe")
			}

			const apiUrl = "http://localhost:8000/api/save-score";

			axios
				.post(apiUrl, { name: userName, score: "20" })
				.then((response) => {})
				.catch((error) => {
					// Handle error
					console.error("Error fetching data:", error);
				});

			return;
		}
	}

	const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
	if (areAllTilesFilledIn) {
		setGameState(GameState.draw);
	}
}

function TicTacToe() {
	const [tiles, setTiles] = useState(Array(9).fill(null));
	const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
	const [strikeClass, setStrikeClass] = useState();
	const [gameState, setGameState] = useState(GameState.inProgress);
	const [userName, setUserName] = useState("");

	// State to store the value of the input
	const [inputValue, setInputValue] = useState("");

	// Event handler to update the state when the input value changes
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
		setUserName(event.target.value)
	};

	const handleTileClick = (index) => {
		if (userName === "") {
			return;
		}
		if (gameState !== GameState.inProgress) {
			return;
		}

		if (tiles[index] !== null) {
			return;
		}

		const newTiles = [...tiles];
		newTiles[index] = playerTurn;
		setTiles(newTiles);
		if (playerTurn === PLAYER_X) {
			setPlayerTurn(PLAYER_O);
		} else {
			setPlayerTurn(PLAYER_X);
		}
	};

	//Reset function
	const handleReset = () => {
		setGameState(GameState.inProgress);
		setTiles(Array(9).fill(null));
		setPlayerTurn(PLAYER_X);
		setStrikeClass(null);
	};

	// Check a winner
	useEffect(() => {
		checkWinner(tiles, setStrikeClass, setGameState, setUserName, userName);
	}, [tiles]);

	// Play sound on click
	useEffect(() => {
		if (tiles.some((tile) => tile !== null)) {
			clickSound.play();
		}
	}, [tiles]);

	// Play sound when game is over
	useEffect(() => {
		if (gameState !== GameState.inProgress) {
			gameOverSound.play();
		}
	}, [gameState]);

	// Run the bot
	useEffect(() => {
		console.log(playerTurn);

		if (playerTurn === "O") {
			const botMove = findBestMove(tiles, winningCombinations);
			handleTileClick(botMove);
		}
	}, [playerTurn]);

	return (
		<div className={"main-view"}>
			<div className={"game-view"}>
				<h1 className={"text-center"}>Game board</h1>
				<p className="text-center op6">Type in your name to start playing.</p>
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					placeholder="Type here..."
					className={'nameInput'}
				/>
				<Board
					playerTurn={playerTurn}
					tiles={tiles}
					onTileClick={handleTileClick}
					strikeClass={strikeClass}
				/>
				<GameOver gameState={gameState} />
				<Reset gameState={gameState} onReset={handleReset} />
			</div>
			<ScoreBoard gameState={gameState} />
		</div>
	);
}

export default TicTacToe;
