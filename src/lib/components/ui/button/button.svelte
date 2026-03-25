<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'sm';
		size?: 'default' | 'sm' | 'lg' | 'icon';
		class?: string;
		children?: Snippet;
	}

	let { variant = 'default', size = 'default', class: className, children, ...rest }: Props = $props();

	const variantClasses: Record<string, string> = {
		default: 'bg-primary text-primary-foreground hover:bg-primary/90',
		destructive: 'bg-destructive text-foreground hover:bg-destructive/90',
		outline: 'border border-border bg-transparent hover:bg-muted',
		ghost: 'hover:bg-muted',
		sm: 'bg-primary text-primary-foreground hover:bg-primary/90'
	};

	const sizeClasses: Record<string, string> = {
		default: 'h-10 px-4 py-2',
		sm: 'h-8 px-3 text-sm',
		lg: 'h-12 px-6',
		icon: 'h-8 w-8 p-0'
	};
</script>

<button
	class={cn(
		'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
		variantClasses[variant],
		sizeClasses[size],
		className
	)}
	{...rest}
>
	{@render children?.()}
</button>
