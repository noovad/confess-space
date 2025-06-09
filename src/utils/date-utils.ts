export function formatDate(timestamp: string | Date): string {
    return new Date(timestamp).toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export function formatReadableDate(timestamp: string | Date): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }); // "08 Jun 2025"
}
