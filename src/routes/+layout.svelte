<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="min-h-screen">
	<header class="border-b border-border px-6 py-4">
		<a href="/" class="text-lg font-bold text-foreground hover:text-primary transition-colors">
			Taskboard
		</a>
	</header>
	<main class="p-6">
		{@render children()}
	</main>
</div>
