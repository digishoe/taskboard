import { env } from '$env/dynamic/private';
import { getBoard } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const baseUrl = env.API_BASE_URL ?? 'http://localhost:8080';
	const board = await getBoard(baseUrl, Number(params.id), fetch);
	return { board, apiBaseUrl: baseUrl };
};
