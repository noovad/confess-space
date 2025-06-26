export function formatDate(timestamp: string | Date): string {
    let date: Date;
    if (typeof timestamp === "string") {
        // Remove microseconds if present (keep only 3 digits for ms)
        const fixedTimestamp = timestamp.replace(
            /\.(\d{3})\d*(Z)$/,
            '.$1$2'
        );
        date = new Date(fixedTimestamp);
    } else {
        date = new Date(timestamp);
    }
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }
    // Format as "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatReadableDate(timestamp: string | Date): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }); // "08 Jun 2025"
}
