<script lang="ts">
	import type { Task } from '$lib/types';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		task: Task;
		onDelete?: (id: number) => void;
	}

	let { task, onDelete }: Props = $props();

	function handleDelete() {
		onDelete?.(task.id);
	}
</script>

<Card class="mb-2">
	<CardHeader class="p-3 pb-1">
		<div class="flex items-start justify-between gap-2">
			<CardTitle class="text-sm font-medium">{task.title}</CardTitle>
			<Button variant="ghost" size="icon" aria-label="Delete task" onclick={handleDelete}>
				<span class="text-destructive text-xs">&#x2715;</span>
			</Button>
		</div>
	</CardHeader>
	{#if task.description}
		<CardContent class="p-3 pt-0">
			<p class="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
		</CardContent>
	{/if}
</Card>
