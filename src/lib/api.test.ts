import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
	getBoards,
	getBoard,
	createBoard,
	createColumn,
	createTask,
	updateTask,
	deleteTask
} from './api';
import type { Board, Column, Task } from './types';

const BASE_URL = 'http://localhost:8080';

function mockFetch(response: unknown, status = 200) {
	return vi.fn().mockResolvedValue({
		ok: status >= 200 && status < 300,
		status,
		json: () => Promise.resolve(response),
		statusText: status === 200 ? 'OK' : 'Error'
	});
}

describe('API client', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	describe('getBoards', () => {
		it('fetches all boards', async () => {
			const boards: Board[] = [
				{ id: 1, name: 'Board 1' },
				{ id: 2, name: 'Board 2' }
			];
			const fetch = mockFetch(boards);

			const result = await getBoards(BASE_URL, fetch);

			expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/boards`);
			expect(result).toEqual(boards);
		});

		it('throws on error response', async () => {
			const fetch = mockFetch({ error: 'fail' }, 500);

			await expect(getBoards(BASE_URL, fetch)).rejects.toThrow('GET /api/boards failed: 500');
		});
	});

	describe('getBoard', () => {
		it('fetches a single board by id', async () => {
			const board: Board = {
				id: 1,
				name: 'Board 1',
				columns: [
					{ id: 1, board_id: 1, name: 'To Do', position: 0, tasks: [] }
				]
			};
			const fetch = mockFetch(board);

			const result = await getBoard(BASE_URL, 1, fetch);

			expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/boards/1`);
			expect(result).toEqual(board);
		});
	});

	describe('createBoard', () => {
		it('creates a board with the given name', async () => {
			const board: Board = { id: 3, name: 'New Board' };
			const fetch = mockFetch(board, 201);

			const result = await createBoard(BASE_URL, 'New Board', fetch);

			expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/boards`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: 'New Board' })
			});
			expect(result).toEqual(board);
		});
	});

	describe('createColumn', () => {
		it('creates a column on a board', async () => {
			const column: Column = { id: 1, board_id: 1, name: 'In Progress', position: 1 };
			const fetch = mockFetch(column, 201);

			const result = await createColumn(BASE_URL, 1, 'In Progress', 1, fetch);

			expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/boards/1/columns`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: 'In Progress', position: 1 })
			});
			expect(result).toEqual(column);
		});
	});

	describe('createTask', () => {
		it('creates a task in a column', async () => {
			const task: Task = {
				id: 1,
				column_id: 1,
				title: 'My Task',
				description: 'A description',
				position: 0
			};
			const fetch = mockFetch(task, 201);

			const result = await createTask(BASE_URL, 1, 'My Task', 'A description', fetch);

			expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/columns/1/tasks`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: 'My Task', description: 'A description' })
			});
			expect(result).toEqual(task);
		});
	});

	describe('updateTask', () => {
		it('updates a task with partial data', async () => {
			const task: Task = {
				id: 1,
				column_id: 2,
				title: 'Updated',
				description: 'desc',
				position: 0
			};
			const fetch = mockFetch(task);

			const result = await updateTask(BASE_URL, 1, { column_id: 2, title: 'Updated' }, fetch);

			expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/tasks/1`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ column_id: 2, title: 'Updated' })
			});
			expect(result).toEqual(task);
		});
	});

	describe('deleteTask', () => {
		it('deletes a task by id', async () => {
			const fetch = vi.fn().mockResolvedValue({
				ok: true,
				status: 204,
				statusText: 'No Content'
			});

			await deleteTask(BASE_URL, 1, fetch);

			expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/tasks/1`, {
				method: 'DELETE'
			});
		});

		it('throws on error response', async () => {
			const fetch = mockFetch({ error: 'not found' }, 404);

			await expect(deleteTask(BASE_URL, 99, fetch)).rejects.toThrow(
				'DELETE /api/tasks/99 failed: 404'
			);
		});
	});
});
