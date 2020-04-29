<script>
	import { Link, Route, Router } from 'svelte-routing';
	import Scan from './components/Scan.svelte';
	import Generate from './components/Generate.svelte';
	import Form from './components/Form.svelte';

	export let url = '';
</script>

<main>
	<Router url={url}>
		<nav>
			<Link to=""><i class="logo fas fa-qrcode"></i></Link>
			<Link to="scan">Scan</Link>
		</nav>
		<div class="app-wrapper">
			<Route path="">
				<Form disabled={false} />
			</Route>
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

	.logo {
		font-family: 'FontAwesome';
		font-style: initial;
		font-size: 20px;
	}
</style>
