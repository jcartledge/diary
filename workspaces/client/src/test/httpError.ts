export const httpError = (status: number, statusText: string) => new Response(null, { status, statusText });
export const http404 = () => httpError(404, 'Not Found');
export const http403 = () => httpError(403, 'Forbidden');

