<script lang="ts">
	import favicon from '../favicon.png';

	let { children } = $props();

	const meta = {
		title: 'bryce.io',
		desc: 'bryce dot io',
		url: 'https://bryce.io'
	};
</script>

<svelte:head>
	<title></title>
	<link rel="canonical" href={meta.url} />
	<link rel="icon" type="image/png" href={favicon} />
	<title>{meta.title}</title>
	<meta name="description" content={meta.desc} />
	<meta name="keywords" content="bryce,dorn,brycedorn,bryce.io,bryce dorn,bryce dot io" />
	<meta name="author" content="bryce dorn" />
	<meta itemProp="name" content={meta.title} />
	<meta itemProp="description" content={meta.desc} />
	<meta itemProp="image" content={favicon} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.desc} />
	<meta name="twitter:image:src" content={favicon} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={meta.url} />
	<meta property="og:image" content={favicon} />
	<meta property="og:description" content={meta.desc} />
	<meta property="og:site_name" content={meta.title} />
</svelte:head>

{@render children()}
