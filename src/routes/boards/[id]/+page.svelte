<script lang="ts">
	import BoardView from '$lib/components/board-view.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	async function handleCreateTask(columnId: number, title: string, description: string) {
		await fetch(`/api/tasks`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ column_id: columnId, title, description })
		});
		window.location.reload();
	}

	async function handleDeleteTask(taskId: number) {
		await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
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
