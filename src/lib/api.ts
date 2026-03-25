import type { Board, Column, Task } from './types';

type FetchFn = typeof globalThis.fetch;

async function request<T>(
	baseUrl: string,
	path: string,
	fetchFn: FetchFn,
	options?: RequestInit
): Promise<T> {
	const args: [string, RequestInit?] = options
		? [`${baseUrl}${path}`, options]
		: [`${baseUrl}${path}`];
	const res = await fetchFn(...args);
	if (!res.ok) {
		const method = options?.method ?? 'GET';
		throw new Error(`${method} ${path} failed: ${res.status}`);
	}
	if (res.status === 204) {
		return undefined as T;
	}
	return res.json();
}

export async function getBoards(baseUrl: string, fetchFn: FetchFn): Promise<Board[]> {
	return request<Board[]>(baseUrl, '/api/boards', fetchFn);
}

export async function getBoard(baseUrl: string, id: number, fetchFn: FetchFn): Promise<Board> {
	return request<Board>(baseUrl, `/api/boards/${id}`, fetchFn);
}

export async function createBoard(
	baseUrl: string,
	name: string,
	fetchFn: FetchFn
): Promise<Board> {
	return request<Board>(baseUrl, '/api/boards', fetchFn, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name })
	});
}

export async function createColumn(
	baseUrl: string,
	boardId: number,
	name: string,
	position: number,
	fetchFn: FetchFn
): Promise<Column> {
	return request<Column>(baseUrl, `/api/boards/${boardId}/columns`, fetchFn, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, position })
	});
}

export async function createTask(
	baseUrl: string,
	columnId: number,
	title: string,
	description: string,
	fetchFn: FetchFn
): Promise<Task> {
	return request<Task>(baseUrl, `/api/columns/${columnId}/tasks`, fetchFn, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title, description })
	});
}

export async function updateTask(
	baseUrl: string,
	id: number,
	updates: Partial<Task>,
	fetchFn: FetchFn
): Promise<Task> {
	return request<Task>(baseUrl, `/api/tasks/${id}`, fetchFn, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updates)
	});
}

export async function deleteTask(
	baseUrl: string,
	id: number,
	fetchFn: FetchFn
): Promise<void> {
	return request<void>(baseUrl, `/api/tasks/${id}`, fetchFn, {
		method: 'DELETE'
	});
}
