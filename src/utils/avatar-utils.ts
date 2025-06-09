/**
 * Avatar utility functions for generating avatar URLs using DiceBear
 * https://www.dicebear.com/styles
 */

/**
 * Available avatar style types from DiceBear
 */

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
    style: string = 'notionists',
): string {
    // Base API URL with format (default to svg if not specified)
    const baseUrl = `https://api.dicebear.com/9.x/${style}/svg`;

    // Build query parameters
    const params = new URLSearchParams();

    // Seed is required
    params.append('seed', name);

    // Construct and return the final URL
    return `${baseUrl}?${params.toString()}`;
}