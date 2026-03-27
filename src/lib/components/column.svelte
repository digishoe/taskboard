<script lang="ts">
	import type { Column, Tag } from '$lib/types';
	import TaskCard from './task-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	interface Props {
		column: Column;
		allTags?: Tag[];
		filterTagId?: number | null;
		onCreateTask?: (columnId: number, title: string, description: string) => void;
		onDeleteTask?: (taskId: number) => void;
		onToggleTag?: (taskId: number, tagId: number, active: boolean) => void;
		onCreateTag?: (name: string, color: string) => void;
		onUpdateTag?: (id: number, name: string, color: string) => void;
		onDeleteTag?: (id: number) => void;
		onFilterByTag?: (tagId: number) => void;
	}

	let {
		column,
		allTags = [],
		filterTagId = null,
		onCreateTask,
		onDeleteTask,
		onToggleTag,
		onCreateTag,
		onUpdateTag,
		onDeleteTag,
		onFilterByTag
	}: Props = $props();

	let newTaskTitle = $state('');

	const visibleTasks = $derived(
		filterTagId
			? (column.tasks ?? []).filter((t) => t.tags?.some((tg) => tg.id === filterTagId))
			: (column.tasks ?? [])
	);

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!newTaskTitle.trim()) return;
		onCreateTask?.(column.id, newTaskTitle.trim(), '');
		newTaskTitle = '';
	}
</script>

<div class="flex w-72 shrink-0 flex-col rounded-lg bg-muted/50 p-3">
	<div class="mb-3 flex items-center justify-between">
		<h3 class="font-semibold text-sm">{column.name}</h3>
		<Badge variant="secondary">{visibleTasks.length}</Badge>
	</div>

	<div class="flex-1 space-y-0">
		{#each visibleTasks as task (task.id)}
			<TaskCard
				{task}
				{allTags}
				onDelete={onDeleteTask}
				{onToggleTag}
				{onCreateTag}
				{onUpdateTag}
				{onDeleteTag}
				{onFilterByTag}
			/>
		{/each}
	</div>

	<form onsubmit={handleSubmit} class="mt-3 flex gap-2">
		<input
			type="text"
			placeholder="Task title"
			bind:value={newTaskTitle}
			class="flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
		/>
		<Button size="sm" type="submit">Add</Button>
	</form>
</div>
