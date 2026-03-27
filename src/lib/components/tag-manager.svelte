<script lang="ts">
	import type { Tag } from '$lib/types';

	interface Props {
		taskId: number;
		taskTags: Tag[];
		allTags: Tag[];
		onToggleTag?: (taskId: number, tagId: number, active: boolean) => void;
		onCreateTag?: (name: string, color: string) => void;
		onUpdateTag?: (id: number, name: string, color: string) => void;
		onDeleteTag?: (id: number) => void;
	}

	let { taskId, taskTags, allTags, onToggleTag, onCreateTag, onUpdateTag, onDeleteTag }: Props =
		$props();

	let open = $state(false);
	let newTagName = $state('');
	let newTagColor = $state('#6366f1');
	let editingTagId = $state<number | null>(null);
	let editName = $state('');
	let editColor = $state('');

	function isActive(tagId: number) {
		return taskTags.some((t) => t.id === tagId);
	}

	function toggle(tagId: number) {
		onToggleTag?.(taskId, tagId, !isActive(tagId));
	}

	function handleCreate(e: Event) {
		e.preventDefault();
		if (!newTagName.trim()) return;
		onCreateTag?.(newTagName.trim(), newTagColor);
		newTagName = '';
		newTagColor = '#6366f1';
	}

	function startEdit(tag: Tag) {
		editingTagId = tag.id;
		editName = tag.name;
		editColor = tag.color;
	}

	function saveEdit(e: Event) {
		e.preventDefault();
		if (editingTagId !== null && editName.trim()) {
			onUpdateTag?.(editingTagId, editName.trim(), editColor);
		}
		editingTagId = null;
	}

	function handleDelete(tagId: number) {
		onDeleteTag?.(tagId);
	}

	function clickOutside(node: HTMLElement) {
		function handle(e: MouseEvent) {
			if (!node.contains(e.target as Node)) open = false;
		}
		document.addEventListener('click', handle, true);
		return { destroy() { document.removeEventListener('click', handle, true); } };
	}
</script>

<div class="relative" use:clickOutside>
	<button
		type="button"
		aria-label="Manage tags"
		onclick={() => (open = !open)}
		class="rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
	>
		🏷 Tags
	</button>

	{#if open}
		<div
			class="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-border bg-background p-3 shadow-lg"
			role="dialog"
			aria-label="Tag manager"
		>
			<p class="mb-2 text-xs font-semibold text-foreground">Tags</p>

			<ul class="mb-3 max-h-40 space-y-1 overflow-y-auto">
				{#each allTags as tag (tag.id)}
					<li class="flex items-center gap-1">
						{#if editingTagId === tag.id}
							<form onsubmit={saveEdit} class="flex flex-1 items-center gap-1">
								<input
									type="color"
									bind:value={editColor}
									class="h-5 w-5 shrink-0 cursor-pointer rounded border-0 p-0"
								/>
								<input
									type="text"
									bind:value={editName}
									class="flex-1 rounded border border-border bg-background px-1 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
								/>
								<button type="submit" class="text-xs text-primary">✓</button>
								<button
									type="button"
									onclick={() => (editingTagId = null)}
									class="text-xs text-muted-foreground">✕</button
								>
							</form>
						{:else}
							<input
								type="checkbox"
								id={`tag-${taskId}-${tag.id}`}
								checked={isActive(tag.id)}
								onchange={() => toggle(tag.id)}
								class="h-3 w-3 shrink-0 cursor-pointer accent-primary"
							/>
							<button
								type="button"
								class="flex-1 cursor-pointer truncate rounded px-1.5 py-0.5 text-xs font-medium text-white text-left"
								style="background-color: {tag.color}"
								onclick={() => toggle(tag.id)}
							>
								{tag.name}
							</button>
							<button
								type="button"
								aria-label="Edit tag"
								onclick={() => startEdit(tag)}
								class="shrink-0 text-xs text-muted-foreground hover:text-foreground">✎</button
							>
							<button
								type="button"
								aria-label="Delete tag"
								onclick={() => handleDelete(tag.id)}
								class="shrink-0 text-xs text-destructive hover:text-destructive/80">✕</button
							>
						{/if}
					</li>
				{/each}
				{#if allTags.length === 0}
					<li class="text-xs text-muted-foreground">No tags yet. Create one below.</li>
				{/if}
			</ul>

			<form onsubmit={handleCreate} class="flex items-center gap-1">
				<input
					type="color"
					bind:value={newTagColor}
					class="h-5 w-5 shrink-0 cursor-pointer rounded border-0 p-0"
				/>
				<input
					type="text"
					bind:value={newTagName}
					placeholder="New tag name"
					class="flex-1 rounded border border-border bg-background px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
				/>
				<button
					type="submit"
					class="rounded bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">+ Add</button
				>
			</form>
		</div>
	{/if}
</div>
