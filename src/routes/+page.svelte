<script lang="ts">
	import Cube from '../components/Cube.svelte';

	let innerHeight: number;
	let innerWidth: number;

	const arr = [
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];

	const padding = 10;
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div id="container" style="--cube-width: {innerWidth / (arr[0].length + padding)}px">
	{#each arr as row, y}
		{#each row as cell, x}
			{#if cell}
				<Cube
					x={(x + padding / 2) * (innerWidth / (arr[0].length + padding))}
					y={y * (innerWidth / (arr[0].length + padding)) +
						(innerHeight - (innerWidth / (arr[0].length + padding)) * arr.length) / 2}
					width={innerWidth / (arr[0].length + padding)}
					dir={Math.random() < 0.5 ? 'neg' : 'pos'}
					axis={Math.random() < 0.5 ? 'x' : 'y'}
					dur={1}
					delay={0.01 + 0.15 * x + 0.01 * (arr[0].length + padding) * y}
					speed={400}
					rotateInfinite={y === 1 && x === 20}
				/>
			{/if}
		{/each}
	{/each}
</div>

<a href="https://github.com/brycedorn" class="github-corner" aria-label="Bryce Dorn on GitHub"
	><svg viewBox="0 0 250 250" aria-hidden="true"
		><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" /><path
			d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
			fill="currentColor"
			style="transform-origin: 130px 106px;"
			class="octo-arm"
		/><path
			d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
			fill="currentColor"
			class="octo-body"
		/></svg
	></a
>

<style>
	#container {
		width: 100%;
		height: 100vh;
		background-size: calc(var(--cube-width) / 2) calc(var(--cube-width) / 2);
		background-image: linear-gradient(to right, #dfdfdf 1px, transparent 1px),
			linear-gradient(to bottom, #dfdfdf 1px, transparent 1px);
		background-image:
			-webkit-linear-gradient(to right, #dfdfdf 1px, transparent 1px),
			-webkit-linear-gradient(to bottom, #dfdfdf 1px, transparent 1px);
		background-image:
			-moz-linear-gradient(to right, #dfdfdf 1px, transparent 1px),
			-moz-linear-gradient(to bottom, #dfdfdf 1px, transparent 1px);
		background-position: calc(50% + calc(var(--cube-width) / 4))
			calc(50% + calc(var(--cube-width) / 4));
	}

	svg {
		width: 100px;
		height: 100px;
		fill: #444;
		color: #fff;
		position: absolute;
		top: 0;
		border: 0;
		right: 0;
	}

	.github-corner:hover .octo-arm {
		animation: octocat-wave 560ms ease-in-out;
	}

	@keyframes octocat-wave {
		0%,
		100% {
			transform: rotate(0);
		}
		20%,
		60% {
			transform: rotate(-25deg);
		}
		40%,
		80% {
			transform: rotate(10deg);
		}
	}

	@media (max-width: 500px) {
		.github-corner:hover .octo-arm {
			animation: none;
		}

		.github-corner .octo-arm {
			animation: octocat-wave 560ms ease-in-out;
		}
	}

	@media (prefers-color-scheme: dark) {
		#container {
			background-color: #333;
			background-image: linear-gradient(to right, #222 1px, transparent 1px),
				linear-gradient(to bottom, #222 1px, transparent 1px);
			background-image:
				-webkit-linear-gradient(to right, #222 1px, transparent 1px),
				-webkit-linear-gradient(to bottom, #222 1px, transparent 1px);
			background-image:
				-moz-linear-gradient(to right, #222 1px, transparent 1px),
				-moz-linear-gradient(to bottom, #222 1px, transparent 1px);
		}

		svg {
			fill: #222;
		}
	}

	@media (max-aspect-ratio: 1/1.5) {
		#container {
			transform: rotate(90deg) scale(2);
			background: none;
		}

		#container::before {
			width: calc(max(100vh, 200%));
			height: 100vh;
			position: absolute;
			display: block;
			content: '';
			top: 0;
			left: -50vh;
			background-size: calc(var(--cube-width) / 1) calc(var(--cube-width) / 1);
			background-image: linear-gradient(to right, #dfdfdf 1px, transparent 1px),
				linear-gradient(to bottom, #dfdfdf 1px, transparent 1px);
			background-image:
				-webkit-linear-gradient(to right, #dfdfdf 1px, transparent 1px),
				-webkit-linear-gradient(to bottom, #dfdfdf 1px, transparent 1px);
			background-image:
				-moz-linear-gradient(to right, #dfdfdf 1px, transparent 1px),
				-moz-linear-gradient(to bottom, #dfdfdf 1px, transparent 1px);
			background-position: calc(50vh + calc(var(--cube-width))) calc(50% + calc(var(--cube-width)));
		}
	}

	@media (max-aspect-ratio: 1/1.5) and (prefers-color-scheme: dark) {
		#container::before {
			background-color: #333;
			background-image: linear-gradient(to right, #222 1px, transparent 1px),
				linear-gradient(to bottom, #222 1px, transparent 1px);
			background-image:
				-webkit-linear-gradient(to right, #222 1px, transparent 1px),
				-webkit-linear-gradient(to bottom, #222 1px, transparent 1px);
			background-image:
				-moz-linear-gradient(to right, #222 1px, transparent 1px),
				-moz-linear-gradient(to bottom, #222 1px, transparent 1px);
		}

		svg {
			fill: #222;
		}
	}
</style>
