import App from './App.svelte';
import { registerServiceWorker } from './register-sw';

const app = new App({
	target: document.body,
	props: {}
});

registerServiceWorker();

export default app;
