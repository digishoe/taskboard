import { env } from '$env/dynamic/private';
import { getBoard, getTags } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const baseUrl = env.API_BASE_URL ?? 'http://localhost:8080';
	const [board, tags] = await Promise.all([
		getBoard(baseUrl, Number(params.id), fetch),
		getTags(baseUrl, fetch)
	]);
	return { board, tags, apiBaseUrl: baseUrl };
};
