import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarFill } from "react-bootstrap-icons";

const CommentList = ({ postId }) => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/posts/byId/${postId}/comments`
				);
				const data = await response.json();
				setComments(data.comments);
				console.log(data);
			} catch (error) {
				console.error("Errore nel recupero dei commenti", error);
			}
		};

		fetchComments();
	}, [postId]);
	return (
		<div className="py-2 w-100 flex flex-col justify-center border-green-600 border-t align-items-center">
			<strong>Commenti:</strong>
			<ul>
				{comments &&
					comments.map(comment => (
						<li
							key={comment._id}
							className="py-2 w-100 flex flex-col justify-center border-green-600 border-b align-items-center"
						>
							{comment.comment}{" "}
							<div className="flex align-items-center">
								{comment.rate} <StarFill color="gold" />
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};

export default CommentList;
