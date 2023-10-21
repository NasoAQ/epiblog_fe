import React from "react";
import Navbar from "../components/navbar/BlogNavbar";
import MyFooter from "../components/footer/BlogFooter";
import { myLinksFoot } from "../data/navlinks";

const MainLayouts = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
			<MyFooter links={myLinksFoot} />
		</>
	);
};

export default MainLayouts;
