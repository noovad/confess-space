/**
 * Formats an ISO date string to display only the time in HH:MM format
 * 
 * @param isoDateString ISO 8601 date string (e.g., "2024-06-10T10:08:00Z")
 * @returns Formatted time string (e.g., "23:00")
 */
export function formatTimeOnly(isoDateString: string): string {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
        return isoDateString;
    }

    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}


export function formatDateOnly(timestamp: string | Date): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

