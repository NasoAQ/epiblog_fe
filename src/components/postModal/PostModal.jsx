import React, { useEffect, useState } from "react";
import AxiosClient from "../../client/client";
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
			<div className=" z-10 flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
				<h1 className="font-bold text-4xl mb-4 text-green-700 text-center">
					Aggiungi post
				</h1>
				<div className="w-full h-fit p-4 rounded-lg flex justify-center items-center">
					<form
						encType="multipart/form-data"
						onSubmit={onSubmit}
						className="flex flex-col justify-center items-center gap-4"
					>
						<input
							className="w-[400px] p-1 rounded"
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
							className="w-[400px] p-1 rounded"
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
							className="w-[400px] p-1 rounded"
							name="cover"
							type="file"
							onChange={onChangeSetFile}
						/>
						<input
							placeholder="content"
							className="w-[400px] p-1 rounded"
							name="content"
							type="text"
							onChange={e =>
								setFormData({
									...formData,
									content: e.target.value,
								})
							}
						/>

						{/* <input
							placeholder="ID author"
							className="w-[400px] p-1 rounded"
							name="author"
							type="text"
							onChange={e =>
								setFormData({
									...formData,
									author: e.target.value,
								})
							}
							value={authorId}
						/> */}
						<input
							placeholder="Read Time Value"
							className="w-[400px] p-1 rounded"
							name="readTimeValue"
							type="number"
							onChange={e =>
								setFormData({
									...formData,
									value: e.target.value,
								})
							}
						/>
						<input
							placeholder="Read Time Unit"
							className="w-[400px] p-1 rounded"
							name="readTimeUnit"
							type="text"
							onChange={e =>
								setFormData({
									...formData,
									unit: e.target.value,
								})
							}
						/>
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
