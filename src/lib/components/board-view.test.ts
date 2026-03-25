import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import BoardView from './board-view.svelte';
import type { Board } from '$lib/types';

const board: Board = {
	id: 1,
	name: 'Test Board',
	columns: [
		{
			id: 1,
			board_id: 1,
			name: 'To Do',
			position: 0,
			tasks: [
				{ id: 1, column_id: 1, title: 'Task A', description: 'Desc A', position: 0 }
			]
		},
		{
			id: 2,
			board_id: 1,
			name: 'In Progress',
			position: 1,
			tasks: []
		}
	]
};

describe('BoardView', () => {
	it('renders board name', () => {
		render(BoardView, { props: { board } });
		expect(screen.getByText('Test Board')).toBeInTheDocument();
	});

	it('renders all columns', () => {
		render(BoardView, { props: { board } });
		expect(screen.getByText('To Do')).toBeInTheDocument();
		expect(screen.getByText('In Progress')).toBeInTheDocument();
	});

	it('renders tasks within columns', () => {
		render(BoardView, { props: { board } });
		expect(screen.getByText('Task A')).toBeInTheDocument();
	});

	it('renders empty board without columns', () => {
		const emptyBoard: Board = { id: 2, name: 'Empty Board' };
		render(BoardView, { props: { board: emptyBoard } });
		expect(screen.getByText('Empty Board')).toBeInTheDocument();
	});
});
