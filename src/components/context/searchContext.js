import React, { createContext, useState, useEffect } from "react";
import AxiosClient from "../../client/client";
const client = new AxiosClient();

export const PostProvider = createContext();

const MyContext = ({ children }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const [posts, setPosts] = useState([]);
	const [postsFiltrati, setPostsFiltrati] = useState();
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
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
		const filteredPosts = posts.filter(posts =>
			posts.title.toLowerCase().includes(searchText.toLowerCase())
		);
		setPostsFiltrati(filteredPosts);
	}, [searchText]);

	return (
		<PostProvider.Provider value={{ searchText, postsFiltrati, setSearchText }}>
			{children}
		</PostProvider.Provider>
	);
};

export default MyContext;
