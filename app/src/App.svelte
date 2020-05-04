<script>
	import { Router, Navigate } from 'svelte-router-spa';
	import { routes } from './Routes';

	export let url = '';
	let params = {};
</script>

<main>
	<nav>
		<a href="/"><i class="logo fas fa-qrcode"></i></a>
		<a href="/scan">Scan</a>
	</nav>
	<Router {routes} {params}></Router>
</main>

<style type="text/scss">
	:global(body) {
		padding: 0;
	}

	main {
		text-align: center;
		margin: 0 auto;
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 1em;
		box-shadow: 2px 2px 1px 0px rgba(0,0,0,0.15);
		margin-bottom: 1em;
	}

	nav :global(a) {
		margin-right: 1em;
	}

	.app-wrapper {
		margin-top: 2em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.logo {
		font-family: 'FontAwesome';
		font-style: initial;
		font-size: 20px;
	}
</style>
