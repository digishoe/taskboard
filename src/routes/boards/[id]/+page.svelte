<script lang="ts">
	import BoardView from '$lib/components/board-view.svelte';
	import { createTask, deleteTask, getTags, createTag, updateTag, deleteTag, setTaskTags } from '$lib/api';
	import type { Tag } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let allTags = $state<Tag[]>(data.tags ?? []);
	let board = $state(data.board);

	async function handleCreateTask(columnId: number, title: string, description: string) {
		await createTask(data.apiBaseUrl, columnId, title, description, fetch);
		await reload();
	}

	async function handleDeleteTask(taskId: number) {
		await deleteTask(data.apiBaseUrl, taskId, fetch);
		await reload();
	}

	async function handleToggleTag(taskId: number, tagId: number, active: boolean) {
		const task = board.columns?.flatMap((c) => c.tasks ?? []).find((t) => t.id === taskId);
		if (!task) return;
		const currentIds = (task.tags ?? []).map((t) => t.id);
		const newIds = active ? [...currentIds, tagId] : currentIds.filter((id) => id !== tagId);
		await setTaskTags(data.apiBaseUrl, taskId, newIds, fetch);
		await reload();
	}

	async function handleCreateTag(name: string, color: string) {
		const tag = await createTag(data.apiBaseUrl, name, color, fetch);
		allTags = [...allTags, tag];
	}

	async function handleUpdateTag(id: number, name: string, color: string) {
		const updated = await updateTag(data.apiBaseUrl, id, name, color, fetch);
		allTags = allTags.map((t) => (t.id === id ? updated : t));
		await reload();
	}

	async function handleDeleteTag(id: number) {
		await deleteTag(data.apiBaseUrl, id, fetch);
		allTags = allTags.filter((t) => t.id !== id);
		await reload();
	}

	async function reload() {
		const { getBoard } = await import('$lib/api');
		board = await getBoard(data.apiBaseUrl, board.id, fetch);
	}
</script>

<div>
	<a href="/" class="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground">
		&larr; Back to boards
	</a>
	<BoardView
		{board}
		{allTags}
		onCreateTask={handleCreateTask}
		onDeleteTask={handleDeleteTask}
		onToggleTag={handleToggleTag}
		onCreateTag={handleCreateTag}
		onUpdateTag={handleUpdateTag}
		onDeleteTag={handleDeleteTag}
	/>
</div>
