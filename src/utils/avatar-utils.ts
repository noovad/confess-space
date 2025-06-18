/**
 * Generates a DiceBear avatar URL based on the provided name and style
 * 
 * @param name The seed value for avatar generation (typically a username)
 * @param style The avatar style to use (defaults to 'notionists')
 * @param options Additional configuration options
 * @returns A URL string to the generated avatar
 */
export function getAvatar(
    name: string,
    style: string,
): string {
    const baseUrl = `https://api.dicebear.com/9.x/${style}/svg`;

    const params = new URLSearchParams();

    params.append('seed', name);

    return `${baseUrl}?${params.toString()}`;
}