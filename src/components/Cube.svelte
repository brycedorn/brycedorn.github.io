<script lang="ts">
	import { onMount } from 'svelte';
	import type { CubeAxis, CubeDirection } from '$lib';

	import './cube.css';

	export let axis: CubeAxis;
	export let dir: CubeDirection;
	export let dur: number;
	export let x: number;
	export let y: number;
	export let width: number;
	export let delay: number;
	export let speed: number;
	export let rotateInfinite: boolean;
	export let renderEmoji: boolean;

	let face = dir === 'pos' ? 'start' : 'end';
	let show = delay === 0;
	let transitionDur = 1;
	let transitionDurOverride = 'unset';
	let isHovering = false;

	onMount(startRotation);

	function rotateForwardInfinite() {
		setTimeout(
			() => {
				rotateReset();
				emoji = getEmoji();
				setTimeout(
					() => {
						transitionDurOverride = 'unset';
						rotateMid();
						setTimeout(
							() => {
								rotateEnd();
								setTimeout(() => {
									rotateForwardInfinite();
									setTimeout(
										() => {
											transitionDurOverride = '0';
										},
										(dur + transitionDur) * speed
									);
								}, transitionDur * speed);
							},
							(dur + transitionDur) * speed * 2
						);
					},
					(dur + transitionDur) * speed * 2
				);
			},
			(dur + transitionDur) * speed
		);
	}

	function rotateReset() {
		setTimeout(() => {
			face = dir === 'pos' ? 'start' : 'end';
		}, transitionDur * speed);
	}

	function rotateMid() {
		setTimeout(() => {
			face = 'mid';
		}, transitionDur * speed);
	}

	function rotateEnd() {
		setTimeout(() => {
			face = dir === 'pos' ? 'end' : 'start';
		}, transitionDur * speed);
	}

	function startRotation() {
		if (delay > 0) {
			setTimeout(() => {
				show = true;
			}, delay * speed);
		}

		setTimeout(rotateMid, delay * speed);

		if (rotateInfinite) {
			rotateForwardInfinite();
		}

		setTimeout(rotateWithoutDelay, delay * speed + Math.random() * 100000)
	}

	function rotateWithoutDelay() {
		if (rotateInfinite || isHovering) {
			return;
		}
		isHovering = true;
		rotateEnd();
		setTimeout(() => {
			transitionDurOverride = '0';
			rotateReset();
			setTimeout(() => {
				transitionDurOverride = 'unset';
				rotateMid();
				isHovering = false;
			}, (dur + transitionDur) * speed)
		}, (2 * dur + transitionDur) * speed);
	}

	function getEmoji() {
		const emoji = ['🍷', '☕️', '👟', '✈️', '🐶', '🎮', '🚲', '🇳🇱', '🇺🇸', '🇬🇧'];
		return emoji[Math.floor(Math.random() * emoji.length)];
	}

	let emoji = '';
</script>

{#if show}
	<div
		class="cube-outer"
		style="--cube-width:{width}px;--x-pos:{x}px;--y-pos:{y}px;--transition-dur:{transitionDur}s;--content-show-dur:{dur}s"
		on:mouseenter={rotateWithoutDelay}
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
		font-size: 2em;
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

	@media (max-aspect-ratio: 1/1.5) {
		.face-emoji span {
			display: block;
			transform: rotate(-90deg);
		}
	}
</style>
