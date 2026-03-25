<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	<h1 class="mb-6 text-2xl font-bold">Boards</h1>

	{#if data.boards.length === 0}
		<p class="text-muted-foreground">No boards yet.</p>
	{:else}
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.boards as board (board.id)}
				<a href="/boards/{board.id}" class="block transition-transform hover:scale-[1.02]">
					<Card>
						<CardHeader>
							<CardTitle>{board.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<p class="text-sm text-muted-foreground">
								{board.columns?.length ?? 0} columns
							</p>
						</CardContent>
					</Card>
				</a>
			{/each}
		</div>
	{/if}
</div>
