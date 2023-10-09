import axios from "./axios";

export const getTopPlayers = async (apiUrl) => {
	await axios
		.get(apiUrl)
		.then((response) => {
			return response.data
		})
		.catch((error) => {
			// Handle error
			console.error("Error fetching data:", error);
		});
};

export const saveWinner = async (data) => {
	try {
		const response = await axios.post("/save-score", data);
		return response.data;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};
