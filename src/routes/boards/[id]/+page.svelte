<script lang="ts">
	import BoardView from '$lib/components/board-view.svelte';
	import { createTask, deleteTask } from '$lib/api';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	async function handleCreateTask(columnId: number, title: string, description: string) {
		await createTask(data.apiBaseUrl, columnId, title, description, fetch);
		window.location.reload();
	}

	async function handleDeleteTask(taskId: number) {
		await deleteTask(data.apiBaseUrl, taskId, fetch);
		window.location.reload();
	}
</script>

<div>
	<a href="/" class="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground">
		&larr; Back to boards
	</a>
	<BoardView
		board={data.board}
		onCreateTask={handleCreateTask}
		onDeleteTask={handleDeleteTask}
	/>
</div>
