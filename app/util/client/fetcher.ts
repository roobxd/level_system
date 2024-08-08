/**
 * Function for our useSWR hook.
 * @param input 
 * @param init 
 * @returns the response payload in JSON format
 */
export default async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
}