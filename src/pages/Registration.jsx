import React, { useState } from "react";
import {
	ExplicitFill,
	BootstrapFill,
	ExclamationSquareFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {
	const [loginData, setLoginData] = useState({});
	const [formData, setFormData] = useState({
		nome: "",
		cognome: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleInputChange = e => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/authors/create`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.status === 201) {
				console.log("Autore creato con successo.");

				// Dopo la creazione dell'autore, esegui il login per ottenere il token
				const loginResponse = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/login`,
					{
						headers: {
							"Content-type": "application/json",
						},
						method: "POST",
						body: JSON.stringify({
							email: formData.email,
							password: formData.password,
						}),
					}
				);
				const data = await loginResponse.json();

				if (loginResponse.status === 200) {
					// Salva il token nel localStorage o nello stato dell'app
					localStorage.setItem("loggedInUser", JSON.stringify(data.token));

					// Esegui l'azione desiderata dopo il login, ad esempio reindirizzamento alla pagina principale.
					navigate("/home");
				}
				setLoginData(data);
			}
		} catch (error) {
			console.error("Errore durante la creazione dell'autore:", error);
		}
	};
	return (
		<div className="flex justify-center align-items-center h-screen">
			<div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
				<div className="d-flex">
					<ExplicitFill size={30} color="#198754" />
					pi
					<BootstrapFill size={30} color="#198754" />
					log
					<ExclamationSquareFill size={30} color="#198754" />
				</div>
				<div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
					Create a new account
				</div>
				{/* <span class="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
					Already have an account ?
					<a
						href="#"
						target="_blank"
						class="text-sm text-blue-500 underline hover:text-blue-700"
					>
						Sign in
					</a>
				</span> */}
				<div className="p-6 mt-8">
					<form action="#" onSubmit={handleSubmit}>
						<div className="flex gap-4 mb-2">
							<div className=" relative ">
								<input
									type="text"
									id="create-account-first-name"
									className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
									name="nome"
									placeholder="Nome"
									required
									onChange={handleInputChange}
								/>
							</div>
							<div className=" relative ">
								<input
									type="text"
									id="create-account-last-name"
									className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
									name="cognome"
									placeholder="Cognome"
									required
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className="flex flex-col mb-2">
							<div className=" relative ">
								<input
									type="email"
									id="create-account-email"
									className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
									name="email"
									placeholder="Email"
									required
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className="flex flex-col mb-2">
							<div className=" relative ">
								<input
									type="password"
									id="create-account-pseudo"
									className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
									name="password"
									placeholder="Password"
									required
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className="flex w-full my-4">
							<button
								type="submit"
								className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Registration;
