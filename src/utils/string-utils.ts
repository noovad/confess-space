/**
 * Utility functions for string manipulation
 */



/**
 * Capitalizes the first word in a paragraph
 * @param text The paragraph text
 * @returns The text with the first word capitalized
 */
export function capitalizeFirstWord(text: string): string {
    if (!text || text.length === 0) return text;

    // Split by spaces to get words
    const words = text.trim().split(/\s+/);

    if (words.length === 0) return text;

    // Capitalize first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

    // Join the words back together
    return words.join(' ');
}

/**
 * Capitalizes the first letter of each sentence in a text
 * @param text The text to process
 * @returns The text with the first letter of each sentence capitalized
 */
export function capitalizeSentences(text: string): string {
    if (!text || text.length === 0) return text;

    // Split the text by sentence-ending punctuation followed by spaces
    return text.replace(/(^|\.\s+|\!\s+|\?\s+)([a-z])/g,
        function (match, separator, char) {
            return separator + char.toUpperCase();
        }
    );
}