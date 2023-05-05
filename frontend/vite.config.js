import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
	plugins: [solidPlugin()],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
	define: {},
	// define: {
	// 	'process.env': {
	// 		BACKEND_URL: 'http://localhost:9000/api',
	// 		APP_ASSETS_URL: 'http://localhost:9000',
	// 	},
	// },
});
