export function cutByPage<T = any>(quantity_in_page: number | undefined, page: number | undefined, list: T[]): { list: T[]; pages: number } {
	const QUANTITY_IN_PAGE = quantity_in_page || 20;
	const pages = Math.ceil(list.length / QUANTITY_IN_PAGE);
	const pageToReturn = page || 1;

	if (pageToReturn > pages) {
		throw {
			code: 404,
			message: 'Page not found',
		};
	}

	const start = (pageToReturn - 1) * QUANTITY_IN_PAGE;
	const end = start + QUANTITY_IN_PAGE;

	return { list: list.slice(start, end), pages };
}
