import React, { useState } from "react";

function Comment({ postId, onCommentAdded }) {
	const [comment, setComment] = useState("");
	const [rate, setRate] = useState(0);

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			// Effettua una richiesta POST al server per creare un nuovo commento
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/posts/byId/${postId}`,
				{
					headers: {
						"Content-type": "application/json",
					},
					method: "POST",
					body: JSON.stringify({
						comment,
						rate,
						post: postId,
					}),
				}
			);

			// Controlla la risposta dal server
			if (response.status === 201) {
				console.log("Commento creato con successo.");
			}
		} catch (error) {
			console.error("Errore durante la creazione del commento:", error);
		}
	};

	return (
		<div className="py-2 w-100 flex flex-col justify-center border-green-600 border-t align-items-center">
			<h5>Lascia un commento</h5>
			<form onSubmit={handleSubmit}>
				<div className="flex justify-center">
					{/* <label>Commento:</label> */}
					<textarea
						className="border-green-600 border-1"
						value={comment}
						onChange={e => setComment(e.target.value)}
						required
					></textarea>
				</div>
				<div className="flex justify-center">
					<label>Valutazione (da 1 a 5):</label>
					<input
						type="number"
						value={rate}
						onChange={e => setRate(e.target.value)}
						min="1"
						max="5"
						required
					></input>
				</div>
				<button
					type="submit"
					className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
				>
					Invia Commento
				</button>
			</form>
		</div>
	);
}

export default Comment;
