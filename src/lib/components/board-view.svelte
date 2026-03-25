<script lang="ts">
	import type { Board, Task } from '$lib/types';
	import ColumnComponent from './column.svelte';

	interface Props {
		board: Board;
		onCreateTask?: (columnId: number, title: string, description: string) => void;
		onDeleteTask?: (taskId: number) => void;
		onUpdateTask?: (taskId: number, updates: Partial<Task>) => void;
	}

	let { board, onCreateTask, onDeleteTask, onUpdateTask }: Props = $props();
</script>

<div>
	<h2 class="mb-4 text-xl font-bold">{board.name}</h2>
	<div class="flex gap-4 overflow-x-auto pb-4">
		{#each board.columns ?? [] as column (column.id)}
			<ColumnComponent {column} {onCreateTask} {onDeleteTask} />
		{/each}
	</div>
</div>
