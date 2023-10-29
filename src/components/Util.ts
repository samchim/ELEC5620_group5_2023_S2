export const baseApiUrl = "http://localhost:8081";

export const fetchFromApi = async (
  path: string,
  options?: RequestInit
): Promise<Response> => {
  const response = await fetch(`${baseApiUrl}${path}`, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  return response;
};
