import React from "react";
import { Col, Form, Row, Button, Modal } from "react-bootstrap";

const NewPostModal = () => {
	return (
		<Form>
			<Row className="mb-3">
				<Form.Group as={Col} controlId="formGridTitle">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" placeholder="Title" />
				</Form.Group>

				<Form.Group as={Col} controlId="formGridCategory">
					<Form.Label>Category</Form.Label>
					<Form.Control type="text" placeholder="Category" />
				</Form.Group>
			</Row>

			<Form.Group className="mb-3" controlId="formGridContent">
				<Form.Label>Content</Form.Label>
				<Form.Control placeholder="Content..." />
			</Form.Group>

			<Form.Group className="mb-3" controlId="formGridCover">
				<Form.Label>Cover</Form.Label>
				<Form.Control type="file" placeholder="Apartment, studio, or floor" />
			</Form.Group>

			<Row className="mb-3">
				<Form.Group as={Col} controlId="formGridAuthor">
					<Form.Label>Author</Form.Label>
					<Form.Control type="text" placeholder="Author" />
				</Form.Group>

				<Form.Group as={Col} controlId="formGridAvatar">
					<Form.Label>Avatar</Form.Label>
					<Form.Control type="file" placeholder="Avatar" />
				</Form.Group>
			</Row>

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default NewPostModal;
