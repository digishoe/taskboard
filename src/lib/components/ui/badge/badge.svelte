<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		variant?: 'default' | 'secondary' | 'destructive' | 'outline';
		class?: string;
		children?: Snippet;
	}

	let { variant = 'default', class: className, children, ...rest }: Props = $props();

	const variantClasses: Record<string, string> = {
		default: 'bg-primary text-primary-foreground',
		secondary: 'bg-muted text-muted-foreground',
		destructive: 'bg-destructive text-foreground',
		outline: 'border border-border text-foreground'
	};
</script>

<span
	class={cn(
		'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
		variantClasses[variant],
		className
	)}
	{...rest}
>
	{@render children?.()}
</span>
