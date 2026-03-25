import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import TaskCard from './task-card.svelte';
import type { Task } from '$lib/types';

const task: Task = {
	id: 1,
	column_id: 1,
	title: 'Test Task',
	description: 'This is a test task description that might be quite long',
	position: 0
};

describe('TaskCard', () => {
	it('renders task title', () => {
		render(TaskCard, { props: { task } });
		expect(screen.getByText('Test Task')).toBeInTheDocument();
	});

	it('renders truncated description', () => {
		render(TaskCard, { props: { task } });
		expect(screen.getByText(/This is a test task/)).toBeInTheDocument();
	});

	it('renders delete button', () => {
		render(TaskCard, { props: { task } });
		expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
	});

	it('calls onDelete with task id when delete button clicked', async () => {
		const onDelete = vi.fn();
		render(TaskCard, { props: { task, onDelete } });

		await fireEvent.click(screen.getByRole('button', { name: /delete/i }));
		expect(onDelete).toHaveBeenCalledWith(1);
	});

	it('does not crash without onDelete handler', async () => {
		render(TaskCard, { props: { task } });
		await fireEvent.click(screen.getByRole('button', { name: /delete/i }));
	});
});
