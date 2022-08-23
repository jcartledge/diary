export const fail = (error: string | Error) => {
  throw typeof error === "string" ? new Error(error) : error;
};
