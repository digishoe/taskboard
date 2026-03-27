<script lang="ts">
	import type { Board, Task, Tag } from '$lib/types';
	import ColumnComponent from './column.svelte';

	interface Props {
		board: Board;
		allTags?: Tag[];
		onCreateTask?: (columnId: number, title: string, description: string) => void;
		onDeleteTask?: (taskId: number) => void;
		onUpdateTask?: (taskId: number, updates: Partial<Task>) => void;
		onToggleTag?: (taskId: number, tagId: number, active: boolean) => void;
		onCreateTag?: (name: string, color: string) => void;
		onUpdateTag?: (id: number, name: string, color: string) => void;
		onDeleteTag?: (id: number) => void;
	}

	let {
		board,
		allTags = [],
		onCreateTask,
		onDeleteTask,
		onUpdateTask,
		onToggleTag,
		onCreateTag,
		onUpdateTag,
		onDeleteTag
	}: Props = $props();

	let filterTagId = $state<number | null>(null);

	function handleFilterByTag(tagId: number) {
		filterTagId = filterTagId === tagId ? null : tagId;
	}
</script>

<div>
	<h2 class="mb-4 text-xl font-bold">{board.name}</h2>

	{#if allTags.length > 0}
		<div class="mb-4 flex flex-wrap items-center gap-2">
			<span class="text-xs text-muted-foreground">Filter by tag:</span>
			{#each allTags as tag (tag.id)}
				<button
					type="button"
					aria-label="Filter by {tag.name}"
					aria-pressed={filterTagId === tag.id}
					onclick={() => handleFilterByTag(tag.id)}
					class="rounded px-2 py-0.5 text-xs font-medium text-white transition-opacity"
					style="background-color: {tag.color}; opacity: {filterTagId === null || filterTagId === tag.id ? 1 : 0.4}"
				>
					{tag.name}
				</button>
			{/each}
			{#if filterTagId !== null}
				<button
					type="button"
					onclick={() => (filterTagId = null)}
					class="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground"
				>
					Clear filter
				</button>
			{/if}
		</div>
	{/if}

	<div class="flex gap-4 overflow-x-auto pb-4">
		{#each board.columns ?? [] as column (column.id)}
			<ColumnComponent
				{column}
				{allTags}
				{filterTagId}
				{onCreateTask}
				{onDeleteTask}
				{onToggleTag}
				{onCreateTag}
				{onUpdateTag}
				{onDeleteTag}
				onFilterByTag={handleFilterByTag}
			/>
		{/each}
	</div>
</div>
