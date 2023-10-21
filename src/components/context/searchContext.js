import React, { createContext, useState, useEffect } from "react";

export const PostProvider = createContext();

const MyContext = ({ children }) => {
	const [postsOriginal, setPostsOriginal] = useState();
	const [postsFiltrati, setPostsFiltrati] = useState();
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		const filteredPosts = postsOriginal.filter(posts =>
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
