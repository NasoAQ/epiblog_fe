import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
	ExplicitFill,
	BootstrapFill,
	ExclamationSquareFill,
	HouseFill,
} from "react-bootstrap-icons";

const Errorpage = () => {
	return (
		<div>
			<div className="d-flex blog-navbar bg-success-subtle">
				<ExplicitFill size={30} color="#198754" />
				pi
				<BootstrapFill size={30} color="#198754" />
				log
				<ExclamationSquareFill size={30} color="#198754" />
			</div>
			<h1>OOOOPS LA PAGINA NON ESISTE!</h1>
			<Button className="btn-success">
				<Link to="/">
					<HouseFill size={50} color="orange" />
				</Link>
			</Button>
		</div>
	);
};

export default Errorpage;
