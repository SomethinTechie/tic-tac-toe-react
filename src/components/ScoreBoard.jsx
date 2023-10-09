import axios from "axios";
import UserList from "./UserList";
import { useState, useEffect } from "react";

function ScoreBoard({ className, gameState }) {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const apiUrl = "http://localhost:8000/api/top-scores";

		axios
			.get(apiUrl)
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				// Handle error
				console.error("Error fetching data:", error);
			});
	}, [gameState]);

	return (
		<div className={"user-board"}>
			<h1>Score board</h1>
			{users ? <UserList users={users} /> : <p className={'op6'}>No top score records yet.</p>}
		</div>
	);
}

export default ScoreBoard;
