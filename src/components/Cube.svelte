<script lang="ts">
	import { CubeDirection, CubeFace } from '$lib';
	import { onMount } from 'svelte';
	const { axis, dir, x, y, width, offset, maxOffset, speed, renderEmoji } = $props();

	let transitionDur = 1;
	let startFace = dir === CubeDirection.FORWARD ? CubeFace.FRONT : CubeFace.BACK;
	let endFace = dir === CubeDirection.FORWARD ? CubeFace.BACK : CubeFace.FRONT;
	let delay = offset * speed;
	let maxDelay = maxOffset * speed;

	let transitionDurOverride = $state('unset');
	let show = $state(offset === 0);
	let face = $state<CubeFace>(startFace);
	let opacity = $state(0);
	let startingScale = 0.6;
	let scale = $state(startingScale);

	let allEmoji = ['🍷', '☕️', '👟', '✈️', '🐶', '🎮', '🚲', '🇳🇱', '🇺🇸', '🇬🇧'];
	let remainingEmoji = $state(new Set(allEmoji));
	let emoji = $state(getEmoji());

	onMount(startRotation);

	async function wait(duration: number) {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, duration);
		});
	}

	function fade(newOpacity: number, fadeDelay: number) {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				opacity = newOpacity;
				scale = newOpacity === 0 ? startingScale : 1;
				resolve();
			}, fadeDelay);
		});
	}

	function spawn(visible: boolean, fadeDelay: number) {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				show = visible;
				resolve();
			}, fadeDelay);
		});
	}

	async function rotateReset(initialDelay: number = 0) {
		await wait(initialDelay);
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

	function rotate(nextFace: CubeFace, nextDelay: number) {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				face = nextFace;
				resolve();
			}, nextDelay);
		});
	}

	async function startRotation() {
		if (delay > 0) {
			await spawn(true, delay);
		}

		await fade(1, delay);
		await rotate(CubeFace.SIDE, delay);

		// Exception for emoji cube
		if (renderEmoji) {
			await rotate(endFace, delay * 4);
			await fade(0, speed * 4);
			await rotateAfterDelayInf(delay * 2);
		}

		// Random cube rotation
		await rotateAfterDelay(maxDelay + 2000 + Math.random() * 50000);
	}

	// First inf rotate
	async function rotateAfterDelay(longDelay: number) {
		if (renderEmoji) {
			return;
		}
		await fade(1, longDelay);
		await rotate(endFace, delay);
		await fade(0, speed * 4);
		await rotateReset();
		await rotateAfterDelayInf(maxDelay + longDelay);
	}

	async function rotateAfterDelayInf(longDelay: number) {
		await rotateReset();
		await fade(1, speed * 4);
		await rotate(CubeFace.SIDE, speed * 4);
		await rotate(endFace, maxDelay + longDelay);
		await fade(0, speed * 4);
		await rotateAfterDelayInf(longDelay);
	}

	function getEmoji() {
		const randomIndex = Math.floor(Math.random() * remainingEmoji.size);
		const randomEmoji = Array.from(remainingEmoji)[randomIndex];
		remainingEmoji.delete(randomEmoji);
		if (remainingEmoji.size === 0) {
			remainingEmoji = new Set(allEmoji);
		}
		return randomEmoji;
	}
</script>

{#if show}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="cube-outer"
		style="--cube-width:{width}px;--x-pos:{x}px;--y-pos:{y}px;--transition-dur:{transitionDur}s;--opacity:{opacity};transform:scale({scale})"
	>
		<div class="cube wrap-{axis}-{face}" style="--transition-dur:{transitionDurOverride}">
			<div class="face {axis}-front {dir}"></div>
			<div class="face {axis}-side {dir} {renderEmoji ? 'face-emoji' : ''}">
				{#if renderEmoji}
					<span>{emoji}</span>
				{/if}
			</div>
			<div class="face {axis}-back {dir}"></div>
		</div>
	</div>
{/if}

<style>
	.cube-outer {
		perspective: 150px;

		--bg-color: var(--color-white);
		--fade-color: var(--color-off-white);
		--face-color: var(--color-green);

		position: absolute;
		left: var(--x-pos);
		top: var(--y-pos);

		opacity: var(--opacity);
		transition:
			opacity var(--transition-dur),
			transform var(--transition-dur);
	}
	@media (prefers-color-scheme: dark) {
		.cube-outer {
			--bg-color: var(--color-dark-green);
			--fade-color: var(--color-green-alt);
			--face-color: var(--color-off-white-alt);
		}
	}
	.cube {
		width: var(--cube-width);
		height: var(--cube-width);
		transform-style: preserve-3d;
		will-change: transform;
		backface-visibility: hidden;
		transform: translateZ(calc(-1 * var(--cube-width) / 2));
		transition: transform var(--transition-dur);
	}
	.wrap-x-front {
		transform: translateZ(calc(-1 * var(--cube-width) / 2)) rotateY(0deg);
	}
	.wrap-x-side {
		transform: translateZ(calc(-1 * var(--cube-width) / 2)) rotateY(-90deg);
	}
	.wrap-x-back {
		transform: translateZ(calc(-1 * var(--cube-width) / 2)) rotateY(-180deg);
	}
	.wrap-y-front {
		transform: translateZ(calc(-1 * var(--cube-width) / 2)) rotateX(90deg);
	}
	.wrap-y-side {
		transform: translateZ(calc(-1 * var(--cube-width) / 2)) rotateY(0deg);
	}
	.wrap-y-back {
		transform: translateZ(calc(-1 * var(--cube-width) / 2)) rotateX(-90deg);
	}
	.cube .face {
		position: absolute;
		width: var(--cube-width);
		height: var(--cube-width);
	}
	.x-front {
		transform: rotateY(0deg) translateZ(calc(var(--cube-width) / 2));
	}
	.x-side {
		transform: rotateY(90deg) translateZ(calc(var(--cube-width) / 2));
	}
	.x-back {
		transform: rotateY(180deg) translateZ(calc(var(--cube-width) / 2));
	}
	.y-front {
		transform: rotateX(-90deg) translateZ(calc(var(--cube-width) / 2));
	}
	.y-side {
		transform: rotateY(0deg) translateZ(calc(var(--cube-width) / 2));
	}
	.y-back {
		transform: rotateX(90deg) translateZ(calc(var(--cube-width) / 2));
	}
	.x-side,
	.y-side {
		background: var(--face-color);
	}
	.x-front,
	.y-front,
	.x-back,
	.y-back {
		background: var(--fade-color);
	}
	.x-front.bck,
	.y-front.bck,
	.x-back.fwd,
	.y-back.fwd {
		animation: fadeOut var(--transition-dur);
		animation-delay: 2s;
	}
	.x-back.bck,
	.y-back.bck,
	.x-front.fwd,
	.y-front.fwd {
		animation: fadeInOut calc(2 * var(--transition-dur));
	}
	.face-emoji {
		line-height: var(--cube-width);
		text-align: center;
		cursor: default;
		font-size: 1.5em;
	}
	@keyframes fadeInOut {
		0% {
			background: var(--bg-color);
		}
		50% {
			background: var(--fade-color);
		}
		100% {
			background: var(--bg-color);
		}
	}
	@keyframes fadeOut {
		0% {
			background: var(--fade-color);
		}
		100% {
			background: var(--bg-color);
		}
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
