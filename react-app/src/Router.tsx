import React, { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./containers/Home";
import EmployeeList from "@containers/EmployeeList";

export type GlobalContextType = {
	user?: string;
};

export const GlobalContext = createContext<GlobalContextType>({});

export function Router() {
	return (
		<GlobalContext.Provider value={{}}>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/employees-list" element={<EmployeeList />} />
				</Routes>
			</BrowserRouter>
		</GlobalContext.Provider>
	);
}
