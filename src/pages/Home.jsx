import React, { useEffect, useState } from "react";
import MainLayouts from "../layouts/MainLayouts";
import LatestPosts from "../components/latestPost/LatestPosts";
import { PlusCircle } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import PostModal from "../components/postModal/PostModal";
import jwt_decode from "jwt-decode";

const Home = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const token = localStorage.getItem("loggedInUser");

	const decodedToken = jwt_decode(token);
	const authorId = decodedToken.id;

	const toggleModal = () => setIsModalOpen(!isModalOpen);
	return (
		<>
			<MainLayouts>
				<Button
					onClick={toggleModal}
					className="d-flex align-items-center blog-navbar-add-button bg-success"
				>
					{" "}
					<PlusCircle className="mx-1" />
					Crea Post
				</Button>
				{isModalOpen && (
					<PostModal close={setIsModalOpen} authorId={authorId} />
				)}
				<LatestPosts />
			</MainLayouts>
		</>
	);
};

export default Home;
