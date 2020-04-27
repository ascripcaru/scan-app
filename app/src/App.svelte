<script>
	import { Link } from 'svelte-routing';
	import Router from "../node_modules/svelte-routing/src/Router.svelte";
	import Route from "../node_modules/svelte-routing/src/Route.svelte";
	import Scan from './components/Scan.svelte';
	import Generate from './components/Generate.svelte';
	import Form from './components/Form.svelte';

	export let url = '';
</script>

<main>
	<Router url={url}>
		<nav>
			<Link to="">Home</Link>
			<Link to="scan">Scan</Link>
		</nav>
		<div class="app-wrapper">
			<Route path="" component="{Form}" />
			<Route path="scan" component="{Scan}" />
			<Route path="generate">
				<Generate />
			</Route>
		</div>
	</Router>
</main>

<style type="text/scss">
	:global(body) {
		padding: 0;
	}

	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 1em;
		box-shadow: 2px 2px 1px 0px rgba(0,0,0,0.15);
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
</style>
