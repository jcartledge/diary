export const httpError = (status: number, statusText: string) => new Response(null, { status, statusText });

