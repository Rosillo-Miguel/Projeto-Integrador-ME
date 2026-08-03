export interface IPaginatedResult<T> {
	itens: T[];
	totalItens: number;
	totalPages: number;
	currentPage: number;
}

export interface FindAllParams {
	page: number;
	limit: number;
	search?: string | undefined;
}
