import React from "react";
import "../cardPost/style.css";
import Comment from "../comments/Comment";
import CommentList from "../commentList/CommentList";

const CardPost = ({ posts }) => {
	return (
		<>
			{posts &&
				posts.posts?.map((post, i) => {
					const updateDate = new Date(post.updateAt);
					const updateDateStr = updateDate.toLocaleString();
					const createDate = new Date(post.createdAt);
					const createDateStr = createDate.toLocaleString();

					return (
						/* <div
							key={post._id}
							className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
						> */
						<article
							key={post._id}
							className="py-2 flex max-w-md flex-col items-start justify-between border-green-600 border-b"
						>
							<img src={post.cover} alt="" className="bg-gray-50" />
							<div className="flex items-center gap-x-4 text-xs">
								<a
									href="/"
									className="relative mt-2 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
								>
									{post.category}
								</a>
								<time className="text-gray-500">
									{post.readTime.value} {post.readTime.unit}
								</time>
							</div>
							<div className="group relative">
								<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
									<span className="absolute inset-0"></span>
									{post.title}
								</h3>
								<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
									{post.content}
								</p>
							</div>
							<div className="relative mt-8 flex items-center gap-x-4">
								<img
									src={post.author.avatar}
									alt=""
									className="h-10 w-10 rounded-full bg-gray-50"
								/>
								<div className="text-sm leading-6">
									<p className="m-0">
										<a
											className="no-underline font-semibold text-gray-900"
											href="/"
										>
											<span>
												{post.author.nome} {post.author.cognome}
											</span>
										</a>
									</p>
									<time className="text-gray-500">
										{post.updateAt > post.createAt ? (
											<>Update at: {updateDateStr}</>
										) : (
											<>Update at {createDateStr}</>
										)}
									</time>
								</div>
							</div>
							<CommentList postId={post._id} />
							<Comment postId={post._id} />
						</article>
						/* </div> */
					);
				})}
		</>
	);
};

export default CardPost;
