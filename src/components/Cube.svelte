<script lang="ts">
	import { onMount } from 'svelte';
	const { axis, dir, x, y, width, offset, maxOffset, speed, rotateInfinite, renderEmoji } =
		$props();

	let transitionDur = 1;
	let startFace = dir === 'pos' ? 'start' : 'end';
	let endFace = dir === 'pos' ? 'end' : 'start';
	let delay = offset * speed;
	let maxDelay = maxOffset * speed;

	let transitionDurOverride = $state('unset');
	let emoji = $state(getEmoji());
	let show = $state(offset === 0);
	let face = $state(startFace);

	onMount(startRotation);

	async function wait(duration: number) {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, duration);
		});
	}

	async function rotateForwardInfinite(initialDelay: number) {
		await rotateReset(initialDelay);
		await rotate('mid', speed * 4);
		await rotate(endFace, speed * 6);
		await wait(speed * 4);
		await rotateForwardInfinite(0);
	}

	function fade(visible: boolean, fadeDelay: number) {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				show = visible;
				resolve();
			}, fadeDelay);
		});
	}

	async function rotateReset(resetDelay: number) {
		await wait(resetDelay);

		transitionDurOverride = '0';
		emoji = getEmoji();
		face = startFace;

		return new Promise<void>((resolve) => {
			setTimeout(() => {
				transitionDurOverride = 'unset';
				resolve();
			}, 10);
		});
	}

	function rotate(nextFace: string, nextDelay: number) {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				face = nextFace;
				resolve();
			}, nextDelay);
		});
	}

	async function startRotation() {
		if (delay > 0) {
			await fade(true, delay);
		}

		await rotate('mid', delay);

		// Exception for emoji cube
		if (rotateInfinite) {
			await rotate(endFace, delay * 2);
			await rotateForwardInfinite(delay * 2);
		}

		// Random cube rotation
		await rotateAfterDelay(maxDelay + 2000 + Math.random() * 10000);
	}

	async function rotateAfterDelay(longDelay: number) {
		if (rotateInfinite) {
			return;
		}

		await rotate(endFace, longDelay);
		await wait(speed * 4);
		// await fade(false, speed * 4);
		await rotateReset(0);
		await rotate('mid', speed * 4);
		await rotateAfterDelay(maxDelay + longDelay);
	}

	function getEmoji() {
		const emoji = ['🍷', '☕️', '👟', '✈️', '🐶', '🎮', '🚲', '🇳🇱', '🇺🇸', '🇬🇧'];
		return emoji[Math.floor(Math.random() * emoji.length)];
	}
</script>

{#if show}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="cube-outer"
		style="--cube-width:{width}px;--x-pos:{x}px;--y-pos:{y}px;--transition-dur:{transitionDur}s;"
	>
		<div class="cube wrap-{axis}-{face}" style="--transition-dur:{transitionDurOverride}">
			<div class="face {axis}-start {dir}"></div>
			<div class="face {axis}-mid {dir} {rotateInfinite ? 'face-emoji' : ''}">
				{#if renderEmoji}
					<span>{emoji}</span>
				{/if}
			</div>
			<div class="face {axis}-end {dir}"></div>
		</div>
	</div>
{/if}

<style>
	.face-emoji {
		cursor: default;
		font-size: 1.5em;
	}

	@media (max-width: 1000px) {
		.face-emoji {
			font-size: 1em;
		}
	}

	@media (max-width: 500px) {
		.face-emoji {
			font-size: 0.5em;
		}
	}

	@media (max-width: 500px) {
		.face-emoji {
			font-size: 0;
		}
	}
</style>
