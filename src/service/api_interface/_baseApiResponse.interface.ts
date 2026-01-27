export interface iBaseApiResponse {
	controller: string;
	handler: string;
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	status: 'success' | 'error';
	message?: string;
}
