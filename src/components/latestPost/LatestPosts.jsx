import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import CardPost from "../cardPost/CardPost";
import AxiosClient from "../../client/client";
const client = new AxiosClient();

const LatestPosts = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [posts, setPosts] = useState([]);
	//console.log(posts);

	const getPosts = async () => {
		try {
			const response = await client.get(
				`${process.env.REACT_APP_SERVER_BASE_URL}/posts?page=${currentPage}`
			);
			setPosts(response);
		} catch (e) {
			console.log(e);
		}
	};

	const handlePagination = value => {
		setCurrentPage(value);
	};

	useEffect(() => {
		getPosts();
	}, [currentPage]);

	return (
		<>
			<div className="text-center mt-3 flex flex-col">
				<h2 className="text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
					Latest posts
				</h2>
				<p className="mt-2 text-lg leading-8 text-gray-600">
					Learn how to grow your business with our expert advice.
				</p>
			</div>
			<Container className="d-flex mt-3">
				<div className="mx-auto mt-3 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-green-600 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					<CardPost posts={posts} />
				</div>
			</Container>
			<div className="mt-3">
				<ResponsivePagination
					current={currentPage}
					total={posts && posts.totalPages}
					onPageChange={handlePagination}
				/>
			</div>
		</>
	);
};

export default LatestPosts;
