import React from "react";
import { NavLink } from "react-router-dom";

export function Header() {
	return (
		<header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-lg">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">HRnet</h1>
				<nav>
					<NavLink
						to="/"
						className="text-white hover:text-gray-300 transition duration-300 ml-4"
					>
						Home
					</NavLink>
					<NavLink
						to="/employees-list"
						className="text-white hover:text-gray-300 transition duration-300 ml-4"
					>
						Employees
					</NavLink>
				</nav>
			</div>
		</header>
	);
}
