import React, { useEffect, useState, Link } from "react";
import { useNavigate } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import LatestPosts from "../components/latestPost/LatestPosts";
import { PlusCircle } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import PostModal from "../components/postModal/PostModal";
import jwt_decode from "jwt-decode";

const Home = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userName, setUserName] = useState("");

	const navigate = useNavigate();

	const token = localStorage.getItem("loggedInUser");

	const decodedToken = jwt_decode(token);
	const authorId = decodedToken.id;
	const name = decodedToken.nome;

	const toggleModal = () => setIsModalOpen(!isModalOpen);
	const handleLogout = () => {
		// Rimuovi il token dal localStorage
		navigate("/");
		localStorage.removeItem("loggedInUser");
	};

	useEffect(() => {
		setUserName(name);
	}, []);

	return (
		<>
			<MainLayouts>
				<Button
					onClick={toggleModal}
					className="m-2 d-flex align-items-center blog-navbar-add-button bg-success"
				>
					{" "}
					<PlusCircle className="mx-1" />
					Crea Post
				</Button>
				<Button
					className="m-2 rounded"
					variant="warning"
					size="sm"
					onClick={handleLogout}
				>
					Logout
				</Button>
				{isModalOpen && (
					<PostModal close={setIsModalOpen} authorId={authorId} />
				)}
				<div>Benvenuto, {userName}</div>
				<LatestPosts />
			</MainLayouts>
		</>
	);
};

export default Home;
