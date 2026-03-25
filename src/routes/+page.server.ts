import { env } from '$env/dynamic/private';
import { getBoards } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const baseUrl = env.API_BASE_URL ?? 'http://localhost:8080';
	const boards = await getBoards(baseUrl, fetch);
	return { boards, apiBaseUrl: baseUrl };
};
