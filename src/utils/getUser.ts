import { UserDto } from "@/dto/userDto";

export function getUserFromClientCookie(): UserDto | null {
    if (typeof document === 'undefined') return null;

    const match = document.cookie.match(/(^| )user=([^;]+)/);
    const token = match ? decodeURIComponent(match[2]) : null;
    if (!token) return null;

    try {
        const claims = JSON.parse(atob(token.split('.')[1]));
        return {
            id: claims.id,
            username: claims.username,
            name: claims.name,
            email: claims.email,
            avatar_type: claims.avatar_type || '',
        };
    } catch {
        return null;
    }
}