import React from "react";
import Home from "../src/pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./middlewear/ProtectedRoutes";
import Success from "./pages/Success";
import Registration from "./pages/Registration";

function App() {
	const handleGetPosts = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/posts`
		);
		const data = response.json();
		console.log(data);
	};

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Login />} />
					<Route path="/registration" element={<Registration />} />

					<Route element={<ProtectedRoutes />}>
						<Route path="/home" element={<Home />} />
						<Route path="/success" element={<Success />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
