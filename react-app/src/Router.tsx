import React, { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./containers/Home";

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
				</Routes>
			</BrowserRouter>
		</GlobalContext.Provider>
	);
}
