<script lang="ts">
	import type { Task, Tag } from '$lib/types';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import TagManager from './tag-manager.svelte';

	interface Props {
		task: Task;
		allTags?: Tag[];
		activeFilterTagId?: number | null;
		onDelete?: (id: number) => void;
		onToggleTag?: (taskId: number, tagId: number, active: boolean) => void;
		onCreateTag?: (name: string, color: string) => void;
		onUpdateTag?: (id: number, name: string, color: string) => void;
		onDeleteTag?: (id: number) => void;
		onFilterByTag?: (tagId: number) => void;
	}

	let {
		task,
		allTags = [],
		onDelete,
		onToggleTag,
		onCreateTag,
		onUpdateTag,
		onDeleteTag,
		onFilterByTag
	}: Props = $props();

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
		<CardContent class="p-3 pt-0 pb-1">
			<p class="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
		</CardContent>
	{/if}
	<CardContent class="p-3 pt-0">
		{#if task.tags && task.tags.length > 0}
			<div class="mb-1 flex flex-wrap gap-1">
				{#each task.tags as tag (tag.id)}
					<button
						type="button"
						aria-label="Filter by tag {tag.name}"
						onclick={() => onFilterByTag?.(tag.id)}
						class="rounded px-1.5 py-0.5 text-xs font-medium text-white hover:opacity-80"
						style="background-color: {tag.color}"
					>
						{tag.name}
					</button>
				{/each}
			</div>
		{/if}
		<TagManager
			taskId={task.id}
			taskTags={task.tags ?? []}
			{allTags}
			{onToggleTag}
			{onCreateTag}
			{onUpdateTag}
			{onDeleteTag}
		/>
	</CardContent>
</Card>
