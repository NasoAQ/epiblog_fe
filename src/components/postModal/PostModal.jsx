import React, { useEffect, useState } from "react";
import AxiosClient from "../../client/client";
import { FormLabel } from "react-bootstrap";
const client = new AxiosClient();

const PostModal = ({ close, authorId }) => {
	const [file, setFile] = useState(null);
	const [formData, setFormData] = useState({ value: "", unit: "" });

	const onChangeSetFile = e => {
		console.log(e.target.files);
		setFile(e.target.files[0]);
	};

	const uploadFile = async cover => {
		const fileData = new FormData();
		fileData.append("cover", cover);
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/posts/cloudUpload`,
				{
					method: "POST",
					body: fileData,
				}
			);
			return await response.json();
		} catch (error) {
			console.log(error, "Errore in upload file");
		}
	};

	const onSubmit = async e => {
		e.preventDefault();

		if (file) {
			try {
				const uploadCover = await uploadFile(file);
				console.log(uploadCover);
				const finalBody = {
					...formData,
					cover: uploadCover.cover,
					readTime: {
						// Formatta il campo "readTime" in un oggetto
						value: parseFloat(formData.value),
						unit: formData.unit,
					},
					author: authorId,
				};
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/posts/create`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
						body: JSON.stringify(finalBody),
					}
				);

				return response.json();
			} catch (error) {
				console.log(error);
			}
		} else {
			console.error("Seleziona un file");
		}
	};

	return (
		<div className="flex justify-center align-items-center h-screen">
			<div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
				<h1 className="font-bold text-4xl mb-4 text-green-700 text-center">
					Aggiungi post
				</h1>
				<div className="h-screen">
					<form
						encType="multipart/form-data"
						onSubmit={onSubmit}
						className="flex flex-col justify-center items-center gap-4"
					>
						<input
							className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
							placeholder="title"
							name="title"
							type="text"
							onChange={e =>
								setFormData({
									...formData,
									title: e.target.value,
								})
							}
						/>
						<input
							placeholder="category"
							className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
							name="category"
							type="text"
							onChange={e =>
								setFormData({
									...formData,
									category: e.target.value,
								})
							}
						/>
						<input
							className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
							name="cover"
							type="file"
							onChange={onChangeSetFile}
						/>
						<input
							placeholder="content"
							className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
							name="content"
							type="text"
							onChange={e =>
								setFormData({
									...formData,
									content: e.target.value,
								})
							}
						/>
						<input
							placeholder="Read Time Value"
							className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
							name="readTimeValue"
							type="number"
							onChange={e =>
								setFormData({
									...formData,
									value: e.target.value,
								})
							}
						/>
						<div>
							<label className=" p-1 rounded">Select unit</label>
							<select
								className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
								onChange={e =>
									setFormData({
										...formData,
										unit: e.target.value,
									})
								}
								name="readTimeUnit"
							>
								<option value="views">Views</option>
								<option value="hours">Hours</option>
							</select>
						</div>
						<div className="flex gap-2">
							<button
								onClick={() => close(false)}
								className="p-2 bg-amber-700 text-white rounded"
							>
								Chiudi
							</button>
							<button
								type="submit"
								className="p-2 bg-green-700 text-white rounded"
							>
								Aggiungi
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PostModal;
