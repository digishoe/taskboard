import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ColumnComponent from './column.svelte';
import type { Column } from '$lib/types';

const column: Column = {
	id: 1,
	board_id: 1,
	name: 'To Do',
	position: 0,
	tasks: [
		{ id: 1, column_id: 1, title: 'Task 1', description: 'Desc 1', position: 0 },
		{ id: 2, column_id: 1, title: 'Task 2', description: 'Desc 2', position: 1 }
	]
};

describe('Column', () => {
	it('renders column name', () => {
		render(ColumnComponent, { props: { column } });
		expect(screen.getByText('To Do')).toBeInTheDocument();
	});

	it('renders task cards', () => {
		render(ColumnComponent, { props: { column } });
		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.getByText('Task 2')).toBeInTheDocument();
	});

	it('renders add task form', () => {
		render(ColumnComponent, { props: { column } });
		expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
	});

	it('calls onCreateTask when form is submitted', async () => {
		const onCreateTask = vi.fn();
		render(ColumnComponent, { props: { column, onCreateTask } });

		const input = screen.getByPlaceholderText('Task title');
		await fireEvent.input(input, { target: { value: 'New Task' } });
		await fireEvent.click(screen.getByRole('button', { name: /add/i }));

		expect(onCreateTask).toHaveBeenCalledWith(1, 'New Task', '');
	});

	it('calls onDeleteTask when task delete button clicked', async () => {
		const onDeleteTask = vi.fn();
		render(ColumnComponent, { props: { column, onDeleteTask } });

		const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
		await fireEvent.click(deleteButtons[0]);

		expect(onDeleteTask).toHaveBeenCalledWith(1);
	});

	it('renders empty column without tasks', () => {
		const emptyColumn: Column = { id: 2, board_id: 1, name: 'Done', position: 2 };
		render(ColumnComponent, { props: { column: emptyColumn } });
		expect(screen.getByText('Done')).toBeInTheDocument();
	});
});
