import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default defineConfig({
	plugins: [
		react({
			include: "**/*.{jsx,tsx,ts,js}",
		}),
		tsconfigPaths(),
	],
	css: {
		postcss: {
			plugins: [autoprefixer, tailwindcss],
		},
	},
});