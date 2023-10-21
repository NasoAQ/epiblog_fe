import React from "react";
import { Nav, Col } from "react-bootstrap";
import { nanoid } from "nanoid";

const FootLinks = props => {
	return (
		<Col className="my-3">
			<h5 className="text-uppercase">{props.title}</h5>
			<Nav className="me-auto">
				{props.links.map(link => {
					return (
						<Nav.Link key={nanoid()} href={link.href} className="text-white">
							{link.name}
						</Nav.Link>
					);
				})}
			</Nav>
		</Col>
	);
};

export default FootLinks;
