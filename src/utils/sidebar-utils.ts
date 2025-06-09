/**
 * Determines if the given space name matches the current pathname
 * @param pathname The current pathname from Next.js router
 * @param name The space name to check against
 * @returns boolean indicating if the current path matches the space name
 */
export function isSpaceActive(pathname: string, name: string): boolean {
    return pathname === "/space/" + name;
}

/**
 * Generic active path checker with optional prefix support
 * @param pathname The current pathname from Next.js router
 * @param path The path to check against
 * @param exact Whether to require exact match (default: true)
 * @returns boolean indicating if the current path matches
 */
export function isPathActive(pathname: string, path: string, exact: boolean = true): boolean {
    if (exact) {
        return pathname === path;
    }
    return pathname.startsWith(path);
}