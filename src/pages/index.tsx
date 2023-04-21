import React from "react";
import logo from "../../public/logo192.png";

const HomePage: React.FC = () => {
	return (
		<div>
			<img src={logo} alt="" />
			<h2>Yay! Welcome to react + less</h2>
			<p>Here is the home page.</p>
		</div>
	);
};

export default HomePage;
